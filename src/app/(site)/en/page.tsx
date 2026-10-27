import type { Metadata } from "next";
import Home from "@/components/home/Home";
import PersonJsonLd from "@/components/home/PersonJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Yasmin Fennou Jabal — Full Stack Developer" },
  description:
    "Full Stack Developer based in Madrid: React, Next.js, TypeScript and Node.js, integrations, infrastructure and technical coordination. Open to remote roles in Spain and Europe.",
  alternates: { canonical: "/en", languages: { es: "/", en: "/en", "x-default": "/" } },
  openGraph: { locale: "en_US", alternateLocale: ["es_ES"] },
};

export default function HomeEn() {
  return (
    <>
      <PersonJsonLd />
      <Home locale="en" />
    </>
  );
}
