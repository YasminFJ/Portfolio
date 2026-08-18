import type { Metadata } from "next";
import OrbitClient from "./orbit-client";

export const metadata: Metadata = {
  title: "ORBIT — Explorador del Sistema Solar | Yasmin Fennou Jabal",
  description:
    "Experiencia 3D interactiva del sistema solar construida con React Three Fiber y Three.js.",
};

export default function OrbitPage() {
  return <OrbitClient />;
}
