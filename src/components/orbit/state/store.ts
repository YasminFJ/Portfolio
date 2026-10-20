"use client";

import { create } from "zustand";
import { detectQuality } from "./quality";

export type Quality = "high" | "medium" | "low";
export type Mode = "observatory" | "exploration";

type OrbitState = {
  mode: Mode;
  /** Body the camera is framing (planet id, "sun", "blackhole") or null for the overview */
  focusId: string | null;
  timeScale: number;
  paused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  quality: Quality;
  qualityLocked: boolean;
  signalVisible: boolean;
  /** Increments every time the user asks for the overview, so the camera can react */
  overviewRequest: number;
  panel: "settings" | "account" | null;
  infoCollapsed: boolean;

  focus: (id: string | null) => void;
  requestOverview: () => void;
  setTimeScale: (v: number) => void;
  togglePaused: () => void;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  setQuality: (q: Quality, locked?: boolean) => void;
  revealSignal: () => void;
  setPanel: (p: OrbitState["panel"]) => void;
  setInfoCollapsed: (v: boolean) => void;
};

export const useOrbit = create<OrbitState>((set) => ({
  mode: "observatory",
  focusId: null,
  timeScale: 1,
  paused: false,
  showOrbits: true,
  showLabels: true,
  quality: detectQuality(),
  qualityLocked: false,
  signalVisible: false,
  overviewRequest: 0,
  panel: null,
  infoCollapsed: false,

  focus: (id) => set({ focusId: id, infoCollapsed: typeof window !== "undefined" && window.innerWidth < 640 }),
  requestOverview: () => set((s) => ({ focusId: null, overviewRequest: s.overviewRequest + 1 })),
  setTimeScale: (v) => set({ timeScale: v, paused: false }),
  togglePaused: () => set((s) => ({ paused: !s.paused })),
  toggleOrbits: () => set((s) => ({ showOrbits: !s.showOrbits })),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  setQuality: (q, locked = true) => set({ quality: q, qualityLocked: locked }),
  revealSignal: () => set({ signalVisible: true }),
  setPanel: (p) => set({ panel: p }),
  setInfoCollapsed: (v) => set({ infoCollapsed: v }),
}));

/** Effective simulation speed (0 when paused). */
export const selectSimSpeed = (s: OrbitState) => (s.paused ? 0 : s.timeScale);
