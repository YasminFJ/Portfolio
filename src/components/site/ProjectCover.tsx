import Image from "next/image";
import type { Project } from "@/lib/content/types";

/**
 * Project image. When there is no authorised screenshot (unreleased client
 * work), renders a neutral editorial cover instead of a fake mockup.
 */
export default function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (project.cover) {
    return (
      <Image
        src={project.cover.path}
        alt={project.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover object-top ${className}`}
      />
    );
  }
  const hue = [...project.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
  const palettes = [
    ["#efe6da", "#e2d3bf"],
    ["#ece4dc", "#d9cbbb"],
    ["#f1e8dd", "#e6d6c2"],
    ["#e9e1d6", "#d6c6b2"],
  ][hue];
  return (
    <div
      role="img"
      aria-label={`${project.title} — ${project.sector}`}
      className={`absolute inset-0 flex flex-col ${className}`}
      style={{ background: `linear-gradient(150deg, ${palettes[0]} 0%, ${palettes[1]} 100%)` }}
    >
      {/* browser chrome */}
      <div className="mx-[7%] mt-[7%] flex flex-1 flex-col overflow-hidden rounded-t-[8px] border border-b-0 border-white/70 bg-paper/80 shadow-[0_18px_30px_-20px_rgb(43_38_34/0.45)]">
        <div className="flex items-center gap-1 border-b border-line px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        </div>
        <div className="grid flex-1 grid-cols-[1.3fr_1fr] items-center gap-[6%] px-[8%]">
          <div className="min-w-0">
            <span className="block truncate font-serif text-[clamp(0.95rem,1.9vw,1.5rem)] leading-tight text-ink">{project.title}</span>
            <span className="mt-1 block truncate text-[0.58rem] uppercase tracking-[0.18em] text-muted">{project.sector.split("·").pop()?.trim()}</span>
            <span className="mt-3 flex gap-1.5">
              <span className="h-1 w-10 rounded-full bg-charcoal/15" />
              <span className="h-1 w-6 rounded-full bg-charcoal/10" />
            </span>
            <span className="mt-3 inline-block h-3 w-12 rounded-[3px] bg-charcoal/80" />
          </div>
          <div className="aspect-[4/5] rounded-[6px] border border-white/60" style={{ background: `linear-gradient(160deg, ${palettes[1]}, #cdb9a1)` }} />
        </div>
      </div>
    </div>
  );
}
