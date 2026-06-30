// ============================================================================
// CORS helper - kept ready for later prompts.
// ----------------------------------------------------------------------------
// Supabase already serves CORS for its REST/Auth/Storage endpoints when you
// query with the anon key, so the events mini-site can talk directly to
// Supabase without proxying through this app.
//
// THIS HELPER ONLY MATTERS if/when we expose custom Next.js Route Handlers
// (e.g. `/api/jobs/apply`) that the mini-site or other allowed origins need
// to call cross-origin. No route uses it yet.
//
// Usage (from a Route Handler):
//
//   import { withCors, handlePreflight } from "@/lib/cors";
//
//   export async function OPTIONS(req: NextRequest) {
//     return handlePreflight(req);
//   }
//
//   export async function POST(req: NextRequest) {
//     // ... your logic ...
//     return withCors(req, NextResponse.json({ ok: true }));
//   }
// ============================================================================

import { NextResponse, type NextRequest } from "next/server";

export const ALLOWED_ORIGINS: readonly string[] = [
  "https://comarden-events.vercel.app",
  "https://comarden-events.be",
  "http://localhost:3000",
] as const;

const ALLOWED_HEADERS = "Content-Type, Authorization, apikey, x-client-info";
const ALLOWED_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";

function resolveOrigin(request: NextRequest): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

/** Adds CORS headers to a response if the request comes from an allowed origin. */
export function withCors(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const origin = resolveOrigin(request);
  if (!origin) return response;

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Vary", "Origin");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
  response.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS);
  return response;
}

/** Handles a preflight (OPTIONS) request: 204 + CORS headers for allowed origins. */
export function handlePreflight(request: NextRequest): NextResponse {
  const origin = resolveOrigin(request);
  if (!origin) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": ALLOWED_HEADERS,
      "Access-Control-Allow-Methods": ALLOWED_METHODS,
    },
  });
}
