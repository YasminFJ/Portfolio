import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./client";

/**
 * Server-side Supabase client bound to the request cookies. Used only by the
 * auth callback route to complete email confirmation and password recovery.
 * Uses the public publishable key — never the service_role key.
 */
export async function createServerSupabase() {
  const config = getSupabaseConfig();
  if (!config) return null;
  const store = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value, options }) => store.set(name, value, options));
      },
    },
  });
}
