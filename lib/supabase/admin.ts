// ============================================================================
// SUPABASE SERVICE-ROLE CLIENT
// ============================================================================
// !!! SERVER-ONLY - DO NOT IMPORT FROM CLIENT COMPONENTS / "use client" CODE !!!
// ----------------------------------------------------------------------------
// The service-role key bypasses RLS entirely. Treat it like a database root
// password: leaking it in the browser bundle is an account compromise.
//
// Acceptable callers:
//   - Route Handlers (app/api/**)
//   - Server Actions
//   - Server-side scripts and admin tooling
//
// For everything else (Server Components, normal queries), use
// `createSupabaseServerClient()` from ./server.ts. That client respects RLS
// and the signed-in user's session.
// ============================================================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getServiceRoleKey, getSupabaseUrl } from "./env";
import type { Database } from "./types";

if (typeof window !== "undefined") {
  throw new Error(
    "lib/supabase/admin.ts contains the service-role key and MUST NOT be " +
      "imported from client code."
  );
}

let cached: SupabaseClient<Database> | null = null;

export function createSupabaseAdminClient(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = getSupabaseUrl();
  if (!url) {
    throw new Error(
      "Supabase is not configured: missing NEXT_PUBLIC_SUPABASE_URL."
    );
  }
  const serviceRoleKey = getServiceRoleKey(); // throws if missing or called client-side

  cached = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cached;
}
