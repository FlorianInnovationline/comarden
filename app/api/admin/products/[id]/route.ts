import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * Hard-delete a product from the database. Admin only. Uses the service-role
 * client so the row is removed regardless of RLS.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Middleware already enforces admin on /api/admin/*, but defence-in-depth.
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Identifiant produit manquant" }, { status: 400 });
  }

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("[products] delete: Supabase admin client error:", e);
    return NextResponse.json(
      {
        error:
          "Base de données non configurée : vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  }

  const { data, error } = await sb
    .from("products")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    console.error("[products] delete error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: data?.length ?? 0, id }, { status: 200 });
}
