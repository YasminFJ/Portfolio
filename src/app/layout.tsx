import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
