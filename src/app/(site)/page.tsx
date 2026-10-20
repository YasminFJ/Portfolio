import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import { getHomeContent } from "@/lib/content/repository";

export const revalidate = 300;

export default async function Home() {
  const { site } = await getHomeContent();
  return (
    <>
      <Hero site={site} />
      <About site={site} />
    </>
  );
}
