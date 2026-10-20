"use client";

import dynamic from "next/dynamic";

const OrbitExperience = dynamic(() => import("@/components/orbit/OrbitExperience"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#020306] text-[0.85rem] tracking-[0.6em] text-white/85">
      ORBIT
    </div>
  ),
});

export default function OrbitClient() {
  return <OrbitExperience />;
}
