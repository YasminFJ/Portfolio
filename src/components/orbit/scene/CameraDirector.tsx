"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { getPlanet, sun } from "@/lib/planets";
import { useOrbit } from "../state/store";
import { getBody } from "../state/bodies";

type Flight = {
  fromPos: THREE.Vector3;
  fromTarget: THREE.Vector3;
  /** Camera offset from the body at arrival */
  offset: THREE.Vector3;
  bodyId: string | null;
  start: number;
  duration: number;
  arc: number;
};

const UP = new THREE.Vector3(0, 1, 0);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function bodyRadius(id: string) {
  if (id === "sun") return sun.size;
  if (id === "blackhole") return 3.2;
  return getPlanet(id)?.size ?? 1;
}

/** Viewing distance that frames the body comfortably for the current field of view. */
function frameDistance(id: string, cam: THREE.PerspectiveCamera) {
  const planet = getPlanet(id);
  const r = bodyRadius(id);
  const extent = planet?.rings ? r * planet.rings.outer : planet?.moon ? r * 2.4 : r;
  const vTan = Math.tan((cam.fov * Math.PI) / 360);
  const fit = Math.min(vTan, vTan * cam.aspect);
  const k = id === "sun" ? 2.3 : cam.aspect < 1 ? 1.3 : 1.6;
  return (extent * k) / fit + r * 0.4;
}

/** Camera position for a cinematic three-quarter view: the lit side with a visible terminator. */
function framingOffset(bodyPos: THREE.Vector3, distance: number, id: string) {
  if (id === "sun") return new THREE.Vector3(0.35, 0.28, 1).normalize().multiplyScalar(distance);
  if (id === "blackhole") return new THREE.Vector3(-0.5, 0.42, 1).normalize().multiplyScalar(distance);
  const toSun = bodyPos.lengthSq() > 0.001 ? bodyPos.clone().negate().normalize() : new THREE.Vector3(0, 0, 1);
  const side = new THREE.Vector3().crossVectors(UP, toSun).normalize();
  return toSun.multiplyScalar(0.62).add(side.multiplyScalar(0.72)).add(UP.clone().multiplyScalar(0.34)).normalize().multiplyScalar(distance);
}

/** Wide establishing shot of the whole system; more top-down on portrait screens. */
function overviewPosition(cam: THREE.PerspectiveCamera) {
  const vTan = Math.tan((cam.fov * Math.PI) / 360);
  if (cam.aspect < 1) {
    const d = 34 / (vTan * cam.aspect);
    return new THREE.Vector3(0, 1.5, 1).normalize().multiplyScalar(d);
  }
  const d = 40 / vTan;
  return new THREE.Vector3(0, 0.62, 1).normalize().multiplyScalar(d);
}

export default function CameraDirector() {
  const get = useThree((s) => s.get);
  const controls = useRef<OrbitControlsImpl | null>(null);
  const flight = useRef<Flight | null>(null);
  const following = useRef<string | null>(null);
  const lastBodyPos = useRef(new THREE.Vector3());
  const focusId = useOrbit((s) => s.focusId);
  const overviewRequest = useOrbit((s) => s.overviewRequest);
  const infoCollapsed = useOrbit((s) => s.infoCollapsed);
  const reduceMotion = useRef(false);
  const viewOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Opening shot: a slow descent from deep space onto the system.
  useEffect(() => {
    const { camera, size } = get();
    const pc = camera as THREE.PerspectiveCamera;
    pc.fov = size.width < size.height ? 55 : 42;
    pc.updateProjectionMatrix();
    const end = overviewPosition(pc);
    if (reduceMotion.current) {
      camera.position.copy(end);
      return;
    }
    camera.position.copy(end.clone().multiplyScalar(2.6).add(new THREE.Vector3(-60, 40, 0)));
    flight.current = {
      fromPos: camera.position.clone(),
      fromTarget: new THREE.Vector3(),
      offset: end,
      bodyId: null,
      start: performance.now(),
      duration: 5200,
      arc: 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startFlight = (id: string | null) => {
    const camera = get().camera;
    const c = controls.current;
    const fromTarget = c ? c.target.clone() : new THREE.Vector3();
    const bodyPos = id ? getBody(id)?.position.clone() ?? new THREE.Vector3() : new THREE.Vector3();
    const cam = camera as THREE.PerspectiveCamera;
    const offset = id ? framingOffset(bodyPos, frameDistance(id, cam), id) : overviewPosition(cam);
    const travel = camera.position.distanceTo(bodyPos.clone().add(offset));
    flight.current = {
      fromPos: camera.position.clone(),
      fromTarget,
      offset,
      bodyId: id,
      start: performance.now(),
      duration: reduceMotion.current ? 1 : THREE.MathUtils.clamp(1500 + travel * 18, 1600, 3400),
      arc: Math.min(travel * 0.12, 10),
    };
    following.current = null;
  };

  useEffect(() => {
    if (focusId) startFlight(focusId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusId]);

  useEffect(() => {
    if (overviewRequest > 0) startFlight(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewRequest]);

  useFrame((state) => {
    const c = controls.current;
    if (!c) return;
    const cam = state.camera as THREE.PerspectiveCamera;

    // Wider lens on portrait screens so the system still reads.
    const wantFov = state.size.width < state.size.height ? 55 : 42;
    if (cam.fov !== wantFov) {
      cam.fov = wantFov;
      cam.updateProjectionMatrix();
    }

    // Reframe so the info panel never covers the body: shift left on wide screens,
    // up on narrow screens where the panel is a bottom sheet.
    const { width: w, height: h } = state.size;
    const wide = w >= 1024;
    const wantX = focusId && !infoCollapsed && wide ? w * 0.11 : 0;
    const wantY = focusId && !wide ? h * (infoCollapsed ? 0.06 : 0.2) : 0;
    const vo = viewOffset.current;
    if (Math.abs(vo.x - wantX) > 0.5 || Math.abs(vo.y - wantY) > 0.5) {
      vo.x += (wantX - vo.x) * 0.06;
      vo.y += (wantY - vo.y) * 0.06;
      cam.setViewOffset(w, h, vo.x, vo.y, w, h);
    }

    const f = flight.current;
    if (f) {
      c.enabled = false;
      const t = Math.min((performance.now() - f.start) / f.duration, 1);
      const k = ease(t);
      const bodyPos = f.bodyId ? getBody(f.bodyId)?.position ?? new THREE.Vector3() : new THREE.Vector3();
      const toPos = bodyPos.clone().add(f.offset);
      cam.position.lerpVectors(f.fromPos, toPos, k);
      cam.position.y += Math.sin(Math.PI * k) * f.arc;
      c.target.lerpVectors(f.fromTarget, bodyPos, k);
      if (t >= 1) {
        flight.current = null;
        following.current = f.bodyId;
        lastBodyPos.current.copy(bodyPos);
        c.minDistance = f.bodyId ? bodyRadius(f.bodyId) * 1.7 : 6;
        c.enabled = true;
      }
      c.update();
      return;
    }

    // Follow the focused body as it orbits, keeping the user's own camera angle.
    const id = following.current;
    if (id) {
      const body = getBody(id);
      if (body) {
        const delta = body.position.clone().sub(lastBodyPos.current);
        cam.position.add(delta);
        c.target.copy(body.position);
        lastBodyPos.current.copy(body.position);
      }
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.45}
      zoomSpeed={0.6}
      minDistance={6}
      maxDistance={260}
    />
  );
}
