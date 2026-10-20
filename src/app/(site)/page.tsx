import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Capabilities from "@/components/site/Capabilities";
import Experience from "@/components/site/Experience";
import { getHomeContent } from "@/lib/content/repository";

export const revalidate = 300;

export default async function Home() {
  const { site, capabilities, experience } = await getHomeContent();
  return (
    <>
      <Hero site={site} />
      <About site={site} />
      <Capabilities items={capabilities} intro={site.capabilitiesIntro} />
      <Experience items={experience} intro={site.experienceIntro} />
    </>
  );
}
