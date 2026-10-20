"use client";

import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useOrbit } from "../state/store";
import { QUALITY_SETTINGS, texturePath } from "../state/quality";

/** Deterministic pseudo-random generator so the sky is identical on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function Stars({ count }: { count: number }) {
  const { geometry, material } = useMemo(() => {
    const rand = rng(7);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [
      new THREE.Color("#9bb0ff"),
      new THREE.Color("#cad7ff"),
      new THREE.Color("#f8f7ff"),
      new THREE.Color("#fff4ea"),
      new THREE.Color("#ffd2a1"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 520 + rand() * 120;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      // Most stars are faint; a few are bright.
      const m = Math.pow(rand(), 6);
      sizes[i] = 0.6 + m * 3.2;
      const c = palette[Math.floor(rand() * palette.length)];
      const b = 0.35 + m * 0.9 + rand() * 0.25;
      colors[i * 3] = c.r * b;
      colors[i * 3 + 1] = c.g * b;
      colors[i * 3 + 2] = c.b * b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: { uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute vec3 color;
        uniform float uPixelRatio;
        varying vec3 vColor;
        void main() {
          vColor = color;
          gl_PointSize = size * uPixelRatio;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor * a, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: g, material: m };
  }, [count]);
  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);
  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

function MilkyWay() {
  const quality = useOrbit((s) => s.quality);
  const map = useTexture(texturePath(quality, "milky_way"), (t) => {
    (t as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
  });
  return (
    <mesh rotation={[0.45, 0, 0.62]} renderOrder={-10}>
      <sphereGeometry args={[700, 64, 32]} />
      <meshBasicMaterial map={map} side={THREE.BackSide} color={[0.3, 0.3, 0.34]} toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

export default function Sky() {
  const quality = useOrbit((s) => s.quality);
  return (
    <>
      <MilkyWay />
      <Stars count={QUALITY_SETTINGS[quality].stars} />
    </>
  );
}
