"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Orbit,
  Settings2,
  UserRound,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { getPlanet, planets, sun } from "@/lib/planets";
import { useOrbit, type Quality } from "../state/store";
import { glass, eyebrow, IconButton, Segmented, Toggle } from "./ui";
import AccountPanel, { type AccountProps } from "./AccountPanel";

const BODIES = [{ id: "sun", name: "Sun" }, ...planets.map((p) => ({ id: p.id, name: p.name }))];
const SPEEDS = [
  { value: 0.25, label: "¼×" },
  { value: 1, label: "1×" },
  { value: 3, label: "3×" },
  { value: 8, label: "8×" },
];
const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } };

type HudProps = { audioEnabled: boolean; onToggleAudio: () => void; account: AccountProps };

function TopBar({ audioEnabled, onToggleAudio, account }: HudProps) {
  const panel = useOrbit((s) => s.panel);
  const setPanel = useOrbit((s) => s.setPanel);
  const requestOverview = useOrbit((s) => s.requestOverview);
  const xp = account.profile?.xp;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-5">
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className={`${glass} flex h-10 items-center gap-2 rounded-full px-3.5 text-[0.78rem] text-white/75 transition-colors hover:text-white`}
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={15} strokeWidth={1.6} />
          <span className="hidden sm:inline">Portfolio</span>
        </Link>
        <div className="select-none">
          <p className="text-[0.78rem] font-medium tracking-[0.55em] text-white/90">ORBIT</p>
          <p className="mt-0.5 hidden text-[0.66rem] tracking-[0.12em] text-white/40 sm:block">Solar system observatory</p>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        {typeof xp === "number" && (
          <span className={`${glass} hidden h-10 items-center rounded-full px-3.5 text-[0.72rem] tabular-nums text-white/70 sm:flex`}>
            {xp} XP
          </span>
        )}
        <nav aria-label="Observatory controls" className={`${glass} flex items-center rounded-full p-0.5`}>
          <IconButton label="Overview of the solar system" onClick={() => requestOverview()}>
            <Orbit size={17} strokeWidth={1.5} />
          </IconButton>
          <IconButton label={audioEnabled ? "Mute ambient sound" : "Play ambient sound"} active={audioEnabled} onClick={onToggleAudio}>
            {audioEnabled ? <Volume2 size={17} strokeWidth={1.5} /> : <VolumeX size={17} strokeWidth={1.5} />}
          </IconButton>
          <IconButton label="Settings" active={panel === "settings"} onClick={() => setPanel(panel === "settings" ? null : "settings")}>
            <Settings2 size={17} strokeWidth={1.5} />
          </IconButton>
          <IconButton label="Account" active={panel === "account"} onClick={() => setPanel(panel === "account" ? null : "account")}>
            <UserRound size={17} strokeWidth={1.5} />
          </IconButton>
        </nav>
      </div>

      <AnimatePresence>
        {panel && (
          <motion.div
            key={panel}
            {...fade}
            className={`${glass} pointer-events-auto absolute right-3 top-[62px] w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl p-5 sm:right-5 sm:top-[72px]`}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className={eyebrow}>{panel === "settings" ? "Settings" : "Explorer account"}</p>
              <button type="button" onClick={() => setPanel(null)} aria-label="Close panel" className="text-white/50 hover:text-white">
                <X size={15} />
              </button>
            </div>
            {panel === "settings" ? <SettingsPanel /> : <AccountPanel {...account} />}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SettingsPanel() {
  const s = useOrbit();
  return (
    <div className="space-y-4">
      <div className="divide-y divide-white/[0.06]">
        <Toggle label="Orbit paths" on={s.showOrbits} onChange={s.toggleOrbits} />
        <Toggle label="Labels" on={s.showLabels} onChange={s.toggleLabels} />
      </div>
      <div className="sm:hidden">
        <p className="mb-2 text-[0.72rem] text-white/50">Simulation speed</p>
        <Segmented label="Simulation speed" value={s.timeScale} options={SPEEDS} onChange={s.setTimeScale} />
      </div>
      <div>
        <p className="mb-2 text-[0.72rem] text-white/50">Graphics quality</p>
        <Segmented<Quality>
          label="Graphics quality"
          value={s.quality}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          onChange={(q) => s.setQuality(q)}
        />
      </div>
      <p className="border-t border-white/[0.06] pt-3 text-[0.66rem] leading-relaxed text-white/35">
        Planet textures:{" "}
        <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white/60">
          Solar System Scope
        </a>{" "}
        (CC BY 4.0), based on NASA data. Distances and sizes use an adapted scale.
      </p>
    </div>
  );
}

function SignalToast() {
  const visible = useOrbit((s) => s.signalVisible);
  const focusId = useOrbit((s) => s.focusId);
  const focus = useOrbit((s) => s.focus);
  return (
    <AnimatePresence>
      {visible && focusId !== "blackhole" && (
        <motion.button
          {...fade}
          type="button"
          onClick={() => focus("blackhole")}
          className={`${glass} pointer-events-auto absolute left-1/2 top-[64px] z-20 flex -translate-x-1/2 items-center gap-3 rounded-full py-2 pl-3.5 pr-4 text-left sm:top-6`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9b6ff] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9b6ff]" />
          </span>
          <span>
            <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-white/50">Unidentified signal</span>
            <span className="block text-[0.78rem] text-white/85">Investigate the source</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function BodyNav() {
  const focusId = useOrbit((s) => s.focusId);
  const focus = useOrbit((s) => s.focus);
  const listRef = useRef<HTMLUListElement>(null);
  const index = BODIES.findIndex((b) => b.id === focusId);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-body="${focusId}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [focusId]);

  const step = (d: number) => {
    const next = BODIES[(index + d + BODIES.length) % BODIES.length] ?? BODIES[0];
    focus(next.id);
  };

  return (
    <nav aria-label="Celestial bodies" className="pointer-events-auto absolute inset-x-3 bottom-3 z-20 flex justify-center sm:bottom-5">
      <div className={`${glass} flex max-w-full items-center rounded-full p-1`}>
        <IconButton label="Previous body" onClick={() => step(-1)} className="hidden h-9 w-9 sm:flex">
          <ChevronLeft size={16} strokeWidth={1.5} />
        </IconButton>
        <ul ref={listRef} className="orbit-scroll flex snap-x overflow-x-auto">
          {BODIES.map((b) => {
            const active = focusId === b.id;
            return (
              <li key={b.id} className="snap-center">
                <button
                  type="button"
                  data-body={b.id}
                  aria-current={active ? "true" : undefined}
                  onClick={() => focus(b.id)}
                  className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[0.76rem] tracking-wide transition-colors duration-300 sm:px-3.5 ${
                    active ? "bg-white/[0.12] text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {b.name}
                </button>
              </li>
            );
          })}
        </ul>
        <IconButton label="Next body" onClick={() => step(1)} className="hidden h-9 w-9 sm:flex">
          <ChevronRight size={16} strokeWidth={1.5} />
        </IconButton>
      </div>
    </nav>
  );
}

function TimeControl() {
  const timeScale = useOrbit((s) => s.timeScale);
  const paused = useOrbit((s) => s.paused);
  const setTimeScale = useOrbit((s) => s.setTimeScale);
  const togglePaused = useOrbit((s) => s.togglePaused);
  return (
    <div className={`${glass} pointer-events-auto absolute bottom-5 left-5 z-20 hidden items-center gap-1 rounded-full p-1 pr-1.5 xl:flex`}>
      <IconButton label={paused ? "Resume simulation" : "Pause simulation"} onClick={togglePaused} className="h-9 w-9">
        {paused ? <Play size={15} strokeWidth={1.5} /> : <Pause size={15} strokeWidth={1.5} />}
      </IconButton>
      <div className="w-44">
        <Segmented label="Simulation speed" value={paused ? -1 : timeScale} options={SPEEDS} onChange={setTimeScale} />
      </div>
    </div>
  );
}

type Fact = [string, string];

function infoFor(id: string): { eyebrow: string; title: string; text: string; facts: Fact[] } | null {
  if (id === "sun") {
    return {
      eyebrow: sun.kind,
      title: sun.name,
      text: sun.description,
      facts: [
        ["Diameter", sun.facts.diameter],
        ["Surface", sun.facts.surfaceTemperature],
        ["Age", sun.facts.age],
        ["Mass", sun.facts.mass],
      ],
    };
  }
  if (id === "blackhole") {
    return {
      eyebrow: "Unidentified signal",
      title: "Gravitational anomaly",
      text: "An object of extreme mass is bending space around it. No further data is available — this is the edge of what the observatory can reach, for now.",
      facts: [],
    };
  }
  const p = getPlanet(id);
  if (!p) return null;
  return {
    eyebrow: p.kind,
    title: p.name,
    text: p.description,
    facts: [
      ["From the Sun", p.facts.distanceFromSun],
      ["Diameter", p.facts.diameter],
      ["Gravity", p.facts.gravity],
      ["Temperature", p.facts.temperature],
      ["Day", p.facts.dayLength],
      ["Year", p.facts.yearLength],
      ["Moons", p.facts.moons],
    ],
  };
}

function InfoPanel() {
  const focusId = useOrbit((s) => s.focusId);
  const collapsed = useOrbit((s) => s.infoCollapsed);
  const setCollapsed = useOrbit((s) => s.setInfoCollapsed);
  const info = focusId ? infoFor(focusId) : null;

  return (
    <AnimatePresence mode="wait">
      {info && (
        <motion.aside
          key={focusId}
          {...fade}
          aria-label={`${info.title} details`}
          className={`${glass} pointer-events-auto absolute inset-x-3 bottom-[68px] z-20 max-h-[48dvh] overflow-y-auto rounded-2xl sm:bottom-[84px] sm:left-auto sm:right-5 sm:w-[320px] lg:bottom-auto lg:top-1/2 lg:max-h-[70vh] lg:-translate-y-1/2`}
        >
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-expanded={!collapsed}
            className="flex w-full items-start justify-between gap-4 px-5 pb-3 pt-4 text-left lg:px-6 lg:pt-6"
          >
            <span>
              <span className={eyebrow}>{info.eyebrow}</span>
              <span className="mt-1.5 block font-serif text-[1.9rem] font-light leading-none text-white lg:text-[2.4rem]">{info.title}</span>
            </span>
            <ChevronDown size={16} strokeWidth={1.5} className={`mt-1 shrink-0 text-white/50 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
          </button>
          {!collapsed && (
            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
              <p className="text-[0.82rem] leading-[1.65] text-white/65">{info.text}</p>
              {info.facts.length > 0 && (
                <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3.5 border-t border-white/[0.07] pt-4">
                  {info.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-white/38">{k}</dt>
                      <dd className="mt-1 text-[0.8rem] tabular-nums text-white/85">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function Loader() {
  const { progress, active } = useProgress();
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");
  useEffect(() => {
    if (phase !== "loading" || active || progress < 100) return;
    const a = setTimeout(() => setPhase("fading"), 300);
    const b = setTimeout(() => setPhase("done"), 1600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [active, progress, phase]);
  if (phase === "done") return null;
  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#020306] transition-opacity duration-[1200ms] ease-out ${phase === "fading" ? "opacity-0" : "opacity-100"}`}
      role="status"
      aria-live="polite"
    >
      <p className="text-[0.85rem] tracking-[0.6em] text-white/85">ORBIT</p>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
        <div className="h-full bg-white/70 transition-[width] duration-300" style={{ width: `${Math.round(progress)}%` }} />
      </div>
      <p className="mt-4 text-[0.66rem] tracking-[0.2em] text-white/35">CALIBRATING INSTRUMENTS · {Math.round(progress)}%</p>
    </div>
  );
}

function Hint() {
  const [show, setShow] = useState(true);
  const focusId = useOrbit((s) => s.focusId);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 9000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && !focusId && (
        <motion.p
          {...fade}
          className="pointer-events-none absolute inset-x-0 bottom-[72px] z-10 text-center text-[0.7rem] tracking-[0.14em] text-white/45 sm:bottom-[88px]"
        >
          <span className="hidden sm:inline">Drag to look around · Scroll to zoom · Select a planet to fly there</span>
          <span className="sm:hidden">Drag to look around · Pinch to zoom · Tap a planet</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function Hud(props: HudProps) {
  return (
    <div className="pointer-events-none absolute inset-0 font-sans text-white">
      <TopBar {...props} />
      <SignalToast />
      <InfoPanel />
      <TimeControl />
      <BodyNav />
      <Hint />
      <Loader />
    </div>
  );
}
