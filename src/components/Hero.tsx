"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { profile } from "@/lib/data";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 35 : 65;
    const pauseAtEnd = 1600;
    const pauseAtStart = 300;

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), pauseAtEnd);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => i + 1);
        setTimeout(() => {}, pauseAtStart);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 font-mono text-sm text-accent">Hola, soy</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <div className="mt-4 h-9 font-mono text-lg text-muted sm:text-xl">
            <span className="text-gradient">{typed}</span>
            <span className="caret text-accent">_</span>
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#proyectos"
              className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
              Contactar
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent/30 to-accent-2/30 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/yasmin.jpg"
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 60vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </a>
    </section>
  );
}
