"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { T, type Locale } from "@/content/home";

/** Locale from the URL: /en and /projects… are English, everything else Spanish. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") || pathname.startsWith("/projects") ? "en" : "es";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = T[locale];
  const homePath = locale === "en" ? "/en" : "/";
  const isHome = pathname === homePath;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  const href = (hash: string) => (isHome ? hash : `${homePath}${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = t.nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome, t.nav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_1px_0_var(--line)] backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav aria-label={locale === "es" ? "Principal" : "Main"} className="mx-auto flex h-16 max-w-[78rem] items-center justify-between gap-6 px-5 sm:px-8 xl:px-10">
        <Link href={homePath} className="text-[0.95rem] font-semibold tracking-[0.02em] text-ink">
          YASMIN FENNOU.
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {t.nav.map((n) => {
            const id = n.href.slice(1);
            const current = isHome && active === id;
            return (
              <li key={n.href}>
                <a
                  href={href(n.href)}
                  aria-current={current ? "true" : undefined}
                  className={`relative block py-2 text-[0.86rem] transition-colors ${current ? "text-ink" : "text-charcoal/75 hover:text-ink"}`}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink transition-opacity ${current ? "opacity-100" : "opacity-0"}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={t.lang.href}
            hrefLang={locale === "es" ? "en" : "es"}
            className="hidden rounded-md px-2.5 py-2 text-[0.8rem] text-charcoal/75 transition-colors hover:text-ink sm:block"
          >
            {locale === "es" ? "EN" : "ES"}
            <span className="sr-only"> — {t.lang.label}</span>
          </Link>
          <a
            href={href("#contacto")}
            className="hidden items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-[0.84rem] font-medium text-white transition-colors hover:bg-charcoal sm:inline-flex"
          >
            {t.talk} <ArrowRight size={15} aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.close : t.menu}
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-cream lg:hidden">
          <ul className="mx-auto max-w-[78rem] px-5 py-3 sm:px-8">
            {t.nav.map((n) => (
              <li key={n.href}>
                <a href={href(n.href)} onClick={() => setOpen(false)} className="block border-b border-line py-3.5 text-[1rem] text-ink">
                  {n.label}
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between gap-4 py-4">
              <Link href={t.lang.href} onClick={() => setOpen(false)} className="text-[0.95rem] text-charcoal">
                {t.lang.label}
              </Link>
              <a
                href={href("#contacto")}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-[0.88rem] font-medium text-white"
              >
                {t.talk} <ArrowRight size={15} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
