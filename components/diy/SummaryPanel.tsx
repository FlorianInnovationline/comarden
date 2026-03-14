"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { PROJECT_TYPES, NEED_OPTIONS, type DiyRequest } from "@/lib/diyOptions";

interface SummaryPanelProps {
  data: Partial<DiyRequest>;
  onSubmit: () => void;
  errors: string[];
}

export default function SummaryPanel({ data, onSubmit, errors }: SummaryPanelProps) {
  const selectedProjectTypes = PROJECT_TYPES.filter((type) =>
    data.projectTypes?.includes(type.id)
  );
  const selectedNeeds = NEED_OPTIONS.filter((need) =>
    data.needs?.includes(need.id)
  );

  // Calculate complexity score (simple logic)
  const calculateComplexity = (): string => {
    let score = 0;
    if (data.projectTypes && data.projectTypes.length > 0) score += data.projectTypes.length;
    if (data.needs && data.needs.length > 0) score += data.needs.length;
    if (data.details?.areaM2 && data.details.areaM2 > 100) score += 1;
    if (data.pro?.requested) score += 2;

    if (score <= 2) return "Simple";
    if (score <= 4) return "Modéré";
    return "Complexe";
  };

  const complexity = calculateComplexity();
  const complexityColor =
    complexity === "Simple"
      ? "bg-green-100 text-green-700"
      : complexity === "Modéré"
      ? "bg-accent/15 text-accent-dark"
      : "bg-orange-100 text-orange-700";

  const hasMinimalData =
    data.projectTypes &&
    data.projectTypes.length > 0 &&
    data.needs &&
    data.needs.length > 0 &&
    data.details?.location &&
    data.details.location.trim() !== "";

  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-xl border-2 border-slate-200/80 shadow-lg p-5 lg:p-6">
        <h3 className="text-xl font-bold text-primary mb-5">Résumé de votre projet</h3>

        {/* Project types */}
        {selectedProjectTypes.length > 0 ? (
          <div className="mb-5 pb-5 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Types de projet</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProjectTypes.map((type) => (
                <span
                  key={type.id}
                  className="px-3 py-1.5 bg-accent/10 text-primary rounded-lg text-xs font-semibold border border-accent/20"
                >
                  {type.label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 pb-6 border-b border-slate-200 text-sm text-slate-400">Aucun type sélectionné</div>
        )}

        {/* Needs */}
        {selectedNeeds.length > 0 ? (
          <div className="mb-5 pb-5 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Besoins</h4>
            <div className="space-y-2">
              {selectedNeeds.map((need) => (
                <div key={need.id} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>{need.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 pb-6 border-b border-slate-200 text-sm text-slate-400">Aucun besoin sélectionné</div>
        )}

        {/* Details */}
        {(data.details?.areaM2 ||
          data.details?.urgency ||
          data.details?.location) && (
          <div className="mb-5 pb-5 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Détails</h4>
            <div className="space-y-2 text-sm text-slate-600">
              {data.details?.areaM2 && (
                <div className="flex justify-between">
                  <span className="font-medium">Surface:</span>
                  <span className="text-primary font-semibold">{data.details.areaM2} m²</span>
                </div>
              )}
              {data.details?.urgency && (
                <div className="flex justify-between">
                  <span className="font-medium">Urgence:</span>
                  <span className="text-primary font-semibold">{data.details.urgency}</span>
                </div>
              )}
              {data.details?.location && (
                <div className="flex justify-between">
                  <span className="font-medium">Lieu:</span>
                  <span className="text-primary font-semibold">{data.details.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pro request */}
        {data.pro?.requested && (
          <div className="mb-5 pb-5 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Professionnel demandé
            </h4>
            <div className="space-y-2 text-sm text-slate-600">
              {data.pro?.interventionType && (
                <div>Type: {data.pro.interventionType}</div>
              )}
              {data.pro?.desiredDate && (
                <div>Date: {new Date(data.pro.desiredDate).toLocaleDateString("fr-FR")}</div>
              )}
              {data.pro?.budgetRange && (
                <div>
                  Budget:{" "}
                  {data.pro.budgetRange === "€"
                    ? "Budget serré"
                    : data.pro.budgetRange === "€€"
                    ? "Budget moyen"
                    : data.pro.budgetRange === "€€€"
                    ? "Budget confortable"
                    : "Je ne sais pas"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Complexity badge */}
        <div className="mb-5">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${complexityColor}`}>
            <span>Complexité: {complexity}</span>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-red-800 mb-1">
                  Informations manquantes
                </h5>
                <ul className="text-xs text-red-700 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!hasMinimalData}
          className={`w-full py-3 px-5 rounded-lg font-bold text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
            hasMinimalData
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          Demander un devis DIY
        </button>
      </div>
    </div>
  );
}
