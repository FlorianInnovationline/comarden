"use client";

import { ArrowDown, MousePointerClick } from "lucide-react";
import Card from "@/components/ui/Card";
import { getHourLabel } from "@/lib/dayBuilder";
import type { PlacedModule } from "@/lib/dayBuilder";
import TimelineBlock from "./TimelineBlock";

interface DayTimelineProps {
  placedModules: PlacedModule[];
  onRemoveModule: (moduleId: string) => void;
}

export default function DayTimeline({
  placedModules,
  onRemoveModule,
}: DayTimelineProps) {
  // 9 markers for 7-hour day: 08:30, 09:30, 10:30, 11:30, 12:30, 13:30, 14:30, 15:30, 16:30
  const hourLabels = Array.from({ length: 9 }, (_, i) => getHourLabel(i));

  return (
    <Card className="p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">Planning de la journée</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          08:30 - 16:30 (7 heures total)
        </p>

        {/* Instructions Banner */}
        {placedModules.length === 0 && (
          <div className="bg-accent/60 border-2 border-accent/90 rounded-lg p-4 mb-6 shadow-md">
            <div className="flex items-start gap-3" style={{ opacity: 1 }}>
              <div className="w-10 h-10 rounded-full bg-accent/80 flex items-center justify-center flex-shrink-0">
                <MousePointerClick className="w-5 h-5 text-accent" style={{ opacity: 1 }} />
              </div>
              <div className="flex-1" style={{ opacity: 1 }}>
                <h4 className="text-sm font-bold mb-1" style={{ color: 'rgb(15 23 42)', opacity: 1 }}>
                  Comment remplir votre journée ?
                </h4>
                <p className="text-xs leading-relaxed mb-2 font-semibold" style={{ color: 'rgb(30 41 59)', opacity: 1 }}>
                  Cliquez sur &quot;<span className="font-bold text-accent" style={{ opacity: 1 }}>+ Ajouter</span>&quot; à côté de chaque formation dans la liste ci-dessous. Les modules s&apos;afficheront automatiquement sur cette timeline selon leur durée (2h, 4h ou 7h).
                </p>
                <div className="flex items-center gap-2 text-xs text-accent font-bold mt-2" style={{ opacity: 1 }}>
                  <ArrowDown className="w-4 h-4 animate-bounce" style={{ opacity: 1 }} />
                  <span style={{ opacity: 1 }}>Commencez par sélectionner une formation ci-dessous</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Beam */}
      <div className="relative overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        {/* Hour labels */}
        <div className="flex justify-between mb-2 sm:mb-3 text-[10px] sm:text-xs text-muted-foreground min-w-[600px] sm:min-w-0">
          {hourLabels.map((label, index) => (
            <span key={index} className="font-medium flex-shrink-0">
              {label}
            </span>
          ))}
        </div>

        {/* Timeline container */}
        <div className="relative h-24 sm:h-32 bg-gradient-to-r from-primary/5 via-primary/5 to-primary/5 rounded-xl border-2 border-border overflow-hidden min-w-[600px] sm:min-w-0">
          {/* Morning section (0-4h) */}
          <div className="absolute left-0 top-0 w-[57.14%] h-full border-r-2 border-dashed border-primary/20" />
          
          {/* Lunch break indicator - must be above modules */}
          <div className="absolute left-[57.14%] top-0 w-[14.29%] h-full bg-muted/30 flex items-center justify-center border-x-2 border-dashed border-border z-20">
            <div className="text-center">
              <div className="text-xs font-semibold text-muted-foreground">Pause</div>
              <div className="text-xs text-muted-foreground">12:30-13:30</div>
            </div>
          </div>

          {/* Afternoon section (4-7h) */}
          <div className="absolute right-0 top-0 w-[28.57%] h-full" />

          {/* Placed modules */}
          {placedModules.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3 animate-pulse shadow-sm">
                <MousePointerClick className="w-8 h-8 text-primary/70" />
              </div>
              <p className="text-sm font-semibold text-foreground/80 text-center mb-1">
                Votre planning apparaîtra ici
              </p>
              <p className="text-xs text-foreground/70 text-center">
                Sélectionnez des formations dans la liste à gauche
              </p>
            </div>
          ) : (
            placedModules.map((placedModule) => (
              <TimelineBlock
                key={placedModule.module.id}
                placedModule={placedModule}
                onRemove={() => onRemoveModule(placedModule.module.id)}
              />
            ))
          )}

          {/* Hour dividers */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-border/50"
              style={{ left: `${((i + 1) / 7) * 100}%` }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-accent/20 border border-accent/30 flex-shrink-0" />
            <span>Formation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-muted/30 border border-border flex-shrink-0" />
            <span>Pause déjeuner</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
