import BrandIcon from "@/components/ui/BrandIcon";
import type { TechGroup } from "@/lib/content/types";

export default function TechStack({ groups, intro }: { groups: TechGroup[]; intro: string }) {
  return (
    <section id="stack" className="section-band">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,22rem)] md:items-end">
          <div data-reveal>
            <p className="eyebrow">Tech stack</p>
            <h2 className="heading mt-4 text-[2.3rem] text-ink sm:text-[2.6rem]">Technologies I work with</h2>
          </div>
          <p data-reveal className="text-[0.85rem] leading-[1.7] text-muted md:pb-2" style={{ ["--reveal-delay" as string]: "80ms" }}>
            {intro}
          </p>
        </div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {groups.map((g, gi) => (
            <div
              key={g.group}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${gi * 60}ms` }}
              className="grid gap-3 py-5 md:grid-cols-[11rem_1fr] md:items-center md:gap-6"
            >
              <h3 className={`text-[0.7rem] font-medium uppercase tracking-[0.18em] ${gi === 0 ? "text-ink" : "text-muted"}`}>{g.group}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((t) => (
                  <li key={t.name} className={`chip ${gi === 0 ? "!border-line-strong" : ""}`}>
                    <BrandIcon slug={t.icon} name={t.name} size={17} />
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
