import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith("/admin") && 
      !request.nextUrl.pathname.startsWith("/admin/login")) {
    
    // Check for admin session
    const adminSession = request.cookies.get("admin_session");
    const devAdmin = request.cookies.get("dev_admin");

    // Check if user is authenticated (either cookie works)
    if (adminSession?.value === "authenticated" || devAdmin?.value === "true") {
      return NextResponse.next();
    }

    // Not authenticated - redirect to login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
