"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useOrbit } from "../state/store";
import { registerBody } from "../state/bodies";
import { createGlowTexture } from "./shaders";

/** Accretion disc drawn once on a canvas: a hot inner edge, cooler outer gas and faint streaks. */
function createDiscTexture() {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const mid = size / 2;
  const g = ctx.createRadialGradient(mid, mid, mid * 0.28, mid, mid, mid);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(0.04, "rgba(255,246,228,1)");
  g.addColorStop(0.16, "rgba(255,196,120,0.85)");
  g.addColorStop(0.45, "rgba(214,110,48,0.35)");
  g.addColorStop(1, "rgba(120,40,10,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 260; i++) {
    const r = mid * (0.32 + Math.pow(rand(), 1.6) * 0.62);
    const a0 = rand() * Math.PI * 2;
    ctx.strokeStyle = `rgba(255,${180 + Math.floor(rand() * 60)},${110 + Math.floor(rand() * 80)},${0.04 + rand() * 0.08})`;
    ctx.lineWidth = 1 + rand() * 3;
    ctx.beginPath();
    ctx.arc(mid, mid, r, a0, a0 + 0.4 + rand() * 1.8);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export const BLACK_HOLE_POSITION = new THREE.Vector3(58, 5, -34);

/**
 * The original ORBIT easter egg, kept as is in spirit: a gravitational anomaly
 * beyond the planets, reached through the unidentified signal. It only appears
 * once the signal has been detected. The full cinematic sequence comes in a later stage.
 */
export default function BlackHole() {
  const visible = useOrbit((s) => s.signalVisible);
  const focus = useOrbit((s) => s.focus);
  const disc = useRef<THREE.Mesh>(null);
  const discTex = useMemo(() => createDiscTexture(), []);
  const glowTex = useMemo(() => createGlowTexture("rgba(255,214,160,0.9)", "rgba(200,120,60,0.12)"), []);
  useEffect(() => () => {
    discTex.dispose();
    glowTex.dispose();
  }, [discTex, glowTex]);

  useEffect(() => {
    registerBody("blackhole", 3.2).position.copy(BLACK_HOLE_POSITION);
  }, []);

  useFrame((_, delta) => {
    if (disc.current) disc.current.rotation.z += delta * 0.22;
  });

  if (!visible) return null;

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    focus("blackhole");
  };

  return (
    <group position={BLACK_HOLE_POSITION} onClick={onClick}>
      <sprite scale={[5.2, 5.2, 1]}>
        <spriteMaterial map={glowTex} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.55} toneMapped={false} />
      </sprite>
      <group rotation={[Math.PI / 2.25, 0.18, 0]}>
        <mesh ref={disc}>
          <planeGeometry args={[9, 9]} />
          <meshBasicMaterial map={discTex} side={THREE.DoubleSide} transparent blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
