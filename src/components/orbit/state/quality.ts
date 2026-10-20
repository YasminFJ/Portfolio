import type { Quality } from "./store";

export const QUALITY_SETTINGS: Record<
  Quality,
  { dpr: [number, number]; textures: "2k" | "1k"; segments: number; stars: number; clouds: boolean }
> = {
  high: { dpr: [1, 2], textures: "2k", segments: 96, stars: 9000, clouds: true },
  medium: { dpr: [1, 1.5], textures: "2k", segments: 64, stars: 6000, clouds: true },
  low: { dpr: [1, 1], textures: "1k", segments: 40, stars: 3500, clouds: false },
};

/** Rough first guess from the device; the user can override it in Settings. */
export function detectQuality(): Quality {
  if (typeof window === "undefined") return "medium";
  const small = Math.min(window.innerWidth, window.innerHeight) < 640;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  if (cores <= 4 || memory <= 2) return "low";
  if (small) return "medium";
  return "high";
}

export const texturePath = (q: Quality, name: string) => `/orbit/textures/${QUALITY_SETTINGS[q].textures}/${name}.webp`;
