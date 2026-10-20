import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content/types";
import ProjectCover from "./ProjectCover";
import StatusBadge from "./StatusBadge";

function FeaturedCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[16px] bg-[#0b0d14] p-7 text-white shadow-[var(--shadow-lg)] sm:p-8 xl:h-full"
    >
      {p.cover && (
        <Image
          src={p.cover.path}
          alt=""
          fill
          sizes="(min-width: 1024px) 36vw, 100vw"
          className="object-cover opacity-80 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <div className="relative">
        <p className="eyebrow !text-white/80">Featured project</p>
        <h3 className="display mt-6 text-[3.2rem] text-white sm:text-[3.6rem]">{p.title}</h3>
        <p className="mt-4 max-w-[22rem] text-[0.92rem] leading-[1.6] text-white/85">{p.summary}</p>
      </div>
      <div className="relative mt-8 flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {p.cardTags.map((t) => (
            <li key={t} className="rounded-full border border-white/30 px-3 py-1 text-[0.7rem] text-white/85 backdrop-blur-sm">
              {t}
            </li>
          ))}
        </ul>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 transition-[background-color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}

function ProjectCard({ p, compact }: { p: Project; compact?: boolean }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group card flex h-full flex-col overflow-hidden !rounded-[12px] bg-paper transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-sand">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]">
          <ProjectCover project={p} sizes="(min-width: 1280px) 16vw, (min-width: 640px) 45vw, 92vw" />
        </div>
        <span className="absolute left-2.5 top-2.5">
          <StatusBadge status={p.status} />
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-4 sm:p-5"}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-[1.05rem] leading-snug text-ink">{p.title}</h3>
          <ArrowUpRight
            size={15}
            className="mt-1 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink group-hover:opacity-100"
          />
        </div>
        <p className="mt-1.5 line-clamp-3 text-[0.76rem] leading-[1.55] text-muted">{p.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {p.cardTags.slice(0, 2).map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default function SelectedWork({ projects, intro }: { projects: Project[]; intro: string }) {
  const featured = projects.find((p) => p.tier === "featured");
  const main = projects.filter((p) => p.tier === "main");
  const top = main.slice(0, 3);
  const bottom = main.slice(3, 7);

  return (
    <section id="work" className="section-band">
      <div className="shell py-12 md:py-14">
        <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,24rem)_auto] md:items-end">
          <div data-reveal>
            <p className="eyebrow">Featured projects</p>
            <h2 className="heading mt-4 text-[2.4rem] text-ink sm:text-[2.7rem]">Selected work</h2>
          </div>
          <p data-reveal className="text-[0.85rem] leading-[1.7] text-muted md:pb-2" style={{ ["--reveal-delay" as string]: "60ms" }}>
            {intro}
          </p>
          <div data-reveal className="md:pb-1" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <Link href="/projects" className="btn btn-ghost !rounded-full !py-2.5 text-[0.8rem]">
              View all projects <ArrowRight size={15} className="arrow" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-[0.95fr_2.05fr]">
          {featured && (
            <div data-reveal="scale" className="xl:row-span-2">
              <FeaturedCard p={featured} />
            </div>
          )}
          <div className="grid gap-4">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {top.map((p, i) => (
                <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                  <ProjectCard p={p} />
                </li>
              ))}
            </ul>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {bottom.map((p, i) => (
                <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: `${120 + i * 80}ms` }}>
                  <ProjectCard p={p} compact />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
