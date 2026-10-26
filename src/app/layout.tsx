import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Newsreader, Inter and Caveat are licensed under the SIL Open Font License 1.1.
const serif = localFont({
  src: [
    { path: "./fonts/newsreader-latin-opsz-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-latin-opsz-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});
const sans = localFont({
  src: [{ path: "./fonts/inter-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-inter",
  display: "swap",
});
const hand = localFont({
  src: [{ path: "./fonts/caveat-latin-400-normal.woff2", style: "normal", weight: "400" }],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

// While the site is being renewed it must not be indexed. To open it to
// search engines set NEXT_PUBLIC_SITE_INDEXABLE=true in Vercel (Production).
const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

const SITE_URL = "https://yasminfennou.com";
const TITLE = "Yasmin Fennou Jabal — Full Stack Developer";
const DESCRIPTION =
  "Full Stack Developer working with React, Next.js, TypeScript, Node.js, PostgreSQL and Supabase. Web applications, integrations, payments, infrastructure and debugging.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Yasmin Fennou Jabal",
  authors: [{ name: "Yasmin Fennou Jabal", url: SITE_URL }],
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Yasmin Fennou Jabal",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JS runs; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
