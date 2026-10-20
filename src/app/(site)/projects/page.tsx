import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCover from "@/components/site/ProjectCover";
import StatusBadge from "@/components/site/StatusBadge";
import ProjectActions from "@/components/site/ProjectActions";
import { getProjects } from "@/lib/content/repository";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Yasmin Fennou Jabal: custom booking and payment systems, integrations, WooCommerce, multilingual WordPress sites and ORBIT, an interactive 3D project.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const main = projects.filter((p) => p.tier !== "secondary");
  const secondary = projects.filter((p) => p.tier === "secondary");

  return (
    <div className="pt-[4.5rem]">
      <section className="shell pb-10 pt-14 md:pt-20">
        <p className="eyebrow rise">Projects</p>
        <h1 className="display rise mt-5 max-w-[48rem] text-[3rem] text-ink sm:text-[4rem]" style={{ ["--d" as string]: "80ms" }}>
          Work that ships, integrates and holds up.
        </h1>
        <p className="rise mt-5 max-w-[38rem] text-[0.98rem] leading-[1.7] text-charcoal/90" style={{ ["--d" as string]: "160ms" }}>
          Case studies focused on the technical side: the problem, the solution, the logic behind it and how it was verified.
          Projects still in progress are labelled as such.
        </p>
      </section>

      <section aria-label="Case studies" className="section-band">
        <ol className="shell divide-y divide-line">
          {main.map((p, i) => (
            <li key={p.slug} data-reveal className="py-10 md:py-12">
              <article className={`group grid items-center gap-8 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <Link
                  href={`/projects/${p.slug}`}
                  tabIndex={-1}
                  aria-hidden
                  className="relative block aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-sand shadow-[var(--shadow-sm)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-md)]"
                >
                  <div className="absolute inset-0 transition-transform duration-[1000ms] ease-out group-hover:scale-[1.035]">
                    <ProjectCover project={p} sizes="(min-width: 768px) 46vw, 92vw" priority={i === 0} />
                  </div>
                </Link>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.72rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <h2 className="heading mt-4 text-[2.1rem] text-ink sm:text-[2.5rem]">
                    <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted">{p.sector}</p>
                  <p className="mt-4 max-w-[30rem] text-[0.92rem] leading-[1.7] text-charcoal/90">{p.summary}</p>
                  {p.statusNote && <p className="mt-2 max-w-[30rem] text-[0.78rem] leading-[1.6] text-muted">{p.statusNote}</p>}
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ProjectActions project={p} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {secondary.length > 0 && (
        <section aria-labelledby="other-work" className="section-band bg-paper/40">
          <div className="shell py-14">
            <h2 id="other-work" className="heading text-[1.8rem] text-ink">
              Other work
            </h2>
            <p className="mt-2 text-[0.85rem] text-muted">Smaller client projects and ongoing maintenance.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {secondary.map((p) => (
                <li key={p.slug} data-reveal>
                  <div className="card flex h-full items-start justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-serif text-[1.1rem] text-ink">{p.title}</h3>
                      <p className="mt-0.5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">{p.sector}</p>
                      <p className="mt-2 text-[0.82rem] leading-[1.6] text-charcoal/90">{p.summary}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <li key={t} className="tag">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.title} (opens in a new tab)`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-charcoal transition-colors hover:bg-ink hover:text-cream"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
