"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import { Canvas, type RootState } from "@react-three/fiber";
import * as THREE from "three";

import Sun from "@/components/orbit/scene/Sun";
import Planet from "@/components/orbit/scene/Planet";
import Sky from "@/components/orbit/scene/Sky";
import BlackHole from "@/components/orbit/scene/BlackHole";
import CameraDirector from "@/components/orbit/scene/CameraDirector";
import Hud from "@/components/orbit/hud/Hud";
import { useAmbientAudio } from "@/components/orbit/useAmbientAudio";
import { useOrbitProfile } from "@/components/orbit/useOrbitProfile";
import { useOrbit } from "@/components/orbit/state/store";
import { QUALITY_SETTINGS } from "@/components/orbit/state/quality";
import { planets } from "@/lib/planets";

const BODY_ORDER = ["sun", ...planets.map((p) => p.id)];
const SIGNAL_DELAY_MS = 22000;

export default function OrbitExperience() {
  const quality = useOrbit((s) => s.quality);
  const focusId = useOrbit((s) => s.focusId);
  const rendererRef = useRef<RootState["gl"] | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const { enabled: audioEnabled, toggle: toggleAudio } = useAmbientAudio();
  const { configured, authLoading, session, profile, signIn, signUp, signOut, resendConfirmation, requestPasswordReset, updatePassword, discoverPlanet } =
    useOrbitProfile();

  // Returning from an email link (/auth/callback): open the account panel with the result
  // and remove the parameter from the address bar.
  useEffect(() => {
    const url = new URL(window.location.href);
    const status = url.searchParams.get("auth");
    if (!status) return;
    url.searchParams.delete("auth");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    useOrbit.getState().setAuthStatus(status);
    useOrbit.getState().setPanel("account");
  }, []);

  // The original easter egg: an unidentified signal appears after a while.
  useEffect(() => {
    const t = setTimeout(() => useOrbit.getState().revealSignal(), SIGNAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Discoveries are recorded when a planet is visited (signed-in explorers only, for now).
  useEffect(() => {
    if (focusId && planets.some((p) => p.id === focusId)) void discoverPlanet(focusId);
  }, [focusId, discoverPlanet]);

  // Keyboard: arrows cycle through bodies, Esc returns to the overview.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input, textarea")) return;
      const s = useOrbit.getState();
      if (e.key === "Escape") {
        if (s.panel) s.setPanel(null);
        else s.requestOverview();
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const i = BODY_ORDER.indexOf(s.focusId ?? "");
        const d = e.key === "ArrowRight" ? 1 : -1;
        s.focus(BODY_ORDER[(i + d + BODY_ORDER.length) % BODY_ORDER.length]);
      } else if (e.key === " ") {
        e.preventDefault();
        s.togglePaused();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Safety net kept from the original build: in some production environments the
  // first canvas measurement never fires and the canvas stays at 300×150. If the
  // drawing buffer ever disagrees with the viewport, resize it.
  const applyCanvasSize = useCallback(() => {
    const gl = rendererRef.current;
    const camera = cameraRef.current;
    if (!gl || !camera) return;
    gl.setSize(window.innerWidth, window.innerHeight, true);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    let raf = 0;
    let frame = 0;
    const guard = () => {
      // Checking every 30 frames is enough and keeps the loop idle.
      if (++frame % 30 === 0) {
        const gl = rendererRef.current;
        if (gl) {
          const dpr = gl.getPixelRatio();
          const c = gl.domElement;
          if (c.width !== Math.round(window.innerWidth * dpr) || c.height !== Math.round(window.innerHeight * dpr)) applyCanvasSize();
        }
      }
      raf = requestAnimationFrame(guard);
    };
    raf = requestAnimationFrame(guard);
    window.addEventListener("resize", applyCanvasSize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", applyCanvasSize);
    };
  }, [applyCanvasSize]);

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#020306]">
      <Canvas
        dpr={QUALITY_SETTINGS[quality].dpr}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 40, 90], fov: 42, near: 0.05, far: 2400 }}
        onCreated={(state) => {
          rendererRef.current = state.gl;
          cameraRef.current = state.camera as THREE.PerspectiveCamera;
          state.gl.toneMapping = THREE.ACESFilmicToneMapping;
          state.gl.toneMappingExposure = 1.05;
          applyCanvasSize();
        }}
      >
        <color attach="background" args={["#020306"]} />
        <ambientLight intensity={0.11} color="#aebfff" />
        <Suspense fallback={null}>
          <Sky />
          <Sun />
          {planets.map((p) => (
            <Planet key={p.id} data={p} />
          ))}
        </Suspense>
        <BlackHole />
        <CameraDirector />
      </Canvas>

      <Hud
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
        account={{
          configured,
          authLoading,
          isLoggedIn: session !== null,
          profile,
          onSignIn: signIn,
          onSignUp: signUp,
          onSignOut: signOut,
          onResendConfirmation: resendConfirmation,
          onRequestPasswordReset: requestPasswordReset,
          onUpdatePassword: updatePassword,
        }}
      />
    </div>
  );
}
