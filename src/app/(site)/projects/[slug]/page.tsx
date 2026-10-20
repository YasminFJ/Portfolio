import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleCheck, Rocket } from "lucide-react";
import ProjectCover from "@/components/site/ProjectCover";
import StatusBadge from "@/components/site/StatusBadge";
import { getProject, getProjects } from "@/lib/content/repository";

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.filter((p) => p.tier !== "secondary").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — case study`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: "article",
      title: `${p.title} — case study · Yasmin Fennou Jabal`,
      description: p.summary,
      url: `/projects/${p.slug}`,
      ...(p.cover ? { images: [{ url: p.cover.path, alt: p.cover.alt }] } : {}),
    },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="border-t border-line py-9 first:border-t-0 first:pt-0">
      <h2 className="eyebrow">{label}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[0.95rem] leading-[1.65] text-charcoal/90">
          <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const all = (await getProjects()).filter((p) => p.tier !== "secondary");
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = all[index];
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: `https://yasminfennou.com/projects/${p.slug}`,
    keywords: p.stack.join(", "),
    creator: { "@type": "Person", name: "Yasmin Fennou Jabal", url: "https://yasminfennou.com" },
  };

  return (
    <article className="pt-[4.5rem]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="shell pb-10 pt-10 md:pt-14">
        <Link href="/projects" className="rise inline-flex items-center gap-2 text-[0.8rem] text-muted transition-colors hover:text-ink">
          <ArrowLeft size={15} /> All projects
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow rise" style={{ ["--d" as string]: "60ms" }}>
              {p.sector}
            </p>
            <h1 className="display rise mt-5 text-[3rem] text-ink sm:text-[4.2rem]" style={{ ["--d" as string]: "120ms" }}>
              {p.title}
            </h1>
            <p className="rise mt-5 max-w-[36rem] text-[1.02rem] leading-[1.7] text-charcoal/90" style={{ ["--d" as string]: "180ms" }}>
              {p.summary}
            </p>
          </div>
          <dl className="rise grid gap-4 rounded-[14px] border border-line bg-paper/70 p-6 text-[0.85rem]" style={{ ["--d" as string]: "240ms" }}>
            <div>
              <dt className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-muted">Status</dt>
              <dd className="mt-1.5 flex flex-col items-start gap-1.5">
                <StatusBadge status={p.status} />
                {p.statusNote && <span className="text-[0.8rem] leading-[1.55] text-charcoal/85">{p.statusNote}</span>}
              </dd>
            </div>
            <div>
              <dt className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-muted">My role</dt>
              <dd className="mt-1 text-ink">{p.role}</dd>
            </div>
            {(p.url || p.internalLink) && (
              <div className="flex flex-wrap gap-2.5 pt-1">
                {p.internalLink && (
                  <Link href={p.internalLink} className="btn btn-dark !py-2.5 text-[0.8rem]">
                    <Rocket size={15} /> Launch {p.title}
                  </Link>
                )}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2.5 text-[0.8rem]">
                    Visit live site <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            )}
          </dl>
        </div>
      </header>

      {/* Cover — only when an authorised image exists */}
      {p.cover && (
      <div className="shell">
        <div className="photo-in relative aspect-[16/9] overflow-hidden rounded-[18px] border border-line bg-sand shadow-[var(--shadow-lg)] sm:aspect-[16/8]" style={{ ["--d" as string]: "200ms" }}>
          <ProjectCover project={p} sizes="(min-width: 1280px) 1200px, 100vw" priority />
        </div>
      </div>
      )}

      {/* Body */}
      <div className={`shell grid gap-12 pb-16 lg:grid-cols-[17rem_1fr] lg:gap-16 ${p.cover ? "pt-16" : "section-band pt-14"}`}>
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Technologies">
          <h2 className="eyebrow">Technologies</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="chip !py-1.5 !text-[0.78rem]">
                {t}
              </li>
            ))}
          </ul>
          {p.integrations && p.integrations.length > 0 && (
            <>
              <h2 className="eyebrow mt-8">Integrations</h2>
              <ul className="mt-3 space-y-1.5 text-[0.85rem] text-charcoal">
                {p.integrations.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <div className="max-w-[44rem]">
          {p.context && (
            <Block label="Context">
              <p className="text-[1.02rem] leading-[1.75] text-charcoal/90">{p.context}</p>
            </Block>
          )}
          {p.problem && (
            <Block label="The technical problem">
              <p className="font-serif text-[1.45rem] leading-[1.45] text-ink">{p.problem}</p>
            </Block>
          )}
          {p.solution && (
            <Block label="The solution">
              <p className="text-[1.02rem] leading-[1.75] text-charcoal/90">{p.solution}</p>
            </Block>
          )}
          {p.architecture && p.architecture.length > 0 && (
            <Block label="Architecture & logic">
              <List items={p.architecture} />
            </Block>
          )}
          {p.highlights && p.highlights.length > 0 && (
            <Block label="What I built">
              <List items={p.highlights} />
            </Block>
          )}
          {p.verification && p.verification.length > 0 && (
            <Block label="How it was verified">
              <ul className="space-y-2.5">
                {p.verification.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem] leading-[1.65] text-charcoal/90">
                    <CircleCheck size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ok" />
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>
      </div>

      {/* Gallery */}
      {p.gallery && p.gallery.length > 0 && (
        <section aria-label="Gallery" className="shell pb-16">
          <ul className="grid gap-4 sm:grid-cols-2">
            {p.gallery.map((m) => (
              <li key={m.path} data-reveal>
                <figure className="overflow-hidden rounded-[14px] border border-line bg-sand">
                  <div className="relative aspect-[16/10]">
                    <Image src={m.path} alt={m.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  {m.caption && <figcaption className="px-4 py-3 text-[0.8rem] text-muted">{m.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / next */}
      <nav aria-label="More projects" className="section-band">
        <div className="shell grid gap-4 py-10 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group card flex items-center gap-4 p-5 transition-shadow hover:shadow-[var(--shadow-md)]">
            <ArrowLeft size={18} className="text-muted transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted">Previous</span>
              <span className="font-serif text-[1.2rem] text-ink">{prev.title}</span>
            </span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group card flex items-center justify-end gap-4 p-5 text-right transition-shadow hover:shadow-[var(--shadow-md)]">
            <span>
              <span className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted">Next</span>
              <span className="font-serif text-[1.2rem] text-ink">{next.title}</span>
            </span>
            <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>
    </article>
  );
}
