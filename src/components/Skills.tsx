import Reveal from "@/components/Reveal";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="habilidades" className="section-shell py-24">
      <Reveal>
        <p className="font-mono text-sm text-accent">02. Habilidades</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Con qué trabajo</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06}>
            <div className="card-glow h-full rounded-xl p-6">
              <h3 className="font-mono text-sm text-accent-2">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-surface-alt px-3 py-1 text-xs text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
