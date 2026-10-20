import Link from "next/link";
import { ArrowRight, ArrowUpRight, Rocket } from "lucide-react";
import type { Project } from "@/lib/content/types";

/**
 * "View Case Study" + one "Visit …" button per public website.
 * External links open in a new tab with rel="noopener noreferrer".
 */
export default function ProjectActions({
  project,
  showCaseStudy = true,
  size = "md",
  tone = "light",
}: {
  project: Project;
  showCaseStudy?: boolean;
  size?: "sm" | "md";
  tone?: "light" | "dark";
}) {
  const links = project.links ?? [];
  const sm = size === "sm";
  const base = sm
    ? "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-medium transition-[background-color,color,border-color,transform] duration-300"
    : "btn !py-2.5 text-[0.8rem]";
  const primary =
    tone === "dark"
      ? `${base} bg-white text-ink hover:bg-cream`
      : sm
        ? `${base} bg-ink text-cream hover:bg-black`
        : `${base} btn-dark`;
  const secondary =
    tone === "dark"
      ? `${base} border border-white/35 text-white/90 hover:border-white/70 hover:bg-white/10`
      : sm
        ? `${base} border border-line-strong text-charcoal hover:border-charcoal hover:bg-paper`
        : `${base} btn-ghost`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showCaseStudy && (
        <Link href={`/projects/${project.slug}`} className={`group/btn ${primary}`}>
          View Case Study
          <ArrowRight size={sm ? 12 : 15} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      )}
      {project.internalLink && (
        <Link href={project.internalLink} className={showCaseStudy ? secondary : primary}>
          <Rocket size={sm ? 12 : 15} /> Launch {project.title}
        </Link>
      )}
      {links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/ext ${secondary}`}
          aria-label={`${l.label} — ${project.title} (opens in a new tab)`}
          title={l.note ?? undefined}
        >
          {l.label}
          {l.status === "staging" && (
            <span className={`rounded-full px-1.5 py-px text-[0.58rem] uppercase tracking-wider ${tone === "dark" ? "bg-white/15" : "bg-sand text-charcoal"}`}>
              Staging
            </span>
          )}
          <ArrowUpRight size={sm ? 12 : 15} className="transition-transform duration-300 group-hover/ext:-translate-y-0.5 group-hover/ext:translate-x-0.5" />
        </a>
      ))}
    </div>
  );
}
