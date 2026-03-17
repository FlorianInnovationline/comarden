"use client";

import Image from "next/image";
import { Clock, Plus, X } from "lucide-react";
import Card from "@/components/ui/Card";
import type { FormationModule } from "@/lib/formations";

interface FormationCardProps {
  module: FormationModule;
  isSelected: boolean;
  canAdd: boolean;
  onAdd: () => void;
  onRemove?: () => void;
}

export default function FormationCard({
  module,
  isSelected,
  canAdd,
  onAdd,
  onRemove,
}: FormationCardProps) {
  const durationColor =
    module.durationHours === 7
      ? "bg-primary/10 text-primary border-primary/20"
      : module.durationHours === 4
      ? "bg-accent/10 text-accent border-accent/20"
      : "bg-primary/5 text-foreground/70 border-border";

  return (
    <Card variant="minimal" className="p-3 hover:shadow-md transition-all duration-300 group border border-border hover:border-accent/30 relative overflow-hidden bg-white rounded-lg">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />

      <div className="relative z-10">
        {/* Compact header with title, tag, and duration */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-start gap-1.5 flex-1 min-w-0">
            <h3 className="text-xs font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-tight flex-1 break-words">
              {module.title}
            </h3>
            {module.tag && (
              <span className="px-1 py-0.5 text-[9px] font-medium text-foreground/50 bg-muted rounded flex-shrink-0">
                {module.tag}
              </span>
            )}
          </div>
          <div
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-semibold flex-shrink-0 ${durationColor}`}
          >
            <Clock className="w-3 h-3" />
            <span className="whitespace-nowrap">{module.durationHours}h</span>
          </div>
        </div>

        {/* Compact description - truncated to 2 lines for mobile */}
        <p className="text-[11px] text-muted-foreground leading-snug mb-1.5 line-clamp-2">
          {module.description}
        </p>

        {module.brandName && module.brandLogo && (
          <div className="mt-1">
            <Image
              src={module.brandLogo}
              alt={module.brandName}
              width={60}
              height={18}
              className="h-4 w-auto object-contain opacity-50 grayscale"
            />
          </div>
        )}
        {module.brandName && !module.brandLogo && (
          <span className="text-[10px] font-bold text-primary/50 mt-1 block">{module.brandName}</span>
        )}

        {/* Action button */}
        <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-border/50">
          {isSelected ? (
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-destructive hover:bg-destructive/10 rounded transition-all duration-200 hover:scale-105"
            >
              <X className="w-3 h-3" />
              Retirer
            </button>
          ) : (
            <button
              onClick={onAdd}
              disabled={!canAdd}
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded transition-all duration-200 ${
                canAdd
                  ? "bg-accent text-primary hover:bg-accent/90 hover:scale-105 disabled:hover:scale-100"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Plus className="w-3 h-3" />
              Ajouter
            </button>
          )}

          {!canAdd && !isSelected && (
            <span className="text-[9px] text-muted-foreground italic ml-auto">
              Temps insuffisant
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
