import { MapPin, Clock, Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/data";

const facts = [
  { icon: MapPin, label: profile.location },
  { icon: Clock, label: profile.availability },
  { icon: Briefcase, label: "Autónoma" },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-shell py-24">
      <Reveal>
        <p className="font-mono text-sm text-accent">01. Sobre mí</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Quién soy</h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {profile.summaryExtra}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt text-accent">
                  <Icon size={16} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
