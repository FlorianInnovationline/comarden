"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Percent,
  Check,
  Loader2,
  AlertCircle,
  Search,
  Tag,
  X,
} from "lucide-react";

const PRESETS = [5, 10, 15, 20, 25, 30, 40, 50];

interface DiscountProduct {
  id: string;
  title: string;
  slug: string;
  brand: string | null;
  price_cents: number;
  discount_percent: number | null;
  is_active: boolean;
}

function euro(cents: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/**
 * Per-product discount manager. Each product carries its own percentage, so
 * different promotions can run side by side. Edits are staged locally and sent
 * in one batch when "Enregistrer" is pressed.
 */
export default function DiscountPanel() {
  const [products, setProducts] = useState<DiscountProduct[]>([]);
  /** Staged percentages, keyed by product id. "" means no discount. */
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [bulkPercent, setBulkPercent] = useState(10);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/discounts", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(json.error ?? "Lecture impossible");
        const list: DiscountProduct[] = json.products ?? [];
        setProducts(list);
        setDraft(
          Object.fromEntries(
            list.map((p) => [p.id, p.discount_percent ? String(p.discount_percent) : ""])
          )
        );
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

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.brand && set.add(p.brand));
    return [...set].sort((a, b) => a.localeCompare(b, "fr"));
  }, [products]);

  /** Products matching the current search + brand filter. Priced ones only. */
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (p.price_cents <= 0) return false; // "Sur devis" - nothing to discount
      if (brand !== "all" && p.brand !== brand) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q)
      );
    });
  }, [products, query, brand]);

  const dirty = useMemo(
    () =>
      products.filter((p) => {
        const current = p.discount_percent ? String(p.discount_percent) : "";
        return (draft[p.id] ?? "") !== current;
      }),
    [products, draft]
  );

  const activeCount = products.filter(
    (p) => (draft[p.id] ?? "") !== "" && Number(draft[p.id]) > 0
  ).length;

  function setOne(id: string, value: string) {
    const clean = value.replace(/[^\d]/g, "").slice(0, 3);
    const n = Number(clean);
    setDraft({ ...draft, [id]: clean === "" ? "" : String(Math.min(100, n)) });
  }

  /** Applies the bulk percentage to every currently visible product. */
  function applyToVisible(value: number | null) {
    const next = { ...draft };
    visible.forEach((p) => {
      next[p.id] = value === null ? "" : String(value);
    });
    setDraft(next);
    setFlash(null);
  }

  async function save() {
    if (dirty.length === 0) return;
    setSaving(true);
    setError(null);
    setFlash(null);
    try {
      const updates = dirty.map((p) => {
        const raw = draft[p.id] ?? "";
        return { id: p.id, percent: raw === "" ? null : Number(raw) };
      });
      const res = await fetch("/api/admin/discounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Enregistrement impossible");

      setProducts((prev) =>
        prev.map((p) => {
          const raw = draft[p.id];
          if (raw === undefined) return p;
          return { ...p, discount_percent: raw === "" ? null : Number(raw) };
        })
      );
      setFlash(`${json.updated} produit(s) mis à jour.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-white p-8 ring-1 ring-black/5">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
        <span className="text-sm text-muted-foreground">Chargement des produits...</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Bulk toolbar */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Rechercher
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nom du produit ou marque..."
                className="w-full rounded-lg border border-border py-2.5 pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Brand */}
          <div className="lg:w-56">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Marque
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-border py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">Toutes les marques</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk percent */}
          <div className="lg:w-32">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Remise
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={100}
                value={bulkPercent}
                onChange={(e) =>
                  setBulkPercent(Math.min(100, Math.max(1, Number(e.target.value) || 0)))
                }
                className="w-full rounded-lg border border-border py-2.5 pl-3 pr-8 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Percent className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Presets + bulk actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setBulkPercent(p)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                bulkPercent === p
                  ? "bg-primary text-white"
                  : "bg-neutral/40 text-primary hover:bg-neutral"
              }`}
            >
              -{p}%
            </button>
          ))}

          <span className="mx-1 h-5 w-px bg-border" />

          <button
            type="button"
            onClick={() => applyToVisible(bulkPercent)}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-primary transition hover:brightness-95"
          >
            <Tag className="h-3.5 w-3.5" />
            Appliquer -{bulkPercent}% aux {visible.length} produits affichés
          </button>
          <button
            type="button"
            onClick={() => applyToVisible(null)}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-red-300 hover:text-red-700"
          >
            Retirer la remise
          </button>
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      {flash && !error && (
        <div className="flex items-start gap-2.5 rounded-xl bg-green-50 p-4 ring-1 ring-green-200">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <p className="text-sm text-green-800">{flash}</p>
        </div>
      )}

      {/* Product table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <span className="text-sm font-semibold text-primary">
            {visible.length} produit{visible.length > 1 ? "s" : ""} affiché
            {visible.length > 1 ? "s" : ""}
          </span>
          <span className="text-xs text-muted-foreground">
            {activeCount} en promotion
          </span>
        </div>

        {visible.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            Aucun produit avec un prix ne correspond à ce filtre.
          </p>
        ) : (
          <ul className="divide-y divide-border/60">
            {visible.map((p) => {
              const raw = draft[p.id] ?? "";
              const pct = raw === "" ? 0 : Number(raw);
              const final =
                pct > 0 ? Math.round(p.price_cents * (1 - pct / 100)) : p.price_cents;
              return (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center gap-3 px-5 py-3 hover:bg-neutral/20"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-primary">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.brand ?? "Sans marque"}
                      {!p.is_active && " - inactif"}
                    </p>
                  </div>

                  <div className="text-right text-sm">
                    {pct > 0 ? (
                      <>
                        <span className="mr-2 text-muted-foreground line-through">
                          {euro(p.price_cents)}
                        </span>
                        <span className="font-bold text-primary">{euro(final)}</span>
                      </>
                    ) : (
                      <span className="font-bold text-primary">
                        {euro(p.price_cents)}
                      </span>
                    )}
                  </div>

                  <div className="relative w-24 shrink-0">
                    <input
                      value={raw}
                      onChange={(e) => setOne(p.id, e.target.value)}
                      inputMode="numeric"
                      placeholder="0"
                      aria-label={`Remise pour ${p.title}`}
                      className={`w-full rounded-lg border py-2 pl-3 pr-7 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent ${
                        pct > 0
                          ? "border-accent bg-accent/10 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    />
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      %
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-primary px-5 py-4 text-white shadow-lg">
        <span className="text-sm font-semibold">
          {dirty.length === 0
            ? "Aucune modification en attente"
            : `${dirty.length} modification(s) non enregistrée(s)`}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={saving || dirty.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-primary transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Enregistrer
        </button>
      </div>
    </div>
  );
}
