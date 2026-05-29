// ============================================================================
// Compatibility shim — exposes a tiny "is the DB configured?" probe so old
// call sites (notably app/api/products/*) can decide between hitting Supabase
// and replying with a fallback response.
// ----------------------------------------------------------------------------
// Going forward, new code should import `isSupabaseConfigured` from
// `@/lib/supabase/env` directly. This file is kept as a thin re-export so we
// don't have to chase down every consumer in one PR.
// SERVER-ONLY.
// ============================================================================

if (typeof window !== "undefined") {
  throw new Error(
    "lib/shop/db.ts cannot be imported in client components. Use API routes instead."
  );
}

export { isSupabaseConfigured as isDatabaseConfigured } from "@/lib/supabase/env";
