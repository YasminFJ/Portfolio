import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createServerSupabase } from "@/lib/supabase/server";

/** Only internal destinations are allowed after an auth link — never another domain. */
const ALLOWED_NEXT = new Set(["/orbit"]);

function safeNext(value: string | null) {
  return value && ALLOWED_NEXT.has(value) ? value : "/orbit";
}

/**
 * Landing point for Supabase email links (sign-up confirmation and password
 * recovery). Completes the session and sends the explorer back to ORBIT with a
 * status the HUD can show.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const next = safeNext(url.searchParams.get("next"));
  const flow = url.searchParams.get("flow") === "recovery" ? "recovery" : "confirmed";
  const back = (status: string) => {
    const target = new URL(next, url.origin);
    target.searchParams.set("auth", status);
    return NextResponse.redirect(target);
  };

  // Supabase reports expired or already-used links with error params.
  if (url.searchParams.get("error") || url.searchParams.get("error_code")) {
    return back(flow === "recovery" ? "recovery-error" : "link-error");
  }

  const supabase = await createServerSupabase();
  if (!supabase) return back("unavailable");

  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    // The email is already verified by Supabase before this redirect. If the link
    // was opened in another browser the code cannot be exchanged here, so ask the
    // explorer to sign in instead of showing an error.
    if (error) return back(flow === "recovery" ? "recovery-error" : "confirmed-signin");
    return back(flow);
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (error) return back(type === "recovery" ? "recovery-error" : "link-error");
    return back(type === "recovery" ? "recovery" : "confirmed");
  }

  return back("link-error");
}
