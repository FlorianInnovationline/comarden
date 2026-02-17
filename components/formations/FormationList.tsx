"use client";

import { MousePointerClick, ArrowDown } from "lucide-react";
import Card from "@/components/ui/Card";
import FormationCard from "./FormationCard";
import type { FormationModule } from "@/lib/formations";
import { canAddModule } from "@/lib/dayBuilder";

interface FormationListProps {
  modules: FormationModule[];
  selectedModules: FormationModule[];
  onAdd: (module: FormationModule) => void;
  onRemove: (moduleId: string) => void;
}

export default function FormationList({
  modules,
  selectedModules,
  onAdd,
  onRemove,
}: FormationListProps) {
  const isSelected = (moduleId: string) => {
    return selectedModules.some((m) => m.id === moduleId);
  };

  return (
    <Card className="p-3 sm:p-4 lg:p-6 flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-2 sm:mb-3 flex-shrink-0">
        <h3 className="text-sm sm:text-base font-bold text-primary">Formations disponibles</h3>
        <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap ml-2">
          {modules.length} formation{modules.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Quick instruction hint */}
      {selectedModules.length === 0 && (
        <div className="mb-2.5 p-2 bg-accent/60 border-2 border-accent/90 rounded-lg flex items-start gap-1.5 text-[10px] sm:text-xs shadow-sm">
          <MousePointerClick className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent flex-shrink-0 mt-0.5" />
          <span className="font-semibold leading-tight" style={{ color: 'rgb(15 23 42)', opacity: 1 }}>
            <span className="font-bold">Astuce:</span> Cliquez sur "<span className="font-bold text-accent" style={{ opacity: 1 }}>+ Ajouter</span>" pour chaque formation (maximum 7h).
          </span>
        </div>
      )}

      {modules.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground flex-1 flex items-center justify-center">
          Aucune formation disponible
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto pr-2" style={{ maxHeight: '280px' }}>
          {modules.map((module) => {
            const selected = isSelected(module.id);
            const canAdd = canAddModule(module, selectedModules);

            return (
              <FormationCard
                key={module.id}
                module={module}
                isSelected={selected}
                canAdd={canAdd && !selected}
                onAdd={() => onAdd(module)}
                onRemove={() => onRemove(module.id)}
              />
            );
          })}
        </div>
      )}
    </Card>
  );
}
