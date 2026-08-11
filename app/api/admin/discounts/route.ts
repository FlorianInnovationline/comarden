import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  GLOBAL_DISCOUNT_CODE,
  GLOBAL_DISCOUNT_TITLE,
  isValidPercent,
} from "@/lib/shop/globalDiscount";

export const dynamic = "force-dynamic";

/** Reads the current site-wide discount row (admin only). */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("[discounts] admin client error:", e);
    return NextResponse.json(
      { error: "Base de données non configurée." },
      { status: 503 }
    );
  }

  const { data, error } = await sb
    .from("promotions")
    .select("discount_value, active, updated_at")
    .eq("code", GLOBAL_DISCOUNT_CODE)
    .maybeSingle();

  if (error) {
    console.error("[discounts] read error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    percent: data?.discount_value ?? 0,
    active: data?.active ?? false,
    updatedAt: data?.updated_at ?? null,
  });
}

/**
 * Applies (or clears) the site-wide percentage discount.
 *
 * Body: { percent: number (1..100), active: boolean }
 * Sending active:false keeps the stored percent but switches the discount off,
 * so it can be re-enabled without retyping it.
 */
export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: { percent?: unknown; active?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const active = body.active !== false;
  const percent = Number(body.percent);

  // A discount that is being switched on must carry a usable percentage.
  if (active && !isValidPercent(percent)) {
    return NextResponse.json(
      { error: "Le pourcentage doit être un entier entre 1 et 100." },
      { status: 400 }
    );
  }
  // When switching off we still persist a sane value for the column's NOT NULL.
  const storedPercent = isValidPercent(percent) ? percent : 0;

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("[discounts] admin client error:", e);
    return NextResponse.json(
      { error: "Base de données non configurée." },
      { status: 503 }
    );
  }

  const { data, error } = await sb
    .from("promotions")
    .upsert(
      {
        code: GLOBAL_DISCOUNT_CODE,
        title: GLOBAL_DISCOUNT_TITLE,
        description:
          "Remise appliquée automatiquement à tous les produits en stock du site.",
        discount_type: "percent",
        discount_value: storedPercent,
        active,
      },
      { onConflict: "code" }
    )
    .select("discount_value, active, updated_at")
    .single();

  if (error) {
    console.error("[discounts] upsert error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    percent: data.discount_value,
    active: data.active,
    updatedAt: data.updated_at,
  });
}
