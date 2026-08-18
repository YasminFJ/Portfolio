"use client";

import dynamic from "next/dynamic";

const OrbitExperience = dynamic(() => import("@/components/orbit/OrbitExperience"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#03040a] font-mono text-sm text-white/60">
      Cargando el sistema solar...
    </div>
  ),
});

export default function OrbitClient() {
  return <OrbitExperience />;
}
