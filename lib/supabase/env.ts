// ============================================================================
// Supabase env-var resolver — single source of truth.
// ----------------------------------------------------------------------------
// All Supabase clients (browser / server / admin) read configuration through
// this module. It centralises:
//   - whether Supabase is configured (used to enable the seed fallback in dev)
//   - friendly error messages when something is missing
//
// Safe to import from client OR server code — only reads `NEXT_PUBLIC_*` vars
// unless you call `getServiceRoleKey()`, which is server-only.
// ============================================================================

const PUBLIC_URL_KEY = "NEXT_PUBLIC_SUPABASE_URL";
const PUBLIC_ANON_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
const SERVICE_ROLE_KEY = "SUPABASE_SERVICE_ROLE_KEY";

export function getSupabaseUrl(): string | null {
  // Static literal access is REQUIRED: Next.js only inlines
  // `process.env.NEXT_PUBLIC_*` into the client bundle when referenced
  // literally. Dynamic access (process.env[KEY]) is left undefined in the browser.
  const v = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return v && v.length > 0 ? v : null;
}

export function getSupabaseAnonKey(): string | null {
  const v = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return v && v.length > 0 ? v : null;
}

/** True iff both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set. */
export function isSupabaseConfigured(): boolean {
  return getSupabaseUrl() !== null && getSupabaseAnonKey() !== null;
}

/** Throws unless both public env vars are set. Use in code paths that REQUIRE Supabase. */
export function requireSupabasePublicEnv(): { url: string; anonKey: string } {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    throw new Error(
      `Supabase is not configured. Set ${PUBLIC_URL_KEY} and ${PUBLIC_ANON_KEY} in .env.local.`
    );
  }
  return { url, anonKey };
}

/** Server-only. Returns the service-role key, or throws. */
export function getServiceRoleKey(): string {
  if (typeof window !== "undefined") {
    throw new Error(
      "getServiceRoleKey() must never be called from client code. " +
        "Move the call to a server component, route handler, or server action."
    );
  }
  const v = process.env[SERVICE_ROLE_KEY];
  if (!v) {
    throw new Error(
      `Missing ${SERVICE_ROLE_KEY}. Add it to .env.local (server-only).`
    );
  }
  return v;
}
