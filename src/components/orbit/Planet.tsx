"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Planet as PlanetData } from "@/lib/planets";

type PlanetProps = {
  data: PlanetData;
  timeScale: number;
  showOrbits: boolean;
  showLabels: boolean;
  selected: boolean;
  onSelect: (id: string, position: THREE.Vector3) => void;
};

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const segments = 128;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#3a4166" transparent opacity={0.45} />
    </line>
  );
}

/** Ángulo inicial estable derivado del id del planeta, para repartir las
 * posiciones de partida sin depender de Math.random() en el render. */
function startAngleFromId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 360;
  }
  return (hash / 360) * Math.PI * 2;
}

export default function Planet({ data, timeScale, showOrbits, showLabels, selected, onSelect }: PlanetProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(startAngleFromId(data.id));

  useFrame((_, delta) => {
    angleRef.current += delta * data.speed * 0.15 * timeScale;
    if (pivotRef.current) {
      pivotRef.current.rotation.y = angleRef.current;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * data.velocidadRotacion * timeScale;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      onSelect(data.id, worldPos);
    }
  };

  return (
    <group>
      {showOrbits && <OrbitRing radius={data.orbitRadius} />}
      <group ref={pivotRef}>
        <group position={[data.orbitRadius, 0, 0]}>
          <mesh
            ref={meshRef}
            onClick={handleClick}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[data.size, 48, 48]} />
            <meshStandardMaterial
              color={data.color}
              emissive={data.emissive ?? data.color}
              emissiveIntensity={selected ? 0.35 : 0.08}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>

          {selected && (
            <mesh>
              <ringGeometry args={[data.size * 1.6, data.size * 1.75, 48]} />
              <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
          )}

          {data.hasRings && (
            <mesh rotation={[Math.PI / 2.4, 0, 0]}>
              <ringGeometry args={[data.size * 1.5, data.size * 2.4, 64]} />
              <meshBasicMaterial
                color="#d8c397"
                side={THREE.DoubleSide}
                transparent
                opacity={0.55}
              />
            </mesh>
          )}

          {data.hasMoon && (
            <group>
              <mesh position={[data.size * 2.1, 0, 0]}>
                <sphereGeometry args={[data.size * 0.27, 24, 24]} />
                <meshStandardMaterial color="#c9c9c9" roughness={0.9} />
              </mesh>
            </group>
          )}

          {showLabels && (
            <Html distanceFactor={14} position={[0, data.size + 0.4, 0]} occlude>
              <div className="pointer-events-none select-none whitespace-nowrap rounded bg-black/50 px-2 py-0.5 font-mono text-[10px] tracking-wide text-white">
                {data.name}
              </div>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}
