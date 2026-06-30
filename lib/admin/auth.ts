// ============================================================================
// Admin authentication helpers - Supabase Auth + `profiles.role = 'admin'`.
// ----------------------------------------------------------------------------
// All checks go through Supabase. There's no dev-credentials backdoor anymore.
//
// SERVER-ONLY. Imports lib/supabase/server.ts which depends on next/headers.
// ============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
}

/**
 * True iff the current request has a Supabase session AND the user's
 * `profiles.role` is `'admin'`. Safe to call from Server Components and
 * Route Handlers.
 *
 * When Supabase is not configured (local dev with no env vars), this always
 * returns `false` so the rest of the app behaves as "no admin access".
 */
export async function isAdmin(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const sb = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return false;

  const { data, error } = await sb
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return false;
  return data.role === "admin";
}

/** Returns the signed-in admin's profile, or `null` if not authed / not admin. */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  if (!isSupabaseConfigured()) return null;

  const sb = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;

  const { data, error } = await sb
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data || data.role !== "admin") return null;
  return { id: data.id, email: data.email, full_name: data.full_name };
}
