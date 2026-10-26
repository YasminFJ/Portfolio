import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import Laptop from "./Laptop";
import ExperienceGrid from "./ExperienceGrid";
import TechSection from "./TechSection";
import { CONTACT, FEATURED, T, type Locale } from "@/content/home";

const TAG_EN: Record<string, string> = { Multilingüe: "Multilingual" };

export function SectionHead({ id, title, link }: { id?: string; title: string; link?: { href: string; label: string; external?: boolean } }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <h2 id={id} className="shrink-0 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ink">
        {title}
      </h2>
      <span aria-hidden className="hidden h-px flex-1 bg-line-strong sm:block" />
      {link &&
        (link.external ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-2 text-[0.85rem] text-ink">
            {link.label}
            <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </a>
        ) : (
          <Link href={link.href} className="group inline-flex shrink-0 items-center gap-2 text-[0.85rem] text-ink">
            {link.label}
            <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
    </div>
  );
}

export function CvButton({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = T[locale];
  const file = CONTACT.cv[locale];
  const base = `inline-flex items-center justify-center gap-2 rounded-md border border-line-strong bg-white px-5 py-3 text-[0.88rem] font-medium text-ink transition-colors hover:border-ink ${className}`;
  if (file) {
    return (
      <a href={file} download className={base}>
        {t.downloadCv} <Download size={15} aria-hidden />
      </a>
    );
  }
  const subject = locale === "es" ? "Solicitud de CV" : "CV request";
  return (
    <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`} className={base}>
      {locale === "es" ? "Solicitar CV" : "Request CV"} <Mail size={15} aria-hidden />
    </a>
  );
}

export default function Home({ locale }: { locale: Locale }) {
  const t = T[locale];
  const projectsIndex = "/projects"; // case studies are written in English

  return (
    <div lang={locale}>
      {/* HERO */}
      <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[47%] bg-sand lg:block" />
        <div className="relative mx-auto grid max-w-[78rem] gap-12 px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:pb-20 lg:pt-16 xl:px-10">
          <div className="max-w-[38rem]">
            <p className="rise text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted">{t.eyebrow}</p>
            <h1
              id="hero-title"
              className="rise mt-6 font-serif text-[2.6rem] font-medium leading-[1.02] tracking-[-0.025em] text-ink sm:text-[3.6rem] lg:text-[4rem]"
              style={{ ["--d" as string]: "80ms" }}
            >
              {t.title}
            </h1>
            <p className="rise mt-6 text-[1rem] leading-[1.7] text-charcoal/85 sm:text-[1.05rem]" style={{ ["--d" as string]: "160ms" }}>
              {t.intro}
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "220ms" }}>
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3 text-[0.88rem] font-medium text-white transition-colors hover:bg-charcoal"
              >
                {t.viewProjects} <ArrowRight size={15} aria-hidden />
              </a>
              <CvButton locale={locale} />
            </div>
            <dl className="rise mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line-strong" style={{ ["--d" as string]: "280ms" }}>
              {t.stats.map((s) => (
                <div key={s.label} className="sm:px-6 sm:first:pl-0">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[1.25rem] font-semibold text-ink">{s.value}</dd>
                  <dd className="mt-1 text-[0.85rem] text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="photo-in relative -mx-5 flex items-center justify-center bg-sand px-8 py-12 sm:-mx-8 lg:mx-0 lg:bg-transparent lg:px-4 lg:py-6">
            <Laptop
              src="/images/projects/grupo-cunado.webp"
              alt={t.heroImageAlt}
              sizes="(min-width: 1024px) 44vw, 90vw"
              priority
              className="w-full max-w-[34rem]"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="proyectos" aria-labelledby="featured-title" className="mx-auto max-w-[78rem] px-5 py-14 sm:px-8 lg:py-16 xl:px-10">
        <SectionHead id="featured-title" title={t.featured} link={{ href: projectsIndex, label: t.allProjects }} />
        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <article className="group relative flex h-full flex-col">
                <Link href={p.href} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-md bg-sand px-[9%] pb-[10%] pt-[11%]">
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <Laptop src={p.image} alt="" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" />
                  </div>
                </Link>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <p className="text-[0.76rem] text-muted">
                    {p.type[locale]}
                    {p.inDevelopment && <span className="ml-2 rounded-sm bg-accent-soft px-1.5 py-0.5 text-[0.68rem] text-accent">{t.inDevelopment}</span>}
                  </p>
                  <ArrowUpRight size={17} aria-hidden className="shrink-0 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-1 font-serif text-[1.35rem] font-medium leading-tight text-ink">
                  <Link href={p.href} className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.88rem] leading-[1.6] text-charcoal/80">{p.description[locale]}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={locale === "es" ? "Tecnologías" : "Technologies"}>
                  {p.tags.map((tag) => (
                    <li key={tag} className="rounded-md border border-line bg-white px-2.5 py-1 text-[0.72rem] text-charcoal">
                      {locale === "en" ? TAG_EN[tag] ?? tag : tag}
                    </li>
                  ))}
                </ul>
                <span className="sr-only">{p.imageAlt[locale]}</span>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ORBIT */}
      <section aria-labelledby="orbit-title" className="mx-auto max-w-[78rem] px-5 sm:px-8 xl:px-10">
        <div data-reveal className="grid items-center gap-8 overflow-hidden rounded-lg bg-[#0f1013] p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/55">{t.orbitEyebrow}</p>
            <h2 id="orbit-title" className="mt-3 font-serif text-[2.2rem] font-medium tracking-[-0.02em]">
              ORBIT
            </h2>
            <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-[1.7] text-white/75">{t.orbitText}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {["Next.js", "React Three Fiber", "Three.js", "GLSL", "Supabase"].map((s) => (
                <li key={s} className="rounded-md border border-white/15 px-2.5 py-1 text-[0.72rem] text-white/80">
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href="/orbit"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-[0.88rem] font-medium text-ink transition-colors hover:bg-white/90"
            >
              {t.orbitCta} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="relative aspect-[1400/629] overflow-hidden rounded-md border border-white/10">
            <Image
              src="/images/projects/orbit.webp"
              alt={locale === "es" ? "ORBIT: Saturno en el observatorio 3D" : "ORBIT: Saturn in the 3D observatory"}
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre-mi" aria-labelledby="about-title" className="mx-auto max-w-[78rem] px-5 pt-16 sm:px-8 xl:px-10">
        <SectionHead id="about-title" title={t.about} />
        <div data-reveal className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <p className="max-w-[40rem] font-serif text-[1.35rem] leading-[1.5] text-ink sm:text-[1.5rem]">{t.aboutText}</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            {t.facts.map((f) => (
              <div key={f.k} className="border-t border-line-strong pt-3">
                <dt className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">{f.k}</dt>
                <dd className="mt-1.5 text-[0.9rem] leading-[1.55] text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experiencia" aria-labelledby="exp-title" className="mx-auto max-w-[78rem] px-5 pt-16 sm:px-8 xl:px-10">
        <SectionHead id="exp-title" title={t.experience} link={{ href: CONTACT.linkedin, label: t.fullCareer, external: true }} />
        <ExperienceGrid locale={locale} />
      </section>

      {/* TECHNOLOGIES */}
      <section id="tecnologias" aria-labelledby="tech-title" className="mx-auto max-w-[78rem] px-5 pt-16 sm:px-8 xl:px-10">
        <TechSection locale={locale} />
      </section>

      {/* CTA */}
      <section id="contacto" aria-labelledby="cta-title" className="mx-auto max-w-[78rem] px-5 py-16 sm:px-8 xl:px-10">
        <div data-reveal className="flex flex-col gap-6 rounded-lg bg-ink px-6 py-9 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/55">{t.ctaEyebrow}</p>
            <h2 id="cta-title" className="mt-3 font-serif text-[1.9rem] font-medium leading-tight tracking-[-0.015em] sm:text-[2.2rem]">
              {t.ctaTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:max-w-[32rem]">
            <p className="text-[0.88rem] leading-[1.6] text-white/75">
              {t.ctaText}{" "}
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
                LinkedIn
              </a>
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[0.88rem] font-medium text-ink transition-colors hover:bg-white/90"
            >
              {t.contact} <ArrowRight size={15} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
