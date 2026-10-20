import type { Metadata } from "next";
import "./globals.css";

// Mientras la web se renueva, no queremos que los buscadores la indexen.
// Para abrirla a Google basta con definir NEXT_PUBLIC_SITE_INDEXABLE=true
// en las variables de entorno de Producción de Vercel y volver a desplegar.
const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export const metadata: Metadata = {
  metadataBase: new URL("https://yasminfennou.com"),
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  title: "Yasmin Fennou Jabal — Desarrolladora Full Stack",
  description:
    "Portfolio de Yasmin Fennou Jabal, desarrolladora Full Stack especializada en React, Angular y WordPress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
