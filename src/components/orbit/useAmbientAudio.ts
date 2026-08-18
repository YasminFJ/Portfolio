"use client";

import { useCallback, useRef, useState } from "react";

type AudioNodes = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

/**
 * Genera un drone ambiental sintetizado con la Web Audio API, sin
 * depender de ningún archivo de audio externo.
 */
export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const nodesRef = useRef<AudioNodes | null>(null);

  const start = useCallback(() => {
    if (nodesRef.current) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const context = new AudioCtx();
    const masterGain = context.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(context.destination);
    masterGain.gain.linearRampToValueAtTime(0.05, context.currentTime + 1.5);

    const freqs = [55, 82.4, 110];
    const oscillators = freqs.map((freq, i) => {
      const osc = context.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const lfo = context.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.02;
      const lfoGain = context.createGain();
      lfoGain.gain.value = 3;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      const voiceGain = context.createGain();
      voiceGain.gain.value = 1 / freqs.length;
      osc.connect(voiceGain);
      voiceGain.connect(masterGain);
      osc.start();
      return osc;
    });

    nodesRef.current = { context, gain: masterGain, oscillators };
    setEnabled(true);
  }, []);

  const stop = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    const { context, gain, oscillators } = nodes;
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.8);
    setTimeout(() => {
      oscillators.forEach((osc) => osc.stop());
      context.close();
    }, 900);
    nodesRef.current = null;
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      stop();
    } else {
      start();
    }
  }, [enabled, start, stop]);

  return { enabled, toggle };
}
