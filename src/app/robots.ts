import type { MetadataRoute } from "next";

// Se permite el rastreo a propósito: para que Google respete el "noindex"
// (meta etiqueta en layout.tsx y cabecera X-Robots-Tag en next.config.ts)
// necesita poder leer las páginas. Bloquear el rastreo aquí impediría verlo.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
