"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { NEED_OPTIONS, type NeedOption } from "@/lib/diyOptions";

interface NeedsSelectorProps {
  selectedProjectTypes: string[];
  selectedNeeds: string[];
  onToggle: (needId: string) => void;
}

export default function NeedsSelector({
  selectedProjectTypes,
  selectedNeeds,
  onToggle,
}: NeedsSelectorProps) {
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  // Filter needs based on selected project types
  const applicableNeeds = NEED_OPTIONS.filter((need) =>
    need.applicableTo.some((typeId) => selectedProjectTypes.includes(typeId))
  );

  if (applicableNeeds.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>Sélectionnez d&apos;abord un type de projet ci-dessus.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applicableNeeds.map((need, index) => {
        const isSelected = selectedNeeds.includes(need.id);

        return (
          <div key={need.id} className="relative animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
            <button
              type="button"
              onClick={() => onToggle(need.id)}
              aria-pressed={isSelected}
              className={`group w-full p-5 bg-white rounded-xl border-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                isSelected
                  ? "border-accent shadow-lg bg-accent/5 scale-[1.02] ring-2 ring-accent/20"
                  : "border-slate-200 hover:border-accent/50 hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4
                      className={`font-bold text-base sm:text-lg ${
                        isSelected ? "text-primary" : "text-slate-700"
                      } transition-colors`}
                    >
                      {need.label}
                    </h4>
                    {need.infoTooltip && (
                      <div
                        className="relative"
                        onMouseEnter={() => setHoveredTooltip(need.id)}
                        onMouseLeave={() => setHoveredTooltip(null)}
                      >
                        <Info className="w-4 h-4 text-slate-400 hover:text-accent transition-colors" />
                        {hoveredTooltip === need.id && (
                          <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg z-20 pointer-events-none">
                            {need.infoTooltip}
                            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {need.description && (
                    <p className="text-xs text-slate-500">{need.description}</p>
                  )}
                </div>

                {/* Checkbox indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-accent border-accent"
                      : "bg-white border-slate-300 group-hover:border-accent/50"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
