"use client";

import { useState } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { planets } from "@/lib/planets";

type Profile = { username: string; xp: number; discovered_planets: string[] } | null;

type AuthPanelProps = {
  configured: boolean;
  authLoading: boolean;
  isLoggedIn: boolean;
  profile: Profile;
  onSignIn: (email: string, password: string) => Promise<{ error: string | null }>;
  onSignUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  onSignOut: () => void;
};

export default function AuthPanel({
  configured,
  authLoading,
  isLoggedIn,
  profile,
  onSignIn,
  onSignUp,
  onSignOut,
}: AuthPanelProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!configured) {
    return (
      <div className="pointer-events-auto absolute right-4 top-56 z-20 w-52 rounded-md border border-amber-400/30 bg-black/55 px-3 py-2 text-[10px] leading-relaxed text-amber-200/80 backdrop-blur">
        Progreso guardado desactivado: configura Supabase (ver README) para activar login y XP persistente.
      </div>
    );
  }

  if (authLoading) return null;

  if (isLoggedIn) {
    const discoveredCount = profile?.discovered_planets.length ?? 0;
    return (
      <div className="pointer-events-auto absolute right-4 top-56 z-20 w-52 rounded-md border border-white/15 bg-black/55 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/15 bg-white/5 px-3 py-2 text-[11px] tracking-widest text-cyan-300">
          <span className="flex items-center gap-1.5">
            <User size={12} />
            {(profile?.username ?? "PILOTO").toUpperCase()}
          </span>
          <button onClick={onSignOut} aria-label="Cerrar sesión" className="text-white/50 hover:text-white">
            <LogOut size={13} />
          </button>
        </div>
        <div className="space-y-1 px-3 py-3 text-[11px] text-white/70">
          <p>
            {discoveredCount}/{planets.length} planetas descubiertos
          </p>
          <p>{profile?.xp ?? 0} XP</p>
        </div>
      </div>
    );
  }

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    const result =
      mode === "login"
        ? await onSignIn(email, password)
        : await onSignUp(email, password, username || email.split("@")[0]);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (mode === "signup") {
      setNotice("Cuenta creada. Revisa tu email para confirmarla y luego inicia sesión.");
      setMode("login");
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="pointer-events-auto absolute right-4 top-56 z-20 w-52">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-white/15 bg-black/55 px-3 py-2 text-[11px] text-white/75 backdrop-blur transition-colors hover:border-white/40"
        >
          <LogIn size={13} />
          GUARDAR PROGRESO
        </button>
      ) : (
        <div className="rounded-md border border-white/15 bg-black/70 backdrop-blur">
          <div className="flex border-b border-white/15 text-[11px]">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 ${mode === "login" ? "bg-white/10 text-cyan-300" : "text-white/50"}`}
            >
              ENTRAR
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 ${mode === "signup" ? "bg-white/10 text-cyan-300" : "text-white/50"}`}
            >
              REGISTRO
            </button>
          </div>
          <div className="space-y-2 px-3 py-3">
            {mode === "signup" && (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de piloto"
                className="w-full rounded border border-white/15 bg-black/40 px-2 py-1.5 text-[11px] text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded border border-white/15 bg-black/40 px-2 py-1.5 text-[11px] text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
              className="w-full rounded border border-white/15 bg-black/40 px-2 py-1.5 text-[11px] text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
            />
            {error && <p className="text-[10px] text-red-400">{error}</p>}
            {notice && <p className="text-[10px] text-emerald-400">{notice}</p>}
            <button
              onClick={submit}
              disabled={submitting || !email || !password}
              className="w-full rounded bg-cyan-400 py-1.5 text-[11px] font-medium text-black transition-opacity disabled:opacity-40"
            >
              {submitting ? "..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full text-center text-[10px] text-white/40 hover:text-white/60"
            >
              cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
