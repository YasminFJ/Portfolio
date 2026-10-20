import Image from "next/image";
import { ArrowRight, Mail, MapPin, Monitor, Users } from "lucide-react";
import type { SiteContent } from "@/lib/content/types";
import CodeCard from "./CodeCard";

const FACT_ICONS = [MapPin, Monitor, Users];

export default function Hero({ site }: { site: SiteContent }) {
  return (
    <section id="top" className="relative overflow-hidden pt-[4.5rem]">
      {/* soft warm light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 30%, rgb(236 222 205 / 0.9), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgb(241 233 222 / 0.9), transparent 70%)",
        }}
      />
      <div className="shell grid items-start gap-12 pb-14 pt-10 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-14 lg:pt-6 xl:gap-10">
        {/* Left column */}
        <div className="relative z-10 max-w-[42rem] lg:pt-8">
          <p className="eyebrow rise" style={{ ["--d" as string]: "40ms" }}>
            {site.role}
          </p>
          <h1 className="display rise mt-6 text-[3.4rem] text-ink sm:text-[4.6rem] lg:text-[5.1rem] xl:text-[5.75rem]" style={{ ["--d" as string]: "120ms" }}>
            {site.firstName}
            <br />
            {site.lastName}
          </h1>
          <p className="heading rise mt-3 text-[2rem] text-ink sm:text-[2.5rem] xl:text-[2.75rem]" style={{ ["--d" as string]: "220ms" }}>
            {site.role}
          </p>
          <p className="rise mt-6 max-w-[33rem] text-[0.98rem] leading-[1.7] text-charcoal/90" style={{ ["--d" as string]: "300ms" }}>
            {site.heroIntro}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3.5" style={{ ["--d" as string]: "380ms" }}>
            <a href="#work" className="btn btn-dark min-w-[9.5rem]">
              View Projects <ArrowRight size={16} className="arrow" />
            </a>
            <a href="#contact" className="btn btn-ghost min-w-[8rem]">
              <Mail size={16} /> Contact
            </a>
          </div>
          <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[0.78rem] xl:flex-nowrap text-charcoal" style={{ ["--d" as string]: "460ms" }}>
            {site.heroFacts.map((fact, i) => {
              const Icon = FACT_ICONS[i % FACT_ICONS.length];
              return (
                <li key={fact} className="flex items-center gap-2.5">
                  <Icon size={16} strokeWidth={1.5} className="text-muted" />
                  {fact}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column: photo + code card + handwriting */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-none">
          <div className="relative lg:ml-[5%] lg:w-[68%]">
            {/* handwritten note */}
            <p
              aria-hidden
              className="hand rise absolute -left-[22%] top-[10%] hidden rotate-[-12deg] text-[1.55rem] leading-[1.05] text-charcoal/80 lg:block"
              style={{ ["--d" as string]: "700ms" }}
            >
              {site.handHero.map((w) => (
                <span key={w} className="block">
                  {w}
                </span>
              ))}
            </p>

            <div
              className="photo-in relative aspect-[4/5] overflow-hidden rounded-[18px] border border-white/60 shadow-[0_40px_70px_-35px_rgb(43_38_34/0.55)]"
              style={{ ["--d" as string]: "150ms" }}
            >
              <Image
                src="/images/yasmin.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover object-[50%_42%]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgb(43_38_34/0.10)] to-transparent" />
            </div>
          </div>

          {/* floating code card */}
          <div
            className="rise relative z-10 -mt-16 ml-auto w-[92%] sm:w-[78%] lg:absolute lg:right-0 lg:top-[3%] lg:mt-0 lg:w-[56%] xl:w-[54%]"
            style={{ ["--d" as string]: "520ms" }}
          >
            <div className="float-soft">
              <CodeCard />
            </div>
          </div>

          {/* arrow + availability */}
          <div className="mt-6 flex items-center justify-end gap-3 lg:absolute lg:bottom-[2%] lg:right-[2%] lg:mt-0 lg:flex-col lg:items-end">
            <svg aria-hidden width="34" height="44" viewBox="0 0 34 44" className="hidden text-charcoal/70 lg:block">
              <path
                className="draw-path"
                d="M10 2 C 28 10, 30 26, 18 40 M18 40 l -1 -8 M18 40 l 7 -4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            {site.availability && (
              <p
                className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/90 px-4 py-2 text-[0.75rem] text-charcoal shadow-[var(--shadow-md)] backdrop-blur"
                style={{ ["--d" as string]: "900ms" }}
              >
                <span className="pulse-dot h-2 w-2 rounded-full bg-ok" />
                {site.availability}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
