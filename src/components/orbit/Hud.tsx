"use client";

import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { planets } from "@/lib/planets";

type HudProps = {
  selectedId: string | null;
  onSelectPlanet: (id: string) => void;
  onReset: () => void;
  timeScale: number;
  onTimeScaleChange: (v: number) => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  signalVisible: boolean;
  onSelectSignal: () => void;
  blackHoleActive: boolean;
};

export default function Hud({
  selectedId,
  onSelectPlanet,
  onReset,
  timeScale,
  onTimeScaleChange,
  showOrbits,
  onToggleOrbits,
  showLabels,
  onToggleLabels,
  audioEnabled,
  onToggleAudio,
  signalVisible,
  onSelectSignal,
  blackHoleActive,
}: HudProps) {
  const selectedPlanet = planets.find((p) => p.id === selectedId);

  return (
    <div className="pointer-events-none absolute inset-0 font-mono text-white">
      {/* Volver */}
      <Link
        href="/"
        className="pointer-events-auto absolute left-4 top-4 z-20 flex items-center gap-2 rounded-md border border-white/15 bg-black/50 px-3 py-2 text-xs backdrop-blur transition-colors hover:border-white/40"
      >
        <ArrowLeft size={14} />
        Volver al portfolio
      </Link>

      {/* Mission Control */}
      <div className="pointer-events-auto absolute left-4 top-16 z-20 w-56 rounded-md border border-white/15 bg-black/55 backdrop-blur">
        <div className="border-b border-white/15 bg-white/5 px-3 py-2 text-[11px] tracking-widest text-cyan-300">
          MISSION CONTROL
        </div>
        <div className="space-y-3 px-3 py-3 text-[11px]">
          <div>
            <div className="mb-1 flex justify-between text-white/60">
              <span>VELOCIDAD</span>
              <span>{timeScale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0}
              max={4}
              step={0.1}
              value={timeScale}
              onChange={(e) => onTimeScaleChange(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onToggleOrbits}
              className={`flex-1 rounded border px-2 py-1 transition-colors ${
                showOrbits
                  ? "border-cyan-400/60 text-cyan-300"
                  : "border-white/15 text-white/50"
              }`}
            >
              ÓRBITAS
            </button>
            <button
              onClick={onToggleLabels}
              className={`flex-1 rounded border px-2 py-1 transition-colors ${
                showLabels
                  ? "border-cyan-400/60 text-cyan-300"
                  : "border-white/15 text-white/50"
              }`}
            >
              ETIQUETAS
            </button>
          </div>

          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-1.5 rounded border border-white/15 px-2 py-1.5 text-white/70 transition-colors hover:border-white/40"
          >
            <RotateCcw size={12} />
            VISTA GENERAL
          </button>

          <button
            onClick={onToggleAudio}
            className="flex w-full items-center justify-center gap-1.5 rounded border border-white/15 px-2 py-1.5 text-white/70 transition-colors hover:border-white/40"
          >
            {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            {audioEnabled ? "AUDIO ACTIVO" : "AUDIO AMBIENTAL"}
          </button>
        </div>
      </div>

      {/* Celestial bodies list */}
      <div className="pointer-events-auto absolute right-4 top-4 z-20 w-52 rounded-md border border-white/15 bg-black/55 backdrop-blur">
        <div className="border-b border-white/15 bg-white/5 px-3 py-2 text-[11px] tracking-widest text-cyan-300">
          CUERPOS CELESTES
        </div>
        <ul className="max-h-[70vh] divide-y divide-white/10 overflow-y-auto text-[11px]">
          {planets.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onSelectPlanet(p.id)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/10 ${
                  selectedId === p.id ? "bg-white/10 text-cyan-300" : "text-white/75"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Señal desconocida */}
      {signalVisible && !blackHoleActive && (
        <button
          onClick={onSelectSignal}
          className="pointer-events-auto absolute bottom-6 right-4 z-20 animate-pulse rounded-md border border-purple-400/50 bg-purple-950/60 px-3 py-2 text-left text-[11px] backdrop-blur transition-colors hover:border-purple-300"
        >
          <p className="tracking-widest text-purple-300">SEÑAL DETECTADA</p>
          <p className="mt-0.5 text-white/60">Origen desconocido, más allá del sistema.</p>
        </button>
      )}

      {blackHoleActive && (
        <div className="pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 rounded-md border border-purple-400/50 bg-purple-950/70 px-4 py-2 text-center backdrop-blur">
          <p className="text-xs tracking-[0.3em] text-purple-300">SEÑAL DESCONOCIDA DETECTADA</p>
        </div>
      )}

      {/* Ficha de planeta seleccionado */}
      {selectedPlanet && (
        <div className="pointer-events-auto absolute bottom-6 left-4 z-20 w-64 rounded-md border border-white/15 bg-black/60 backdrop-blur">
          <div
            className="border-b border-white/15 px-3 py-2 text-sm font-semibold tracking-wide"
            style={{ color: selectedPlanet.color }}
          >
            {selectedPlanet.name.toUpperCase()}
          </div>
          <div className="space-y-1.5 px-3 py-3 text-[11px] text-white/75">
            <p>
              <span className="text-white/45">Distancia al Sol: </span>
              {selectedPlanet.distanceFromSun}
            </p>
            <p>
              <span className="text-white/45">Gravedad: </span>
              {selectedPlanet.gravity}
            </p>
            <p>
              <span className="text-white/45">Temperatura media: </span>
              {selectedPlanet.temperature}
            </p>
            <p>
              <span className="text-white/45">Duración del día: </span>
              {selectedPlanet.dayLength}
            </p>
            <p className="mt-2 border-t border-white/10 pt-2 leading-relaxed text-white/60">
              {selectedPlanet.fact}
            </p>
          </div>
        </div>
      )}

      {blackHoleActive && (
        <div className="pointer-events-auto absolute bottom-6 left-4 z-20 w-64 rounded-md border border-purple-400/30 bg-black/60 backdrop-blur">
          <div className="border-b border-purple-400/30 px-3 py-2 text-sm font-semibold tracking-wide text-purple-300">
            ANOMALÍA GRAVITACIONAL
          </div>
          <div className="px-3 py-3 text-[11px] leading-relaxed text-white/70">
            Un objeto de masa extrema deforma el espacio a su alrededor. No hay más datos
            disponibles: es el límite de lo que este sistema puede explorar por ahora.
          </div>
        </div>
      )}

      {/* Título */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-[10px] tracking-[0.4em] text-white/30">
        ORBIT · EXPLORADOR DEL SISTEMA SOLAR
      </div>
    </div>
  );
}
