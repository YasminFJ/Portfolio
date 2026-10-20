"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Planet as PlanetData } from "@/lib/planets";
import { selectSimSpeed, useOrbit } from "../state/store";
import { QUALITY_SETTINGS, texturePath } from "../state/quality";
import { registerBody } from "../state/bodies";
import { createAtmosphereMaterial, createEarthMaterial } from "./shaders";

const DEG = Math.PI / 180;

function srgb(t: THREE.Texture | THREE.Texture[]) {
  const list = Array.isArray(t) ? t : [t];
  list.forEach((x) => {
    x.colorSpace = THREE.SRGBColorSpace;
    x.anisotropy = 8;
  });
}

/** Stable starting angle from the id so the layout is the same on every visit. */
function startAngle(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return (h / 360) * Math.PI * 2;
}

function OrbitPath({ radius, active }: { radius: number; active: boolean }) {
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 256;
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial color="#c9d4e6" transparent opacity={active ? 0.28 : 0.09} depthWrite={false} />
    </lineLoop>
  );
}

function Atmosphere({ size, color, intensity }: { size: number; color: string; intensity: number }) {
  const inner = useMemo(() => createAtmosphereMaterial(color, intensity * 0.9, 2.6, THREE.FrontSide), [color, intensity]);
  const outer = useMemo(() => createAtmosphereMaterial(color, intensity * 0.55, 5.0, THREE.BackSide), [color, intensity]);
  useEffect(() => () => {
    inner.dispose();
    outer.dispose();
  }, [inner, outer]);
  return (
    <>
      <mesh material={inner} scale={1.012}>
        <sphereGeometry args={[size, 64, 64]} />
      </mesh>
      <mesh material={outer} scale={1.09}>
        <sphereGeometry args={[size, 64, 64]} />
      </mesh>
    </>
  );
}

function Rings({ data }: { data: PlanetData }) {
  const quality = useOrbit((s) => s.quality);
  const rings = data.rings!;
  const map = useTexture(texturePath(quality, rings.texture), srgb);
  const geometry = useMemo(() => {
    const inner = data.size * rings.inner;
    const outer = data.size * rings.outer;
    const g = new THREE.RingGeometry(inner, outer, 192, 1);
    // Map the texture radially: u runs from the inner to the outer edge.
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5);
    }
    return g;
  }, [data.size, rings.inner, rings.outer]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial map={map} color={[0.82, 0.8, 0.76]} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Moon({ data }: { data: NonNullable<PlanetData["moon"]> }) {
  const quality = useOrbit((s) => s.quality);
  const map = useTexture(texturePath(quality, data.texture), srgb);
  const pivot = useRef<THREE.Group>(null);
  const angle = useRef(1.2);
  useFrame((_, delta) => {
    angle.current += delta * data.speed * 0.6 * selectSimSpeed(useOrbit.getState());
    pivot.current?.rotation.set(0.09, angle.current, 0);
  });
  return (
    <group ref={pivot}>
      <mesh position={[data.distance, 0, 0]}>
        <sphereGeometry args={[data.size, 48, 48]} />
        <meshStandardMaterial map={map} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

function Surface({ data, segments }: { data: PlanetData; segments: number }) {
  const quality = useOrbit((s) => s.quality);
  const map = useTexture(texturePath(quality, data.texture), srgb);
  return (
    <mesh>
      <sphereGeometry args={[data.size, segments, segments]} />
      <meshStandardMaterial map={map} roughness={1} metalness={0} />
    </mesh>
  );
}

function EarthSurface({ data, segments }: { data: PlanetData; segments: number }) {
  const quality = useOrbit((s) => s.quality);
  const [day, night] = useTexture([texturePath(quality, "earth_day"), texturePath(quality, "earth_night")], srgb);
  const material = useMemo(() => createEarthMaterial(day, night), [day, night]);
  useEffect(() => () => material.dispose(), [material]);
  return (
    <mesh material={material}>
      <sphereGeometry args={[data.size, segments, segments]} />
    </mesh>
  );
}

function EarthClouds({ size }: { size: number }) {
  const quality = useOrbit((s) => s.quality);
  const clouds = useTexture(texturePath(quality, "earth_clouds"));
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008 * (selectSimSpeed(useOrbit.getState()) + 0.2);
  });
  return (
    <mesh ref={ref} scale={1.008}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial color="#ffffff" alphaMap={clouds} transparent depthWrite={false} roughness={1} metalness={0} />
    </mesh>
  );
}

export default function Planet({ data }: { data: PlanetData }) {
  const quality = useOrbit((s) => s.quality);
  const showOrbits = useOrbit((s) => s.showOrbits);
  const showLabels = useOrbit((s) => s.showLabels);
  const focused = useOrbit((s) => s.focusId === data.id);
  const focus = useOrbit((s) => s.focus);
  const settings = QUALITY_SETTINGS[quality];

  const anchor = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const angle = useRef(startAngle(data.id));
  const entry = useMemo(() => registerBody(data.id, data.size), [data.id, data.size]);

  useFrame((_, delta) => {
    const speed = selectSimSpeed(useOrbit.getState());
    angle.current += delta * data.speed * 0.05 * speed;
    const a = angle.current;
    if (anchor.current) {
      anchor.current.position.set(Math.cos(a) * data.orbitRadius, 0, -Math.sin(a) * data.orbitRadius);
      entry.position.copy(anchor.current.position);
    }
    if (spin.current) spin.current.rotation.y += delta * data.rotationSpeed * (speed + 0.15);
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    focus(data.id);
  };

  return (
    <group>
      {showOrbits && <OrbitPath radius={data.orbitRadius} active={focused} />}
      <group ref={anchor}>
        <group rotation={[0, 0, data.tilt * DEG]}>
          <group ref={spin} onClick={onClick}>
            {data.id === "earth" ? (
              <EarthSurface data={data} segments={settings.segments} />
            ) : (
              <Surface data={data} segments={settings.segments} />
            )}
            {data.id === "earth" && settings.clouds && <EarthClouds size={data.size} />}
          </group>
          {data.rings && <Rings data={data} />}
        </group>
        {data.atmosphere && <Atmosphere size={data.size} color={data.atmosphere.color} intensity={data.atmosphere.intensity} />}
        {data.moon && <Moon data={data.moon} />}
        {/* Generous invisible hit area so small planets are easy to tap */}
        <mesh onClick={onClick} visible={false}>
          <sphereGeometry args={[Math.max(data.size * 1.6, 0.9), 12, 12]} />
        </mesh>
        {showLabels && !focused && (
          <Html position={[0, data.size + 0.35, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <span className="orbit-label">{data.name}</span>
          </Html>
        )}
      </group>
    </group>
  );
}
