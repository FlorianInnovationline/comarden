"use client";

import { Clock, CheckCircle2, Trash2, ArrowRight, Plus, HelpCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { FormationModule } from "@/lib/formations";
import type { DaySchedule } from "@/lib/dayBuilder";

interface SummaryPanelProps {
  schedule: DaySchedule;
  selectedModules: FormationModule[];
  onRemove: (moduleId: string) => void;
  onReset: () => void;
  onSubmit: () => void;
}

export default function SummaryPanel({
  schedule,
  selectedModules,
  onRemove,
  onReset,
  onSubmit,
}: SummaryPanelProps) {
  const totalHours = 7 - schedule.remainingHours;

  return (
    <Card className="p-3 sm:p-4 lg:p-6 flex flex-col min-w-0">
      <div className="flex-shrink-0 mb-3">
        <h3 className="text-sm sm:text-base font-bold text-primary mb-2">Récapitulatif</h3>

        {/* Remaining hours badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 font-semibold mb-2.5 text-xs ${
            schedule.remainingHours === 0
              ? "bg-green-50 border-green-200 text-green-800"
              : schedule.remainingHours < 3
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-primary/5 border-primary/20 text-primary"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Temps restant: {schedule.remainingHours}h</span>
        </div>

        {/* Selected modules list */}
        {selectedModules.length > 0 ? (
          <div className="space-y-2 mb-3">
            {selectedModules.map((module) => (
              <div
                key={module.id}
                className="flex items-start justify-between gap-2 p-2 rounded-lg bg-muted/30 border border-border group hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="text-xs font-semibold text-primary truncate">
                      {module.title}
                    </h4>
                    <span className="px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-background rounded border border-border flex-shrink-0">
                      {module.durationHours}h
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(module.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 p-1 rounded hover:bg-destructive/10 text-destructive"
                  aria-label={`Retirer ${module.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {/* Total hours - always visible */}
        <div className="pt-2 border-t border-border mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Total sélectionné:</span>
            <span className="font-semibold text-primary">{totalHours}h / 7h</span>
          </div>
          <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-300"
              style={{ width: `${(totalHours / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Empty state - appears in the middle section when no modules selected */}
      {selectedModules.length === 0 && (
        <div className="flex flex-col items-center justify-center py-1.5 px-3 mb-3" style={{ minHeight: '145px' }}>
          {/* Animated empty state - very compact */}
          <div className="relative w-full max-w-sm">
            {/* Animated pulse circles - smaller */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 animate-ping opacity-30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-accent/25 animate-pulse" />
            </div>
            
            {/* Icon - smaller */}
            <div className="relative z-10 flex items-center justify-center mb-1.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-accent/20 flex items-center justify-center border-2 border-accent/40 shadow-sm">
                <Plus className="w-4 h-4 text-accent animate-pulse-slow" />
              </div>
            </div>

            {/* Instructions - very compact */}
            <div className="relative z-10 space-y-1 text-center">
              <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-1.5 mb-1.5 shadow-sm">
                <div className="flex items-start gap-1.5">
                  <HelpCircle className="w-2.5 h-2.5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="text-[10px] font-semibold text-primary mb-0.5">
                      Vos formations sélectionnées apparaîtront ici
                    </h4>
                    <p className="text-[9px] text-foreground/75 leading-tight">
                      Cliquez sur &quot;<span className="font-semibold text-accent">+ Ajouter</span>&quot; à gauche.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step indicators - very compact */}
              <div className="space-y-0.5 text-[9px] text-foreground/80 text-left">
                <div className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="w-3 h-3 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 border border-accent/40 shadow-sm">
                    <span className="text-[7px] font-bold text-accent">1</span>
                  </div>
                  <span>Parcourez les formations</span>
                </div>
                <div className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-3 h-3 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 border border-accent/40 shadow-sm">
                    <span className="text-[7px] font-bold text-accent">2</span>
                  </div>
                  <span>Cliquez sur &quot;+ Ajouter&quot;</span>
                </div>
                <div className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-3 h-3 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 border border-accent/40 shadow-sm">
                    <ArrowRight className="w-2 h-2 text-accent" />
                  </div>
                  <span>Validez votre journée (7h max)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2 mt-4 flex-shrink-0">
        {selectedModules.length > 0 && (
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-300 text-xs"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Réinitialiser la journée
          </Button>
        )}

        <Button
          onClick={onSubmit}
          disabled={selectedModules.length === 0}
          size="sm"
          className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 text-xs"
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
          Valider ma journée de formation
        </Button>
      </div>
    </Card>
  );
}
