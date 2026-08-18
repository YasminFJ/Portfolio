import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="proyectos" className="section-shell py-24">
      <Reveal>
        <p className="font-mono text-sm text-accent">04. Proyectos</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Webs en las que he trabajado</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
