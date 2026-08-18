"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type BlackHoleProps = {
  position: [number, number, number];
  onSelect: (position: THREE.Vector3) => void;
};

export default function BlackHole({ position, onSelect }: BlackHoleProps) {
  const diskOuterRef = useRef<THREE.Mesh>(null);
  const diskInnerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (diskOuterRef.current) diskOuterRef.current.rotation.z += delta * 0.25;
    if (diskInnerRef.current) diskInnerRef.current.rotation.z -= delta * 0.4;
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (groupRef.current) {
      const worldPos = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPos);
      onSelect(worldPos);
    }
  };

  return (
    <group ref={groupRef} position={position} onClick={handleClick}>
      <pointLight color="#a855f7" intensity={12} distance={30} />

      <mesh rotation={[Math.PI / 2.6, 0, 0]} ref={diskOuterRef}>
        <ringGeometry args={[1.6, 2.6, 96]} />
        <meshBasicMaterial color="#f97316" side={THREE.DoubleSide} transparent opacity={0.65} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]} ref={diskInnerRef}>
        <ringGeometry args={[1.1, 1.65, 96]} />
        <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
