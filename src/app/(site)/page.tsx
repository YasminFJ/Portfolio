import type { Metadata } from "next";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Capabilities from "@/components/site/Capabilities";
import Experience from "@/components/site/Experience";
import SelectedWork from "@/components/site/SelectedWork";
import TechStack from "@/components/site/TechStack";
import ContactCta from "@/components/site/ContactCta";
import { getHomeContent } from "@/lib/content/repository";

export const revalidate = 300;

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const { site, capabilities, experience, tech, projects } = await getHomeContent();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: "https://yasminfennou.com",
    email: `mailto:${site.email}`,
    image: "https://yasminfennou.com/images/yasmin.jpg",
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    alumniOf: experience.filter((e) => e.kind === "education").map((e) => ({ "@type": "EducationalOrganization", name: e.organization })),
    worksFor: experience.filter((e) => e.kind === "work").map((e) => ({ "@type": "Organization", name: e.organization })),
    knowsAbout: tech.flatMap((g) => g.items.map((i) => i.name)).slice(0, 20),
    sameAs: [site.github, site.linkedin].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero site={site} />
      <About site={site} />
      <Capabilities items={capabilities} intro={site.capabilitiesIntro} />
      <Experience items={experience} intro={site.experienceIntro} />
      <SelectedWork projects={projects} intro={site.workIntro} />
      <TechStack groups={tech} intro={site.stackIntro} />
      <ContactCta site={site} />
    </>
  );
}
