import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const SITE = "comarden-events";
const RANGES: Record<string, number> = { "7": 7, "30": 30, "90": 90, "365": 365 };

/**
 * Returns the comarden-events analytics dashboard for a period.
 *
 * All aggregation happens in Postgres (stats_dashboard), so this stays fast
 * regardless of how many events have been collected.
 */
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const days = RANGES[request.nextUrl.searchParams.get("days") ?? "30"] ?? 30;
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("[stats] admin client error:", e);
    return NextResponse.json({ error: "Base de données non configurée." }, { status: 503 });
  }

  // Current period
  const { data, error } = await sb.rpc("stats_dashboard", {
    p_from: from.toISOString(),
    p_to: to.toISOString(),
    p_site: SITE,
  });

  if (error) {
    console.error("[stats] rpc error:", error.message);
    const missing = /does not exist|schema cache/i.test(error.message);
    return NextResponse.json(
      {
        error: missing
          ? "Le suivi n'est pas encore installé : exécutez la migration 016_site_events.sql dans Supabase."
          : error.message,
      },
      { status: missing ? 424 : 500 }
    );
  }

  // Previous period of the same length, for the trend arrows.
  const prevFrom = new Date(from.getTime() - days * 24 * 60 * 60 * 1000);
  const { data: prev } = await sb.rpc("stats_dashboard", {
    p_from: prevFrom.toISOString(),
    p_to: from.toISOString(),
    p_site: SITE,
  });

  return NextResponse.json({
    days,
    from: from.toISOString(),
    to: to.toISOString(),
    ...((data ?? {}) as Record<string, unknown>),
    previousTotals: (prev as unknown as { totals?: unknown } | null)?.totals ?? null,
  });
}
