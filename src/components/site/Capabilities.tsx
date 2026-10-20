import Link from "next/link";
import { ArrowUpRight, Bug, Cloud, CodeXml, Link2, Sparkles } from "lucide-react";
import BrandIcon from "@/components/ui/BrandIcon";
import type { Capability } from "@/lib/content/types";

function CapIcon({ icon }: { icon: Capability["icon"] }) {
  const cls = "h-[22px] w-[22px]";
  switch (icon) {
    case "code":
      return <CodeXml className={`${cls} text-charcoal`} strokeWidth={1.5} />;
    case "link":
      return <Link2 className={`${cls} text-charcoal`} strokeWidth={1.5} />;
    case "wordpress":
      return (
        <span className="text-[#21759b]">
          <BrandIcon slug="wordpress" name="WordPress" size={24} mono />
        </span>
      );
    case "cloud":
      return <Cloud className={`${cls} fill-[#c9dcf0] text-[#5a87b8]`} strokeWidth={1.4} />;
    case "bug":
      return <Bug className={`${cls} text-charcoal`} strokeWidth={1.5} />;
    case "sparkle":
      return <Sparkles className={`${cls} text-accent`} strokeWidth={1.5} />;
  }
}

export default function Capabilities({ items, intro }: { items: Capability[]; intro: string }) {
  return (
    <section id="capabilities" className="section-band">
      <div className="shell py-12 md:py-14">
        <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,22rem)] md:items-end">
          <div data-reveal>
            <p className="eyebrow">What I do</p>
            <h2 className="heading mt-4 text-[2.4rem] text-ink sm:text-[2.7rem]">Capabilities</h2>
          </div>
          <p data-reveal className="text-[0.85rem] leading-[1.7] text-muted md:pb-2" style={{ ["--reveal-delay" as string]: "80ms" }}>
            {intro}
          </p>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((c, i) => {
            const body = (
              <>
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-2 transition-colors duration-300 group-hover:bg-sand">
                  <CapIcon icon={c.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[1.13rem] leading-snug text-ink">{c.title}</span>
                  <span className="mt-1.5 block text-[0.8rem] leading-[1.6] text-muted">{c.description}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </>
            );
            const cls =
              "group card flex h-full items-start gap-4 p-5 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-line-strong hover:bg-paper hover:shadow-[var(--shadow-md)] sm:p-6";
            return (
              <li key={c.title} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 70 + Math.floor(i / 3) * 90}ms` }}>
                {c.href ? (
                  <Link href={c.href} className={cls} aria-label={`${c.title} — see related project`}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
