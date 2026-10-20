import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para componentes de cliente ("use client").
 * Usa SOLO valores públicos: la URL del proyecto y la clave publishable
 * (sb_publishable_...) o, por compatibilidad, la antigua clave anon.
 * La clave service_role / secret NUNCA debe usarse aquí ni con prefijo NEXT_PUBLIC_.
 */
export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

export function createClient() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Revisa .env.local (ver .env.example)."
    );
  }

  return createBrowserClient(config.url, config.key);
}
