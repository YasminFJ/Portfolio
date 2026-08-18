import Reveal from "@/components/Reveal";
import { timeline } from "@/lib/data";

const typeLabel: Record<string, string> = {
  formacion: "Formación",
  trabajo: "Experiencia",
};

export default function Experience() {
  return (
    <section id="experiencia" className="section-shell py-24">
      <Reveal>
        <p className="font-mono text-sm text-accent">03. Trayectoria</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Mi camino hasta aquí</h2>
      </Reveal>

      <ol className="relative mt-12 border-l border-border pl-8">
        {timeline.map((item, index) => (
          <Reveal key={`${item.title}-${item.period}`} delay={index * 0.08}>
            <li className="relative pb-12 last:pb-0">
              <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    item.type === "formacion"
                      ? "bg-accent-2/10 text-accent-2"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {typeLabel[item.type]}
                </span>
              </div>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {item.title} · <span className="text-accent">{item.place}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
