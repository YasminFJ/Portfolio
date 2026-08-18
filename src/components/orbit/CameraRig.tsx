"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MutableRefObject } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type Focus = { position: THREE.Vector3; size: number } | null;

type CameraRigProps = {
  focusRef: MutableRefObject<Focus>;
  controlsRef: MutableRefObject<OrbitControlsImpl | null>;
};

const tmpCamPos = new THREE.Vector3();

export default function CameraRig({ focusRef, controlsRef }: CameraRigProps) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const focus = focusRef.current;
    const controls = controlsRef.current;
    if (!focus || !controls) return;

    const viewDistance = Math.max(focus.size * 5.5, 2.5);
    const dir = camera.position.clone().sub(controls.target);
    if (dir.lengthSq() < 0.0001) dir.set(0.6, 0.35, 1);
    dir.normalize().multiplyScalar(viewDistance);
    tmpCamPos.copy(focus.position).add(dir);

    const lerp = 1 - Math.pow(0.001, delta);
    camera.position.lerp(tmpCamPos, lerp);
    controls.target.lerp(focus.position, lerp);
    controls.update();
  });

  return null;
}
