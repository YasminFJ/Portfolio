import * as THREE from "three";

/**
 * Live registry of body positions in world space, written by each body every
 * frame and read by the camera (and later the ship, radar and proximity checks).
 * A plain mutable map avoids React re-renders at 60 fps.
 */
export type BodyEntry = { position: THREE.Vector3; radius: number };

const registry = new Map<string, BodyEntry>();

export function registerBody(id: string, radius: number) {
  let entry = registry.get(id);
  if (!entry) {
    entry = { position: new THREE.Vector3(), radius };
    registry.set(id, entry);
  }
  entry.radius = radius;
  return entry;
}

export function getBody(id: string) {
  return registry.get(id) ?? null;
}
