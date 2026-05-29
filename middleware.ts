// ============================================================================
// Next.js middleware — protects `/admin/*` and `/api/admin/*`.
// ----------------------------------------------------------------------------
// 1. Refreshes the Supabase session cookie on every matched request.
// 2. For `/admin/*` (except /admin/login + /admin/logout): if no session,
//    redirects to /admin/login. If the session exists but the user is not an
//    admin (profiles.role != 'admin'), redirects to /admin/login?error=...
// 3. For `/api/admin/*`: 401 if no session, 403 if not admin.
//
// Falls back to redirect-to-login if Supabase env vars are missing — never
// silently grants access.
// ============================================================================

import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const ADMIN_PATH = "/admin";
const ADMIN_API_PATH = "/api/admin";
const LOGIN_PATH = "/admin/login";
const LOGOUT_PATH = "/admin/logout";

function isAdminPagePath(pathname: string): boolean {
  if (!pathname.startsWith(ADMIN_PATH)) return false;
  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return false;
  }
  if (pathname === LOGOUT_PATH || pathname.startsWith(`${LOGOUT_PATH}/`)) {
    return false;
  }
  return true;
}

function isAdminApiPath(pathname: string): boolean {
  // Allow the tiny "am I admin?" probe used by the login page.
  if (pathname === `${ADMIN_API_PATH}/whoami`) return false;
  return pathname.startsWith(ADMIN_API_PATH);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPage = isAdminPagePath(pathname);
  const protectedApi = isAdminApiPath(pathname);

  // Untouched routes pass through immediately.
  if (!protectedPage && !protectedApi) return NextResponse.next();

  // Missing env vars: deny everything explicitly.
  if (!isSupabaseConfigured()) {
    if (protectedApi) {
      return NextResponse.json(
        { error: "Supabase not configured on this deployment" },
        { status: 503 }
      );
    }
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("error", "Supabase non configuré");
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (protectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Verify admin role.
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = !error && profile?.role === "admin";
  if (!isAdmin) {
    if (protectedApi) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set(
      "error",
      "Votre compte n'a pas les droits administrateur."
    );
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
