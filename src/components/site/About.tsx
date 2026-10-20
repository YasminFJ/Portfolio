import { Briefcase, Heart, MapPin, Monitor } from "lucide-react";
import type { SiteContent } from "@/lib/content/types";

const FACT_ICONS = [MapPin, Monitor, Briefcase, Heart];

/** Illustrated still life (laptop + books + plant) drawn in CSS/SVG — no stock photo. */
function AboutVisual() {
  const books = ["Development", "Design", "Problem Solving", "Better Web"];
  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-line shadow-[var(--shadow-md)]"
      style={{ background: "linear-gradient(160deg, #ece2d5 0%, #e3d6c5 55%, #d7c7b3 100%)" }}
    >
      {/* window light */}
      <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
      {/* plant */}
      <svg viewBox="0 0 160 200" className="absolute -left-4 top-0 h-[78%] w-auto opacity-90">
        <g fill="#5f6b4a">
          <path d="M60 200 C 58 150, 40 120, 8 96 C 40 104, 62 126, 70 160 Z" />
          <path d="M70 200 C 70 140, 64 92, 34 46 C 66 74, 84 118, 82 170 Z" opacity="0.9" />
          <path d="M80 200 C 86 150, 104 112, 140 88 C 118 118, 100 150, 94 196 Z" opacity="0.85" />
          <path d="M74 200 C 82 140, 96 84, 120 30 C 112 84, 98 140, 88 198 Z" opacity="0.75" />
        </g>
      </svg>
      {/* table */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-[#c9b49b] to-[#b9a184]" />
      {/* books */}
      <div className="absolute bottom-[19%] left-[8%] w-[40%] space-y-[2px]">
        {books.map((b, i) => (
          <div
            key={b}
            className="flex h-[1.35rem] items-center rounded-[2px] px-2 text-[0.58rem] font-medium tracking-wide text-[#3b332c] shadow-[0_1px_0_rgb(0_0_0/0.08)] sm:h-[1.5rem] sm:text-[0.66rem]"
            style={{
              background: ["#efe6d8", "#e6dac8", "#f3ece1", "#ddd0bd"][i],
              width: `${100 - i * 4}%`,
              marginLeft: `${i * 2}%`,
            }}
          >
            {b}
          </div>
        ))}
      </div>
      {/* laptop */}
      <div className="absolute bottom-[19%] right-[7%] w-[48%]">
        <div className="relative aspect-[16/10] rounded-t-[8px] border-[5px] border-[#1d1b19] bg-[#141312] shadow-[0_20px_30px_-18px_rgb(0_0_0/0.6)]">
          <div className="absolute inset-0 flex items-center justify-center px-3 text-center">
            <p className="font-serif text-[0.8rem] italic leading-[1.15] text-[#efe7da] sm:text-[1.05rem]">
              Good websites
              <br />
              solve real
              <br />
              problems.
            </p>
          </div>
        </div>
        <div className="mx-[-6%] h-[6px] rounded-b-[6px] bg-gradient-to-b from-[#3a3632] to-[#1d1b19]" />
      </div>
    </div>
  );
}

export default function About({ site }: { site: SiteContent }) {
  return (
    <section id="about" className="section-band bg-paper/40">
      <div className="shell grid gap-10 py-14 md:py-16 lg:grid-cols-[0.95fr_1.25fr_0.62fr] lg:items-center lg:gap-10">
        <div data-reveal="left">
          <AboutVisual />
        </div>

        <div data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
          <p className="eyebrow">About me</p>
          <h2 className="heading mt-4 text-[2.1rem] text-ink sm:text-[2.5rem] xl:text-[2.7rem]">{site.aboutHeading}</h2>
          <div className="mt-5 space-y-4 text-[0.92rem] leading-[1.75] text-charcoal/90">
            {site.aboutParagraphs.map((p, i) => (
              <p key={i}>
                {i === 0 && p.includes(site.role) ? (
                  <>
                    <strong className="font-semibold text-ink">{p.slice(0, p.indexOf(site.role) + site.role.length)}</strong>
                    {p.slice(p.indexOf(site.role) + site.role.length)}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        </div>

        <aside
          data-reveal
          style={{ ["--reveal-delay" as string]: "160ms" }}
          className="relative border-line lg:border-l lg:pl-8"
          aria-label="Quick facts"
        >
          <ul className="space-y-4 text-[0.82rem] text-charcoal">
            {site.aboutFacts.map((fact, i) => {
              const Icon = FACT_ICONS[i % FACT_ICONS.length];
              return (
                <li key={fact} className="flex items-center gap-3">
                  <Icon size={17} strokeWidth={1.5} className="shrink-0 text-accent" />
                  {fact}
                </li>
              );
            })}
          </ul>
          <p aria-hidden className="hand mt-8 rotate-[-8deg] text-[1.35rem] text-charcoal/75">
            {site.handAbout}
          </p>
          <svg aria-hidden viewBox="0 0 120 12" className="ml-6 mt-1 w-28 text-charcoal/50">
            <path d="M2 8 C 40 2, 80 2, 118 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </aside>
      </div>
    </section>
  );
}
