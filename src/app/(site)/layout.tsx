import type { Metadata } from "next";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import RevealObserver from "@/components/ui/RevealObserver";

export const metadata: Metadata = {
  title: { default: "Yasmin Fennou Jabal — Full Stack Developer", template: "%s — Yasmin Fennou Jabal" },
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
