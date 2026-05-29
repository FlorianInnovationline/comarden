// Sign the user out and bounce back to /admin/login.

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

async function signOutAndRedirect(requestUrl: string): Promise<NextResponse> {
  if (isSupabaseConfigured()) {
    const sb = await createSupabaseServerClient();
    await sb.auth.signOut();
  }
  return NextResponse.redirect(new URL("/admin/login", requestUrl));
}

export async function POST(request: Request) {
  return signOutAndRedirect(request.url);
}

// GET supported so plain <a href="/admin/logout"> works (no need for a form).
export async function GET(request: Request) {
  return signOutAndRedirect(request.url);
}
