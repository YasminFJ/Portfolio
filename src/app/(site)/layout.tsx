import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RevealObserver from "@/components/ui/RevealObserver";
import { getSite } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: { default: "Yasmin Fennou Jabal — Full Stack Developer", template: "%s — Yasmin Fennou Jabal" },
};

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();
  return (
    <div className="grain flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header name={site.name} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer name={site.name} role={site.role} />
      <RevealObserver />
    </div>
  );
}
