import { CONTACT } from "@/content/home";

export default function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yasmin Fennou Jabal",
    jobTitle: "Full Stack Developer",
    url: "https://yasminfennou.com",
    email: `mailto:${CONTACT.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
    alumniOf: [{ "@type": "EducationalOrganization", name: "Universidad Europea" }],
    worksFor: [
      { "@type": "Organization", name: "Esphera.ai" },
      { "@type": "Organization", name: "XtraMakers" },
    ],
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "WordPress", "WooCommerce", "Docker"],
    knowsLanguage: ["es", "ar", "en", "fr"],
    sameAs: [CONTACT.linkedin, CONTACT.github],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
