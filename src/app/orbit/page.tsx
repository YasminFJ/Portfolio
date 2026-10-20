import type { Metadata } from "next";
import OrbitClient from "./orbit-client";

export const metadata: Metadata = {
  title: "ORBIT — Solar System Observatory | Yasmin Fennou Jabal",
  description:
    "An interactive, cinematic 3D solar system built with React Three Fiber, Three.js and Supabase by Yasmin Fennou Jabal.",
  alternates: { canonical: "/orbit" },
};

export const viewport = { themeColor: "#020306" };

export default function OrbitPage() {
  return <OrbitClient />;
}
