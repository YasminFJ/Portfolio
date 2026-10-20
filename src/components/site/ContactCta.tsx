import Link from "next/link";
import { ArrowRight, Mail, MapPin, Monitor, PanelsTopLeft } from "lucide-react";
import BrandIcon from "@/components/ui/BrandIcon";
import type { SiteContent } from "@/lib/content/types";

export default function ContactCta({ site }: { site: SiteContent }) {
  return (
    <section id="contact" className="section-band">
      <div className="shell py-12 md:py-14">
        <div
          data-reveal="scale"
          className="relative overflow-hidden rounded-[22px] bg-[#1f1b18] text-[#f3ece2] shadow-[var(--shadow-lg)]"
        >
          {/* warm dusk + mountain silhouette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 90% at 85% 10%, rgb(201 160 120 / 0.35), transparent 60%), linear-gradient(110deg, #1d1916 0%, #2a2420 55%, #4a3d33 100%)",
            }}
          />
          <svg aria-hidden viewBox="0 0 800 260" preserveAspectRatio="none" className="absolute bottom-0 right-0 h-[75%] w-[70%] opacity-90">
            <path d="M0 260 L120 170 L190 200 L300 110 L380 150 L470 60 L560 120 L640 80 L800 150 L800 260 Z" fill="#3b322b" />
            <path d="M120 260 L260 180 L340 210 L450 130 L540 180 L640 140 L800 200 L800 260 Z" fill="#2c2520" />
          </svg>

          <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.25fr_0.95fr] lg:items-center lg:gap-8 lg:p-12">
            <div>
              <p className="eyebrow !text-[#e9dfd2]">Let&apos;s work together</p>
              <h2 className="heading mt-5 text-[2.5rem] text-[#fbf6ee] sm:text-[3rem]">{site.contactHeading}</h2>
            </div>

            <div className="lg:border-l lg:border-white/15 lg:pl-8">
              <p className="max-w-[26rem] text-[0.9rem] leading-[1.7] text-[#e7ddd0]">{site.contactText}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.contactTopics.map((t) => (
                  <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-[0.7rem] text-[#e7ddd0]">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className="btn bg-[#f6efe5] text-ink hover:-translate-y-px hover:bg-white">
                  Contact me <ArrowRight size={15} className="arrow" />
                </a>
                <Link href="/projects" className="btn border border-white/35 text-[#f3ece2] hover:border-white/70 hover:bg-white/5">
                  <PanelsTopLeft size={15} /> View projects
                </Link>
              </div>
            </div>

            <div className="relative">
              <ul className="space-y-3.5 text-[0.82rem] text-[#e7ddd0]">
                <li className="flex items-center gap-3">
                  <MapPin size={16} strokeWidth={1.5} /> {site.location}
                </li>
                <li className="flex items-center gap-3">
                  <Monitor size={16} strokeWidth={1.5} /> Available for remote work
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 underline-offset-4 transition-colors hover:text-white hover:underline">
                    <Mail size={16} strokeWidth={1.5} /> {site.email}
                  </a>
                </li>
                {site.linkedin && (
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 underline-offset-4 transition-colors hover:text-white hover:underline">
                      <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#e7ddd0] text-[0.55rem] font-bold text-[#1f1b18]">in</span>
                      LinkedIn
                    </a>
                  </li>
                )}
                {site.github && (
                  <li>
                    <a href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 underline-offset-4 transition-colors hover:text-white hover:underline">
                      <BrandIcon slug="github" name="GitHub" size={16} mono /> GitHub
                    </a>
                  </li>
                )}
              </ul>
              <p aria-hidden className="hand mt-6 rotate-[-10deg] text-[1.45rem] leading-tight text-[#efe5d8]/85 lg:absolute lg:-right-2 lg:-top-24 lg:mt-0 lg:max-w-[9rem]">
                {site.handContact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
