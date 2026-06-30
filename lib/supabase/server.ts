// ============================================================================
// Server-side Supabase client (Server Components, Route Handlers, Server Actions,
// Middleware). Reads the user session from cookies via @supabase/ssr.
// ----------------------------------------------------------------------------
// - Use `createSupabaseServerClient()` from Server Components / Route Handlers.
// - Use `createSupabaseMiddlewareClient(req, res)` from middleware.ts.
//
// SERVER-ONLY: imports `next/headers`, which crashes if pulled into the browser
// bundle.
// ============================================================================

import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabasePublicEnv } from "./env";
import type { Database } from "./types";

if (typeof window !== "undefined") {
  throw new Error(
    "lib/supabase/server.ts cannot be imported from client code. " +
      "Use lib/supabase/client.ts instead."
  );
}

/**
 * Supabase client for Server Components / Route Handlers / Server Actions.
 *
 * Note: in plain Server Components, the cookie store is read-only - Supabase
 * may try to refresh the session and write cookies, which Next swallows.
 * That's expected; the refresh succeeds for the duration of the request, and
 * the cookie will be written next time it crosses a Route Handler / middleware.
 */
export async function createSupabaseServerClient(): Promise<
  SupabaseClient<Database>
> {
  const { url, anonKey } = requireSupabasePublicEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Called from a Server Component context - cookie store is read-only.
          // Safe to ignore: session will be re-synced by middleware on next request.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // see above
        }
      },
    },
  });
}

/**
 * Supabase client for Next.js middleware. Reads request cookies and writes
 * refreshed cookies into the response (required for session refresh to land
 * in the browser).
 */
export function createSupabaseMiddlewareClient(
  request: NextRequest,
  response: NextResponse
): SupabaseClient<Database> {
  const { url, anonKey } = requireSupabasePublicEnv();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });
}
