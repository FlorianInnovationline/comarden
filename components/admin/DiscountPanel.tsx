"use client";

import { useEffect, useState } from "react";
import { Percent, Check, Loader2, AlertCircle, PowerOff } from "lucide-react";

const PRESETS = [5, 10, 15, 20, 25, 30, 40, 50];

interface DiscountState {
  percent: number;
  active: boolean;
  updatedAt: string | null;
}

/** Formats cents as a fr-BE euro amount. */
function euro(cents: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/**
 * Site-wide percentage discount control. Reads and writes the single reserved
 * promotions row through /api/admin/discounts.
 */
export default function DiscountPanel() {
  const [percent, setPercent] = useState(10);
  const [applied, setApplied] = useState<DiscountState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/discounts", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(json.error ?? "Lecture impossible");
        setApplied(json);
        if (json.percent > 0) setPercent(json.percent);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save(nextActive: boolean) {
    setSaving(true);
    setError(null);
    setFlash(null);
    try {
      const res = await fetch("/api/admin/discounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ percent, active: nextActive }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Enregistrement impossible");
      setApplied(json);
      setFlash(
        nextActive
          ? `Remise de ${json.percent}% appliquée à tous les produits en stock.`
          : "Remise désactivée. Les prix affichés reviennent au tarif normal."
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  const isLive = Boolean(applied?.active && applied.percent > 0);
  const sample = 12900; // 129,00 € reference product used for the preview

  return (
    <div className="grid lg:grid-cols-[1fr,20rem] gap-6">
      {/* Control card */}
      <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm p-6 sm:p-8">
        {/* Current status */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className={`inline-flex h-2.5 w-2.5 rounded-full ${
              isLive ? "bg-green-500" : "bg-muted-foreground/30"
            }`}
          />
          <span className="text-sm font-semibold text-primary">
            {loading
              ? "Chargement..."
              : isLive
                ? `Remise active : ${applied?.percent}% sur tout le site`
                : "Aucune remise active"}
          </span>
        </div>

        {/* Percentage */}
        <label
          htmlFor="discount-percent"
          className="block text-sm font-bold text-primary mb-3"
        >
          Pourcentage de remise
        </label>

        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <input
              id="discount-percent"
              type="number"
              min={1}
              max={100}
              value={percent}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                setPercent(Number.isNaN(v) ? 0 : Math.min(100, Math.max(0, v)));
              }}
              className="w-28 rounded-xl border-2 border-border/60 py-3 pl-4 pr-10 text-2xl font-bold text-primary focus:border-accent focus:outline-none"
            />
            <Percent className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          <input
            type="range"
            min={1}
            max={100}
            value={percent}
            onChange={(e) => setPercent(parseInt(e.target.value, 10))}
            aria-label="Pourcentage de remise"
            className="flex-1 accent-accent"
          />
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPercent(p)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                percent === p
                  ? "bg-primary text-white"
                  : "bg-neutral/40 text-primary hover:bg-neutral"
              }`}
            >
              -{p}%
            </button>
          ))}
        </div>

        {/* Feedback */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        {flash && !error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-green-50 p-4 ring-1 ring-green-200">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <p className="text-sm text-green-800">{flash}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving || loading || percent < 1}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Appliquer la remise
          </button>

          {isLive && (
            <button
              type="button"
              onClick={() => save(false)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-7 py-3.5 text-sm font-bold text-primary transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
            >
              <PowerOff className="h-4 w-4" />
              Désactiver
            </button>
          )}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          La remise s&apos;applique automatiquement à <strong>tous les produits
          ayant un prix</strong>. Les produits affichés « Sur devis » ne sont pas
          modifiés. Le changement est visible immédiatement sur comarden-events.be,
          sans redéploiement.
        </p>
      </div>

      {/* Live preview */}
      <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-5">
          Aperçu client
        </h2>

        <div className="rounded-xl bg-neutral/30 p-5 text-center">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Produit à {euro(sample)}
          </div>

          {percent >= 1 ? (
            <>
              <div className="mt-3 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white">
                -{percent}%
              </div>
              <div className="mt-3 text-sm text-muted-foreground line-through">
                {euro(sample)}
              </div>
              <div className="text-3xl font-extrabold text-primary">
                {euro(Math.round(sample * (1 - percent / 100)))}
              </div>
              <div className="mt-2 text-xs font-semibold text-green-700">
                Économie de {euro(sample - Math.round(sample * (1 - percent / 100)))}
              </div>
            </>
          ) : (
            <div className="mt-3 text-3xl font-extrabold text-primary">
              {euro(sample)}
            </div>
          )}
        </div>

        {applied?.updatedAt && (
          <p className="mt-5 text-xs text-muted-foreground">
            Dernière modification :{" "}
            {new Date(applied.updatedAt).toLocaleString("fr-BE")}
          </p>
        )}
      </div>
    </div>
  );
}
