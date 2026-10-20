import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Capabilities from "@/components/site/Capabilities";
import Experience from "@/components/site/Experience";
import SelectedWork from "@/components/site/SelectedWork";
import TechStack from "@/components/site/TechStack";
import ContactCta from "@/components/site/ContactCta";
import { getHomeContent } from "@/lib/content/repository";

export const revalidate = 300;

export default async function Home() {
  const { site, capabilities, experience, tech, projects } = await getHomeContent();
  return (
    <>
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
