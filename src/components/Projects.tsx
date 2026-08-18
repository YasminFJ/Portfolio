import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects, featuredProject } from "@/lib/data";

export default function Projects() {
  return (
    <section id="proyectos" className="section-shell py-24">
      <Reveal>
        <p className="font-mono text-sm text-accent">04. Proyectos</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Webs en las que he trabajado</h2>
      </Reveal>

      <Reveal delay={0.05}>
        <Link
          href={featuredProject.url}
          className="group relative mt-10 flex flex-col items-start gap-4 overflow-hidden rounded-xl border border-white/10 bg-[#05060f] p-8 text-white transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(96,165,250,0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(168,85,247,0.18), transparent 45%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyan-300">
              <Rocket size={14} />
              PROYECTO DESTACADO
            </div>
            <h3 className="mt-3 text-2xl font-semibold">{featuredProject.name}</h3>
            <p className="text-sm text-white/50">{featuredProject.tagline}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              {featuredProject.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-[#05060f] transition-transform group-hover:scale-105">
            {featuredProject.cta}
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={(index % 3) * 0.08}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow group flex h-full flex-col justify-between rounded-xl p-6 transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-surface-alt px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
