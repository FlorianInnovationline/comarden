"use client";

import { Users, ChevronDown } from "lucide-react";
import { INTERVENTION_TYPES, BUDGET_RANGES } from "@/lib/diyOptions";

interface ProToggleCardProps {
  requested: boolean;
  interventionType?: "Pose complète" | "Aide partielle" | "Visite & conseils sur place";
  desiredDate?: string;
  budgetRange?: "€" | "€€" | "€€€" | "Je ne sais pas";
  onToggle: (requested: boolean) => void;
  onInterventionTypeChange: (type: "Pose complète" | "Aide partielle" | "Visite & conseils sur place") => void;
  onDesiredDateChange: (date: string) => void;
  onBudgetRangeChange: (range: "€" | "€€" | "€€€" | "Je ne sais pas") => void;
}

export default function ProToggleCard({
  requested,
  interventionType,
  desiredDate,
  budgetRange,
  onToggle,
  onInterventionTypeChange,
  onDesiredDateChange,
  onBudgetRangeChange,
}: ProToggleCardProps) {
  return (
    <div className="space-y-6">
      {/* Main toggle card */}
      <div
        className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
          requested
            ? "border-accent bg-accent/5 shadow-lg"
            : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      >
        <button
          type="button"
          onClick={() => onToggle(!requested)}
          className="w-full flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-lg"
          aria-pressed={requested}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                requested ? "bg-accent" : "bg-slate-100"
              }`}
            >
              <Users
                className={`w-6 h-6 ${requested ? "text-white" : "text-slate-400"}`}
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg text-slate-800 mb-1">
                Je veux un professionnel Comarden
              </h3>
              <p className="text-sm text-slate-500">
                Possibilité de nous demander des professionnels pour réaliser les travaux.
              </p>
            </div>
          </div>

          {/* Toggle switch */}
          <div
            className={`relative w-14 h-8 rounded-full transition-colors ${
              requested ? "bg-accent" : "bg-slate-300"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                requested ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Expanded options */}
      {requested && (
        <div className="space-y-4 animate-fadeInUp">
          {/* Intervention type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Type d'intervention
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {INTERVENTION_TYPES.map((type) => {
                const isSelected = interventionType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onInterventionTypeChange(type)}
                    aria-pressed={isSelected}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                      isSelected
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="font-medium text-sm text-slate-700">{type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desired date */}
          <div>
            <label htmlFor="desired-date" className="block text-sm font-semibold text-slate-700 mb-2">
              Date souhaitée
            </label>
            <input
              type="date"
              id="desired-date"
              value={desiredDate || ""}
              onChange={(e) => onDesiredDateChange(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all"
              aria-label="Date souhaitée pour l'intervention"
            />
          </div>

          {/* Budget range */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Budget approximatif
            </label>
            <div className="flex flex-wrap gap-3">
              {BUDGET_RANGES.map((range) => {
                const isSelected = budgetRange === range;
                const displayRange =
                  range === "€"
                    ? "Budget serré"
                    : range === "€€"
                    ? "Budget moyen"
                    : range === "€€€"
                    ? "Budget confortable"
                    : "Je ne sais pas";

                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => onBudgetRangeChange(range)}
                    aria-pressed={isSelected}
                    className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                      isSelected
                        ? "bg-accent text-white shadow-md scale-105"
                        : "bg-white border-2 border-slate-200 text-slate-700 hover:border-accent/50 hover:shadow-sm"
                    }`}
                  >
                    {displayRange}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
