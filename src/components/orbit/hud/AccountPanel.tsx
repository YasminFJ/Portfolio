"use client";

import { useState } from "react";
import { planets } from "@/lib/planets";
import { useOrbit } from "../state/store";

type Profile = { username: string; xp: number; discovered_planets: string[] } | null;
type Result = Promise<{ error: string | null; code?: string }>;

export type AccountProps = {
  configured: boolean;
  authLoading: boolean;
  isLoggedIn: boolean;
  profile: Profile;
  onSignIn: (email: string, password: string) => Result;
  onSignUp: (email: string, password: string, username: string) => Result;
  onSignOut: () => void;
  onResendConfirmation: (email: string) => Result;
  onRequestPasswordReset: (email: string) => Result;
  onUpdatePassword: (password: string) => Result;
};

type Mode = "login" | "signup" | "forgot";

const input =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.82rem] text-white placeholder:text-white/30 transition-colors focus:border-white/35 focus:outline-none";
const primary =
  "w-full rounded-full bg-white/90 py-2 text-[0.8rem] font-medium text-[#0b0d12] transition-opacity hover:bg-white disabled:opacity-40";
const link = "text-[0.74rem] text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline";

const STATUS: Record<string, { tone: "ok" | "warn"; text: string }> = {
  confirmed: { tone: "ok", text: "Email confirmed. Welcome to ORBIT." },
  "confirmed-signin": { tone: "ok", text: "Email confirmed. Sign in to continue." },
  "link-error": {
    tone: "warn",
    text: "This link is invalid or has already been used. If your account is not confirmed yet, request a new confirmation email.",
  },
  "recovery-error": { tone: "warn", text: "This reset link is invalid or has expired. Request a new one below." },
  unavailable: { tone: "warn", text: "Saved progress is not available right now. Please try again later." },
};

function Notice({ tone, children }: { tone: "ok" | "warn"; children: React.ReactNode }) {
  return (
    <p
      role="status"
      className={`rounded-lg border px-3 py-2 text-[0.76rem] leading-relaxed ${
        tone === "ok" ? "border-[#a7e3c4]/25 bg-[#a7e3c4]/[0.06] text-[#cdeedc]" : "border-[#f2c48d]/25 bg-[#f2c48d]/[0.06] text-[#f4dbb6]"
      }`}
    >
      {children}
    </p>
  );
}

function NewPassword({ onUpdatePassword, done }: { onUpdatePassword: AccountProps["onUpdatePassword"]; done: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const r = await onUpdatePassword(password);
    setBusy(false);
    if (r.error) return setError(r.error);
    done();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="text-[0.8rem] leading-relaxed text-white/65">Choose a new password for your explorer account.</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New password"
        autoComplete="new-password"
        minLength={6}
        required
        className={input}
      />
      {error && <p className="text-[0.74rem] text-[#f2a7a7]">{error}</p>}
      <button type="submit" disabled={busy || password.length < 6} className={primary}>
        {busy ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}

export default function AccountPanel(props: AccountProps) {
  const { configured, authLoading, isLoggedIn, profile, onSignIn, onSignUp, onSignOut, onResendConfirmation, onRequestPasswordReset, onUpdatePassword } =
    props;
  const authStatus = useOrbit((s) => s.authStatus);
  const setAuthStatus = useOrbit((s) => s.setAuthStatus);
  const [mode, setMode] = useState<Mode>(authStatus === "recovery-error" ? "forgot" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(authStatus === "link-error");
  const [submitting, setSubmitting] = useState(false);

  if (!configured) {
    return <p className="text-[0.8rem] leading-relaxed text-white/60">Saved progress is not available right now. You can keep exploring as a guest.</p>;
  }
  if (authLoading) return <p className="text-[0.8rem] text-white/50">Connecting…</p>;

  const status = authStatus ? STATUS[authStatus] : null;

  if (isLoggedIn && authStatus === "recovery") {
    return (
      <NewPassword
        onUpdatePassword={onUpdatePassword}
        done={() => {
          setAuthStatus(null);
          setNotice("Password updated.");
        }}
      />
    );
  }

  if (isLoggedIn) {
    const found = profile?.discovered_planets.length ?? 0;
    return (
      <div className="space-y-4">
        {status?.tone === "ok" && <Notice tone="ok">{authStatus === "confirmed-signin" ? STATUS.confirmed.text : status.text}</Notice>}
        {notice && <Notice tone="ok">{notice}</Notice>}
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
        <button
          type="button"
          onClick={() => {
            setAuthStatus(null);
            onSignOut();
          }}
          className={link}
        >
          Sign out
        </button>
      </div>
    );
  }

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setNotice(null);
  };

  const resend = async () => {
    if (!email) return setError("Enter your email to receive a new confirmation link.");
    setSubmitting(true);
    const r = await onResendConfirmation(email);
    setSubmitting(false);
    if (r.error) return setError(r.error);
    setError(null);
    setNeedsConfirmation(false);
    setNotice("A new confirmation email is on its way. Open the link to come back to ORBIT.");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);
    if (mode === "forgot") {
      const r = await onRequestPasswordReset(email);
      setSubmitting(false);
      if (r.error) return setError(r.error);
      setNotice("If an account exists for this email, a reset link is on its way.");
      return;
    }
    const r = mode === "login" ? await onSignIn(email, password) : await onSignUp(email, password, username || email.split("@")[0]);
    setSubmitting(false);
    if (r.error) {
      if (r.code === "email_not_confirmed") {
        setNeedsConfirmation(true);
        return setError("Please confirm your email first.");
      }
      return setError(r.error);
    }
    setAuthStatus(null);
    if (mode === "signup") {
      switchMode("login");
      setNotice("Account created. Check your email and open the confirmation link — it brings you back here.");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {status && <Notice tone={status.tone}>{status.text}</Notice>}
      {mode !== "forgot" && !status && (
        <p className="text-[0.8rem] leading-relaxed text-white/60">
          ORBIT is fully playable as a guest. An account is optional and keeps your discoveries across devices.
        </p>
      )}
      {mode === "forgot" ? (
        <p className="text-[0.8rem] leading-relaxed text-white/65">Enter your email and we will send you a link to choose a new password.</p>
      ) : (
        <div className="flex rounded-full border border-white/10 p-0.5 text-[0.72rem]">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 rounded-full py-1 transition-colors ${mode === m ? "bg-white/85 text-[#0b0d12]" : "text-white/60 hover:text-white"}`}
            >
              {m === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
      )}
      {mode === "signup" && (
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Explorer name" autoComplete="nickname" className={input} />
      )}
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="email" className={input} required />
      {mode !== "forgot" && (
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
      )}
      {error && <p className="text-[0.74rem] text-[#f2a7a7]">{error}</p>}
      {notice && <Notice tone="ok">{notice}</Notice>}
      <button type="submit" disabled={submitting || !email || (mode !== "forgot" && !password)} className={primary}>
        {submitting ? "Please wait…" : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        {mode === "login" && (
          <button type="button" onClick={() => switchMode("forgot")} className={link}>
            Forgot your password?
          </button>
        )}
        {mode === "forgot" && (
          <button type="button" onClick={() => switchMode("login")} className={link}>
            Back to sign in
          </button>
        )}
        {needsConfirmation && (
          <button type="button" onClick={resend} disabled={submitting} className={link}>
            Resend confirmation email
          </button>
        )}
      </div>
    </form>
  );
}
