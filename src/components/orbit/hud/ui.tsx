"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Shared glass surface used by every HUD element. */
export const glass =
  "border border-white/[0.08] bg-[rgba(8,10,14,0.55)] backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]";

export function IconButton({
  label,
  active,
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; active?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-300 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/60 ${
        active ? "bg-white/[0.1] text-white" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="flex w-full items-center justify-between py-2 text-[0.8rem] text-white/75 transition-colors hover:text-white"
    >
      {label}
      <span className={`relative h-[18px] w-8 rounded-full transition-colors duration-300 ${on ? "bg-white/80" : "bg-white/15"}`}>
        <span
          className={`absolute top-[3px] h-3 w-3 rounded-full transition-all duration-300 ${on ? "left-[17px] bg-[#0b0d12]" : "left-[3px] bg-white/60"}`}
        />
      </span>
    </button>
  );
}

export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full border border-white/10 p-0.5">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-full px-2.5 py-1 text-[0.72rem] tabular-nums transition-colors duration-300 ${
            value === o.value ? "bg-white/85 text-[#0b0d12]" : "text-white/60 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export const eyebrow = "text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/45";
