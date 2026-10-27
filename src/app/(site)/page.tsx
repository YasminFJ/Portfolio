import type { Metadata } from "next";
import Home from "@/components/home/Home";
import PersonJsonLd from "@/components/home/PersonJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Yasmin Fennou Jabal — Full Stack Developer" },
  description:
    "Full Stack Developer en Madrid: React, Next.js, TypeScript y Node.js, integraciones, infraestructura y coordinación técnica. Abierta a oportunidades en remoto en España y Europa.",
  alternates: { canonical: "/", languages: { es: "/", en: "/en", "x-default": "/" } },
  openGraph: { locale: "es_ES", alternateLocale: ["en_US"] },
};

export default function HomeEs() {
  return (
    <>
      <PersonJsonLd />
      <Home locale="es" />
    </>
  );
}
