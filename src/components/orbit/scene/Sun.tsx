"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { sun } from "@/lib/planets";
import { useOrbit } from "../state/store";
import { QUALITY_SETTINGS, texturePath } from "../state/quality";
import { registerBody } from "../state/bodies";
import { createGlowTexture } from "./shaders";

export default function Sun() {
  const quality = useOrbit((s) => s.quality);
  const focus = useOrbit((s) => s.focus);
  const segments = QUALITY_SETTINGS[quality].segments;
  const map = useTexture(texturePath(quality, sun.texture), (t) => {
    (t as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
  });
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Sprite>(null);

  const glowInner = useMemo(() => createGlowTexture("rgba(255,240,205,1)", "rgba(255,170,70,0.28)"), []);
  const glowOuter = useMemo(() => createGlowTexture("rgba(255,214,150,0.55)", "rgba(255,140,40,0.08)"), []);
  useEffect(() => () => {
    glowInner.dispose();
    glowOuter.dispose();
  }, [glowInner, glowOuter]);

  useEffect(() => {
    registerBody("sun", sun.size);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.02;
    if (coronaRef.current) {
      const s = sun.size * 6.2 * (1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.015);
      coronaRef.current.scale.set(s, s, 1);
    }
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    focus("sun");
  };

  return (
    <group>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[sun.size, segments, segments]} />
        <meshBasicMaterial map={map} color={[1.25, 1.1, 0.95]} toneMapped={false} />
      </mesh>
      <sprite ref={coronaRef} scale={[sun.size * 6.2, sun.size * 6.2, 1]} renderOrder={-1}>
        <spriteMaterial map={glowInner} blending={THREE.AdditiveBlending} depthWrite={false} transparent toneMapped={false} />
      </sprite>
      <sprite scale={[sun.size * 13, sun.size * 13, 1]} renderOrder={-2}>
        <spriteMaterial map={glowOuter} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.32} toneMapped={false} />
      </sprite>
      <pointLight position={[0, 0, 0]} intensity={2.8} decay={0} color="#fff3e2" />
    </group>
  );
}
