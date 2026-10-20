"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Monogram from "@/components/ui/Monogram";

const NAV = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
];

export default function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const reduce = useReducedMotion();

  const href = (id: string) => {
    if (id === "work" && !isHome) return "/projects";
    if (id === "top") return isHome ? "#top" : "/";
    return isHome ? `#${id}` : `/#${id}`;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator (home only)
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome, pathname]);

  // Mobile menu locks body scroll, so in-page jumps are done after unlocking.
  const onMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false);
    if (!isHome) return;
    e.preventDefault();
    // Wait for the effect below to release the scroll lock before jumping.
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
    }, 60);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = isHome ? active : pathname.startsWith("/projects") ? "work" : "";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-cream/85 shadow-[0_6px_24px_-18px_rgb(43_38_34/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-cream/0"
      }`}
    >
      <div className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-16" : "h-[4.5rem]"}`}>
        <Link href="/" className="group flex items-center gap-4" aria-label={`${name} — home`}>
          <Monogram className="transition-transform duration-300 group-hover:-translate-y-px" />
          <span className="hidden text-[0.8rem] tracking-[0.01em] text-charcoal sm:inline">{name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const isActive = current === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={href(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative py-2 text-[0.8rem] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-charcoal/80 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={href("contact")} className="btn btn-dark hidden !px-4 !py-2.5 text-[0.78rem] sm:inline-flex">
            Let&apos;s work together
            <ArrowRight size={15} className="arrow" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong text-ink transition-colors hover:bg-paper lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-cream lg:hidden"
          >
            <nav aria-label="Mobile" className="shell py-6">
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.04 * i + 0.05, duration: 0.3 }}
                  >
                    <a
                      href={href(item.id)}
                      onClick={(e) => onMobileNav(e, item.id)}
                      className="flex items-center justify-between border-b border-line py-3.5 font-serif text-2xl text-ink"
                    >
                      {item.label}
                      <ArrowRight size={16} className="text-muted" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href={href("contact")} onClick={(e) => onMobileNav(e, "contact")} className="btn btn-dark mt-6 w-full">
                Let&apos;s work together <ArrowRight size={15} className="arrow" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
