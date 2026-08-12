"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Users,
  MousePointerClick,
  Timer,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ExternalLink,
} from "lucide-react";

const RANGES = [
  { days: 7, label: "7 jours" },
  { days: 30, label: "30 jours" },
  { days: 90, label: "90 jours" },
  { days: 365, label: "12 mois" },
];

interface Totals {
  views: number;
  visitors: number;
  sessions: number;
  clicks: number;
}
interface Dashboard {
  days: number;
  totals: Totals;
  previousTotals: Totals | null;
  timeseries: { day: string; views: number; visitors: number }[];
  top_paths: { path: string; views: number; visitors: number }[];
  top_clicks: { label: string; clicks: number }[];
  top_referrers: { host: string; views: number }[];
  devices: { device: string; views: number }[];
}

const nf = new Intl.NumberFormat("fr-BE");

/** Turns a tracked click label into something readable. */
function clickLabel(raw: string): string {
  if (raw === "commander") return "Bouton « Commander »";
  if (raw === "commande-envoyee") return "Commande envoyée";
  const [kind, ...rest] = raw.split(":");
  const value = rest.join(":");
  if (kind === "produit") return `Produit : ${value}`;
  if (kind === "marque") return `Marque : ${value}`;
  if (kind === "categorie") return `Catégorie : ${value}`;
  return raw;
}

function Delta({ current, previous }: { current: number; previous: number | null }) {
  if (previous === null || previous === 0) {
    return <span className="text-xs text-muted-foreground">pas de comparaison</span>;
  }
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
        <Minus className="h-3 w-3" /> stable
      </span>
    );
  }
  const up = pct > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold ${
        up ? "text-green-600" : "text-red-600"
      }`}
    >
      {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {up ? "+" : ""}
      {pct}%
    </span>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  previous,
  hint,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  previous?: number | null;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/5">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </span>
        {previous !== undefined && <Delta current={value} previous={previous ?? null} />}
      </div>
      <p className="text-3xl font-extrabold tabular-nums text-primary">{nf.format(value)}</p>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">{label}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground/80">{hint}</p>}
    </div>
  );
}

/** Simple bar list used for pages, clicks, referrers and devices. */
function BarList({
  title,
  rows,
  empty,
  format,
}: {
  title: string;
  rows: { key: string; value: number }[];
  empty: string;
  format?: (k: string) => string;
}) {
  const max = rows.reduce((m, r) => Math.max(m, r.value), 0) || 1;
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((r) => (
            <li key={r.key} className="relative">
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-lg bg-accent/20"
                style={{ width: `${Math.max(4, (r.value / max) * 100)}%` }}
              />
              <div className="relative flex items-center justify-between gap-3 px-3 py-2">
                <span className="truncate text-sm font-medium text-primary" title={r.key}>
                  {format ? format(r.key) : r.key}
                </span>
                <span className="shrink-0 text-sm font-bold tabular-nums text-primary">
                  {nf.format(r.value)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Views over time, drawn as an inline SVG area chart. */
function Chart({ data }: { data: { day: string; views: number }[] }) {
  if (data.length < 2) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl bg-white text-sm text-muted-foreground shadow-sm ring-1 ring-black/5">
        Pas encore assez de données pour tracer une courbe.
      </div>
    );
  }
  const w = 800;
  const h = 180;
  const pad = 6;
  const max = Math.max(...data.map((d) => d.views), 1);
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => [
    pad + i * step,
    h - pad - (d.views / max) * (h - pad * 2),
  ]);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${pad},${h - pad} ${line} ${(w - pad).toFixed(1)},${h - pad}`;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Vues par jour
        </h2>
        <span className="text-xs text-muted-foreground">max {nf.format(max)}/jour</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full" preserveAspectRatio="none">
        <polygon points={area} fill="rgba(255,213,0,0.25)" />
        <polyline
          points={line}
          fill="none"
          stroke="#002D59"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{data[0]?.day}</span>
        <span>{data[data.length - 1]?.day}</span>
      </div>
    </div>
  );
}

/** Analytics dashboard for comarden-events.be. */
export default function StatsPanel() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/admin/stats?days=${days}`, { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(json.error ?? "Lecture impossible");
        setData(json);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [days]);

  const prev = data?.previousTotals ?? null;
  const empty = useMemo(
    () => !loading && !error && (data?.totals.views ?? 0) === 0,
    [loading, error, data]
  );

  return (
    <div className="space-y-5">
      {/* Range selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setDays(r.days)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                days === r.days
                  ? "bg-primary text-white"
                  : "bg-white text-primary ring-1 ring-black/5 hover:bg-neutral/40"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <a
          href="https://vercel.com/sbn-s-projects/comarden-events/analytics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary"
        >
          Vercel Analytics
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 rounded-2xl bg-white p-8 ring-1 ring-black/5">
          <Loader2 className="h-5 w-5 animate-spin text-accent" />
          <span className="text-sm text-muted-foreground">Chargement des statistiques...</span>
        </div>
      )}

      {!loading && !error && data && (
        <>
          {empty && (
            <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
              <p className="text-sm text-amber-900">
                Aucune donnée sur cette période. Le suivi enregistre les visites à partir
                de sa mise en ligne : les chiffres apparaîtront dès les premiers visiteurs.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi
              icon={Eye}
              label="Pages vues"
              value={data.totals.views}
              previous={prev?.views ?? null}
            />
            <Kpi
              icon={Users}
              label="Visiteurs uniques"
              value={data.totals.visitors}
              previous={prev?.visitors ?? null}
              hint="anonymes, réinitialisés chaque jour"
            />
            <Kpi
              icon={Timer}
              label="Sessions"
              value={data.totals.sessions}
              previous={prev?.sessions ?? null}
            />
            <Kpi
              icon={MousePointerClick}
              label="Clics suivis"
              value={data.totals.clicks}
              previous={prev?.clicks ?? null}
            />
          </div>

          <Chart data={data.timeseries} />

          <div className="grid gap-4 lg:grid-cols-2">
            <BarList
              title="Pages les plus visitées"
              rows={data.top_paths.map((p) => ({ key: p.path, value: p.views }))}
              empty="Aucune page vue sur cette période."
            />
            <BarList
              title="Éléments les plus cliqués"
              rows={data.top_clicks.map((c) => ({ key: c.label, value: c.clicks }))}
              empty="Aucun clic enregistré sur cette période."
              format={clickLabel}
            />
            <BarList
              title="Sources de trafic"
              rows={data.top_referrers.map((r) => ({ key: r.host, value: r.views }))}
              empty="Aucun référent : le trafic est direct."
            />
            <BarList
              title="Appareils"
              rows={data.devices.map((d) => ({ key: d.device, value: d.views }))}
              empty="Aucune donnée d'appareil."
            />
          </div>
        </>
      )}
    </div>
  );
}
