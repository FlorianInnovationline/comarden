// ============================================================================
// Browser Supabase client (use in Client Components / "use client" code).
// ----------------------------------------------------------------------------
// Uses the public anon key + browser-managed cookies via @supabase/ssr.
// Singleton — `createBrowserClient` returns the same client across calls.
// ============================================================================

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabasePublicEnv } from "./env";
import type { Database } from "./types";

let cached: SupabaseClient<Database> | null = null;

export function createSupabaseBrowserClient(): SupabaseClient<Database> {
  if (cached) return cached;
  const { url, anonKey } = requireSupabasePublicEnv();
  cached = createBrowserClient<Database>(url, anonKey);
  return cached;
}
