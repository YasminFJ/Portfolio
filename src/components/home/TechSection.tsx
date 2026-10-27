"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import BrandIcon from "@/components/ui/BrandIcon";
import { STACK_GROUPS, STACK_HIGHLIGHT, T, type Locale } from "@/content/home";

const SLUG: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  "Node.js": "nodedotjs",
  PostgreSQL: "postgresql",
  Supabase: "supabase",
  WordPress: "wordpress",
  Docker: "docker",
};

export default function TechSection({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <h2 id="tech-title" className="shrink-0 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ink">
          {t.technologies}
        </h2>
        <span aria-hidden className="hidden h-px flex-1 bg-line-strong sm:block" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="tech-all"
          className="group inline-flex shrink-0 items-center gap-2 text-[0.85rem] text-ink"
        >
          {open ? t.less : t.allTech}
          <ArrowRight size={15} aria-hidden className={`transition-transform ${open ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
        </button>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {STACK_HIGHLIGHT.map((name) => (
          <li key={name} data-reveal className="flex items-center justify-center gap-2.5 rounded-md border border-line bg-white px-3 py-4 text-[0.84rem] text-ink shadow-[var(--shadow-sm)]">
            <BrandIcon slug={SLUG[name]} name={name} size={20} />
            {name}
          </li>
        ))}
      </ul>
      <div id="tech-all" hidden={!open} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STACK_GROUPS.map((g) => (
          <div key={g.title.en} className="border-t border-line-strong pt-3">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">{g.title[locale]}</h3>
            <p className="mt-2 text-[0.9rem] leading-[1.7] text-charcoal/85">
              {g.items.map((i) => (locale === "en" && i === "Despliegues" ? "Deployments" : locale === "en" && i === "APIs REST" ? "REST APIs" : i)).join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
