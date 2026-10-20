"use client";

import { useState } from "react";
import { planets } from "@/lib/planets";

type Profile = { username: string; xp: number; discovered_planets: string[] } | null;

export type AccountProps = {
  configured: boolean;
  authLoading: boolean;
  isLoggedIn: boolean;
  profile: Profile;
  onSignIn: (email: string, password: string) => Promise<{ error: string | null }>;
  onSignUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  onSignOut: () => void;
};

const input =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.82rem] text-white placeholder:text-white/30 transition-colors focus:border-white/35 focus:outline-none";

export default function AccountPanel({ configured, authLoading, isLoggedIn, profile, onSignIn, onSignUp, onSignOut }: AccountProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!configured) {
    return <p className="text-[0.8rem] leading-relaxed text-white/60">Saved progress is not available right now. You can keep exploring as a guest.</p>;
  }
  if (authLoading) return <p className="text-[0.8rem] text-white/50">Connecting…</p>;

  if (isLoggedIn) {
    const found = profile?.discovered_planets.length ?? 0;
    return (
      <div className="space-y-4">
        <div>
          <p className="font-serif text-[1.5rem] font-light text-white">{profile?.username ?? "Explorer"}</p>
          <p className="mt-1 text-[0.78rem] text-white/55">Progress is saved to your account.</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-4">
          <div>
            <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">Experience</dt>
            <dd className="mt-1 text-[0.95rem] tabular-nums text-white">{profile?.xp ?? 0} XP</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">Discovered</dt>
            <dd className="mt-1 text-[0.95rem] tabular-nums text-white">
              {found} / {planets.length}
            </dd>
          </div>
        </dl>
        <button type="button" onClick={onSignOut} className="text-[0.76rem] text-white/50 underline-offset-4 hover:text-white hover:underline">
          Sign out
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = mode === "login" ? await onSignIn(email, password) : await onSignUp(email, password, username || email.split("@")[0]);
    setSubmitting(false);
    if (result.error) return setError(result.error);
    if (mode === "signup") {
      setNotice("Account created. Check your email to confirm it, then sign in.");
      setMode("login");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="text-[0.8rem] leading-relaxed text-white/60">
        ORBIT is fully playable as a guest. An account is optional and keeps your discoveries across devices.
      </p>
      <div className="flex rounded-full border border-white/10 p-0.5 text-[0.72rem]">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 rounded-full py-1 transition-colors ${mode === m ? "bg-white/85 text-[#0b0d12]" : "text-white/60 hover:text-white"}`}
          >
            {m === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      {mode === "signup" && (
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Explorer name" autoComplete="nickname" className={input} />
      )}
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" className={input} required />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        className={input}
        required
        minLength={6}
      />
      {error && <p className="text-[0.74rem] text-[#f2a7a7]">{error}</p>}
      {notice && <p className="text-[0.74rem] text-[#a7e3c4]">{notice}</p>}
      <button
        type="submit"
        disabled={submitting || !email || !password}
        className="w-full rounded-full bg-white/90 py-2 text-[0.8rem] font-medium text-[#0b0d12] transition-opacity hover:bg-white disabled:opacity-40"
      >
        {submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}
