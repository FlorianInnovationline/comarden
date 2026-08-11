import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/** A discount percentage is either absent (no discount) or a whole 1..100. */
function normalisePercent(value: unknown): number | null {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const rounded = Math.round(n);
  if (rounded <= 0) return null;
  return Math.min(100, rounded);
}

/** Lists every product with its price and current discount (admin only). */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("[discounts] admin client error:", e);
    return NextResponse.json({ error: "Base de données non configurée." }, { status: 503 });
  }

  const { data, error } = await sb
    .from("products")
    .select("id, title, slug, brand, price_cents, discount_percent, is_active")
    .order("brand", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    console.error("[discounts] read error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data ?? [] });
}

/**
 * Applies discounts to a set of products.
 *
 * Body: { updates: [{ id: string, percent: number | null }] }
 * `percent: null` (or 0) clears the discount for that product.
 */
export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: { updates?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  if (!Array.isArray(body.updates) || body.updates.length === 0) {
    return NextResponse.json({ error: "Aucune modification reçue." }, { status: 400 });
  }

  const updates = body.updates
    .map((u) => u as { id?: unknown; percent?: unknown })
    .filter((u): u is { id: string; percent: unknown } => typeof u.id === "string")
    .map((u) => ({ id: u.id, percent: normalisePercent(u.percent) }));

  if (updates.length === 0) {
    return NextResponse.json({ error: "Aucune modification valide." }, { status: 400 });
  }

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("[discounts] admin client error:", e);
    return NextResponse.json({ error: "Base de données non configurée." }, { status: 503 });
  }

  // Group by percentage so each distinct value is a single UPDATE ... IN (...).
  const byPercent = new Map<number | null, string[]>();
  for (const u of updates) {
    const list = byPercent.get(u.percent) ?? [];
    list.push(u.id);
    byPercent.set(u.percent, list);
  }

  let changed = 0;
  for (const [percent, ids] of byPercent) {
    const { error, count } = await sb
      .from("products")
      .update({ discount_percent: percent }, { count: "exact" })
      .in("id", ids);

    if (error) {
      console.error("[discounts] update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    changed += count ?? ids.length;
  }

  return NextResponse.json({ updated: changed });
}
