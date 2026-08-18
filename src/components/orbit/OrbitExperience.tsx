"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

import Starfield from "@/components/orbit/Starfield";
import Planet from "@/components/orbit/Planet";
import BlackHole from "@/components/orbit/BlackHole";
import CameraRig, { type Focus } from "@/components/orbit/CameraRig";
import Hud from "@/components/orbit/Hud";
import AuthPanel from "@/components/orbit/AuthPanel";
import { useAmbientAudio } from "@/components/orbit/useAmbientAudio";
import { useOrbitProfile } from "@/components/orbit/useOrbitProfile";
import { planets, sun } from "@/lib/planets";

const BLACK_HOLE_POSITION: [number, number, number] = [46, 4, -20];

export default function OrbitExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timeScale, setTimeScale] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [signalVisible, setSignalVisible] = useState(false);
  const [blackHoleActive, setBlackHoleActive] = useState(false);

  const focusRef = useRef<Focus>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { enabled: audioEnabled, toggle: toggleAudio } = useAmbientAudio();
  const {
    configured: supabaseConfigured,
    authLoading,
    session,
    profile,
    signIn,
    signUp,
    signOut,
    discoverPlanet,
  } = useOrbitProfile();

  useEffect(() => {
    const timeout = setTimeout(() => setSignalVisible(true), 22000);
    return () => clearTimeout(timeout);
  }, []);

  const focusOnPlanetId = (id: string) => {
    const target = planets.find((p) => p.id === id);
    if (!target) return;
    setSelectedId(id);
    setBlackHoleActive(false);
    // La posición mundial real se calcula dentro del propio Planet en cada
    // frame; aquí solo aproximamos el radio orbital como punto de partida,
    // el CameraRig la corrige suavemente en cuanto el planeta reporta su
    // posición exacta a través de handlePlanetSelect.
    focusRef.current = {
      position: new THREE.Vector3(target.orbitRadius, 0, 0),
      size: target.size,
    };
    void discoverPlanet(id);
  };

  const handlePlanetSelect = (id: string, position: THREE.Vector3, size: number) => {
    setSelectedId(id);
    setBlackHoleActive(false);
    focusRef.current = { position: position.clone(), size };
    void discoverPlanet(id);
  };

  const handleBlackHoleSelect = (position: THREE.Vector3) => {
    setSelectedId("blackhole");
    setBlackHoleActive(true);
    focusRef.current = { position: position.clone(), size: 1.6 };
  };

  const handleReset = () => {
    setSelectedId(null);
    setBlackHoleActive(false);
    focusRef.current = { position: new THREE.Vector3(0, 0, 0), size: 9 };
    window.setTimeout(() => {
      focusRef.current = null;
    }, 1400);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#03040a]">
      <Canvas
        camera={{ position: [0, 20, 34], fov: 50, near: 0.1, far: 500 }}
        onPointerMissed={() => {
          setSelectedId(null);
          setBlackHoleActive(false);
        }}
      >
        <ambientLight intensity={0.22} />
        <pointLight position={[0, 0, 0]} intensity={4.5} color="#fff2cc" distance={140} decay={1.6} />

        <Starfield />

        <mesh>
          <sphereGeometry args={[sun.size, 48, 48]} />
          <meshBasicMaterial color={sun.color} />
        </mesh>
        <mesh>
          <sphereGeometry args={[sun.size * 1.25, 32, 32]} />
          <meshBasicMaterial color={sun.color} transparent opacity={0.12} />
        </mesh>

        {planets.map((planet) => (
          <Planet
            key={planet.id}
            data={planet}
            timeScale={timeScale}
            showOrbits={showOrbits}
            showLabels={showLabels}
            selected={selectedId === planet.id}
            onSelect={(id, position) => handlePlanetSelect(id, position, planet.size)}
          />
        ))}

        <BlackHole position={BLACK_HOLE_POSITION} onSelect={handleBlackHoleSelect} />

        <CameraRig focusRef={focusRef} controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={4}
          maxDistance={110}
          rotateSpeed={0.5}
          zoomSpeed={0.7}
        />
      </Canvas>

      <Hud
        selectedId={selectedId}
        onSelectPlanet={focusOnPlanetId}
        onReset={handleReset}
        timeScale={timeScale}
        onTimeScaleChange={setTimeScale}
        showOrbits={showOrbits}
        onToggleOrbits={() => setShowOrbits((v) => !v)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels((v) => !v)}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
        signalVisible={signalVisible}
        onSelectSignal={() => handleBlackHoleSelect(new THREE.Vector3(...BLACK_HOLE_POSITION))}
        blackHoleActive={blackHoleActive}
      />

      <AuthPanel
        configured={supabaseConfigured}
        authLoading={authLoading}
        isLoggedIn={session !== null}
        profile={profile}
        onSignIn={signIn}
        onSignUp={signUp}
        onSignOut={signOut}
      />
    </div>
  );
}
