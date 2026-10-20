import type { NextConfig } from "next";

// Mientras NEXT_PUBLIC_SITE_INDEXABLE no sea "true", todas las respuestas
// llevan la cabecera X-Robots-Tag: noindex (además de la meta etiqueta de
// layout.tsx). Esto NO protege el acceso: la web sigue siendo pública.
const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

const nextConfig: NextConfig = {
  async headers() {
    if (indexable) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
