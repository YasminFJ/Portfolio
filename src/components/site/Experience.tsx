import { BookOpen, Briefcase, ChartLine, GraduationCap, Laptop, Sparkles } from "lucide-react";
import type { ExperienceItem } from "@/lib/content/types";

const ICONS = { cap: GraduationCap, book: BookOpen, laptop: Laptop, chart: ChartLine, spark: Sparkles, briefcase: Briefcase };

function Pin({ dark }: { dark?: boolean }) {
  return (
    <span aria-hidden className="relative ml-[3px] flex w-3.5 flex-col items-center">
      <span
        className={`h-3.5 w-3.5 rounded-full border-2 ${dark ? "border-ink bg-ink" : "border-accent bg-accent-soft"} shadow-[0_0_0_4px_var(--cream)]`}
      />
      <span className={`h-6 w-px ${dark ? "bg-ink/60" : "bg-accent/60"}`} />
    </span>
  );
}

export default function Experience({ items, intro }: { items: ExperienceItem[]; intro: string }) {
  const roles = items.filter((i) => i.kind !== "education" && i.bullets?.length).sort((a, b) => b.sortOrder - a.sortOrder);
  const lastWorkId = [...items].filter((i) => i.kind === "work").sort((a, b) => b.sortOrder - a.sortOrder)[0]?.id;

  return (
    <section id="experience" className="section-band bg-paper/40">
      <div className="shell py-12 md:py-14">
        <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,22rem)] md:items-end">
          <div data-reveal>
            <p className="eyebrow">Experience &amp; journey</p>
            <h2 className="heading mt-4 max-w-[30rem] text-[2.2rem] text-ink sm:text-[2.6rem]">
              A path built on curiosity and problem solving.
            </h2>
          </div>
          <p data-reveal className="text-[0.85rem] leading-[1.7] text-muted md:pb-2" style={{ ["--reveal-delay" as string]: "80ms" }}>
            {intro}
          </p>
        </div>

        {/* Timeline: vertical on mobile, 2/3 columns on tablet, 6 columns on wide screens */}
        <div className="relative mt-12">
          <div aria-hidden className="timeline-line absolute left-0 right-0 top-[7px] hidden h-px bg-line-strong xl:block" />
          <div aria-hidden className="timeline-line-v absolute bottom-2 left-[6px] top-2 w-px bg-line-strong md:hidden" />
          <ol className="grid gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-0">
            {items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Briefcase;
              const dark = item.id === lastWorkId;
              return (
                <li
                  key={item.id}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                  className="relative pl-8 md:pl-0 xl:border-l xl:border-line xl:px-5 xl:first:border-l-0 xl:first:pl-0"
                >
                  <span className="absolute left-0 top-0 md:static md:mb-3 md:block">
                    <Pin dark={dark} />
                  </span>
                  <p className="text-[0.78rem] tracking-wide text-charcoal">{item.period}</p>
                  <div className="mt-3 flex items-start gap-3">
                    <Icon size={22} strokeWidth={1.4} className="mt-0.5 shrink-0 text-charcoal" />
                    <div className="min-w-0">
                      <h3 className="font-serif text-[1.08rem] leading-snug text-ink">
                        {item.kind === "work" ? item.organization : item.title}
                      </h3>
                      <p className="mt-0.5 text-[0.76rem] text-muted">
                        {item.kind === "work" ? item.title : item.organization}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[0.76rem] leading-[1.65] text-muted">{item.summary}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detail of current professional activity — three separate areas */}
        {roles.length > 0 && (
          <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {roles.map((r, i) => (
              <article
                key={r.id}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="card flex flex-col p-6 transition-[box-shadow,border-color] duration-300 hover:border-line-strong hover:shadow-[var(--shadow-md)]"
              >
                <header className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <h3 className="font-serif text-[1.3rem] leading-tight text-ink">{r.kind === "freelance" ? r.title : r.organization}</h3>
                    <p className="mt-1 text-[0.8rem] text-charcoal">{r.kind === "freelance" ? r.organization : r.title}</p>
                  </div>
                  <span className="shrink-0 text-[0.72rem] text-muted">{r.period}</span>
                </header>
                <div className="mt-4 space-y-4">
                  {r.bullets!.map((b, j) => (
                    <div key={j}>
                      {b.heading && <p className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent">{b.heading}</p>}
                      <ul className="space-y-1.5">
                        {b.items.map((t) => (
                          <li key={t} className="flex gap-2.5 text-[0.8rem] leading-[1.6] text-charcoal/90">
                            <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-charcoal/40" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
