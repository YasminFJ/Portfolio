"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const XP_PER_PLANET = 150;

type ProfileRow = {
  username: string;
  xp: number;
  discovered_planets: string[];
};

type AuthResult = { error: string | null };

export function useOrbitProfile() {
  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [authLoading, setAuthLoading] = useState(() => supabase !== null);
  const discoveredRef = useRef<Set<string>>(new Set());

  const loadProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return;
      const { data } = await supabase
        .from("profiles")
        .select("username, xp, discovered_planets")
        .eq("id", userId)
        .single();
      if (data) {
        setProfile(data);
        discoveredRef.current = new Set(data.discovered_planets);
      }
    },
    [supabase]
  );

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) loadProfile(data.session.user.id);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        loadProfile(newSession.user.id);
      } else {
        setProfile(null);
        discoveredRef.current = new Set();
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase, loadProfile]);

  const signUp = useCallback(
    async (email: string, password: string, username: string): Promise<AuthResult> => {
      if (!supabase) return { error: "Supabase no está configurado." };
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      return { error: error?.message ?? null };
    },
    [supabase]
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      if (!supabase) return { error: "Supabase no está configurado." };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, [supabase]);

  const discoverPlanet = useCallback(
    async (planetId: string) => {
      if (!supabase || !session) return;
      if (discoveredRef.current.has(planetId)) return;

      discoveredRef.current.add(planetId);
      const nextDiscovered = Array.from(discoveredRef.current);
      const nextXp = nextDiscovered.length * XP_PER_PLANET;

      setProfile((prev) =>
        prev ? { ...prev, xp: nextXp, discovered_planets: nextDiscovered } : prev
      );

      await supabase
        .from("profiles")
        .update({ xp: nextXp, discovered_planets: nextDiscovered })
        .eq("id", session.user.id);
    },
    [supabase, session]
  );

  return {
    configured: supabase !== null,
    authLoading,
    session,
    profile,
    signUp,
    signIn,
    signOut,
    discoverPlanet,
  };
}
