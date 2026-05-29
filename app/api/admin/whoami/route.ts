// Tiny check route used by /admin/login right after sign-in to confirm the
// freshly authenticated user is actually an admin.
//
// Returns `{ isAdmin: boolean, email: string | null }`. Never throws.

import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getCurrentAdmin();
  return NextResponse.json({
    isAdmin: admin !== null,
    email: admin?.email ?? null,
  });
}
