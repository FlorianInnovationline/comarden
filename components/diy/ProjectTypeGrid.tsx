"use client";

import { PROJECT_TYPES, type ProjectType } from "@/lib/diyOptions";

interface ProjectTypeGridProps {
  selectedTypes: string[];
  onToggle: (typeId: string) => void;
}

export default function ProjectTypeGrid({ selectedTypes, onToggle }: ProjectTypeGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-3">
      {PROJECT_TYPES.map((type, index) => {
        const isSelected = selectedTypes.includes(type.id);
        const IconComponent = type.icon;

        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onToggle(type.id)}
            aria-pressed={isSelected}
            className={`group relative p-3 lg:p-4 bg-white rounded-lg border-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-primary/20 animate-fadeIn ${
              isSelected
                ? "border-accent shadow-md scale-105 bg-accent/5 ring-2 ring-accent/20"
                : "border-slate-200 hover:border-accent/50 hover:shadow-sm hover:scale-[1.02]"
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Icon */}
            <div
              className={`mb-2 transition-transform duration-300 ${
                isSelected ? "scale-110" : "group-hover:scale-105"
              }`}
            >
              <IconComponent
                className={`w-6 h-6 lg:w-7 lg:h-7 ${
                  isSelected ? "text-accent" : "text-slate-400 group-hover:text-primary"
                } transition-colors`}
                strokeWidth={2}
              />
            </div>

            {/* Label */}
            <h3
              className={`font-bold text-xs sm:text-sm mb-1 ${
                isSelected ? "text-primary" : "text-slate-700"
              } transition-colors`}
            >
              {type.label}
            </h3>

            {/* Description */}
            <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">{type.description}</p>

            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
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
              </div>
            )}

            {/* Hover glow effect */}
            <div
              className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                isSelected
                  ? "bg-accent/10"
                  : "bg-primary/5"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
