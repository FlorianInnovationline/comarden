"use client";

import { Edit, Trash2 } from "lucide-react";
import type { Promotion } from "@/types/shop";

interface PromotionsTableProps {
  promotions: Promotion[];
}

export default function PromotionsTable({ promotions }: PromotionsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral/30">
            <tr>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Titre
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Code
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Réduction
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Période
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Statut
              </th>
              <th className="text-right py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {promotions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-muted-foreground">
                  Aucune promotion pour le moment
                </td>
              </tr>
            ) : (
              promotions.map((promo) => (
                <tr
                  key={promo.id}
                  className="border-b border-border/50 hover:bg-neutral/20 transition-colors"
                >
                  <td className="py-4 px-4 sm:px-6 font-medium text-primary">
                    {promo.title}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    {promo.code ? (
                      <span className="font-mono text-sm bg-neutral/50 px-2 py-1 rounded">
                        {promo.code}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-sm">
                    {promo.discount_type === "percent"
                      ? `${promo.discount_value}%`
                      : `€${(promo.discount_value / 100).toFixed(2)}`}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-sm text-muted-foreground">
                    {promo.starts_at && promo.ends_at
                      ? `${new Date(promo.starts_at).toLocaleDateString("fr-BE")} - ${new Date(promo.ends_at).toLocaleDateString("fr-BE")}`
                      : "Sans limite"}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        promo.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {promo.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Modifier la promotion"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                        aria-label="Supprimer la promotion"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
