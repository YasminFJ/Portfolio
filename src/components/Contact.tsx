import { Mail, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile, social } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contacto" className="section-shell py-24">
      <Reveal>
        <div className="card-glow rounded-2xl p-10 text-center sm:p-16">
          <p className="font-mono text-sm text-accent">05. Contacto</p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">
            ¿Tienes un proyecto en mente? Hablemos.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted sm:text-base">
            Disponible para proyectos freelance y colaboraciones a largo plazo.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={social.email}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
            >
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href={social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <MessageCircle size={16} />
              {profile.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
