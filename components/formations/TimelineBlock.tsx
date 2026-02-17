"use client";

import { X, Clock } from "lucide-react";
import type { PlacedModule } from "@/lib/dayBuilder";

interface TimelineBlockProps {
  placedModule: PlacedModule;
  onRemove: () => void;
}

/**
 * Convert hour index to visual position percentage
 * Accounts for lunch break at hour index 4 (12:30-13:30) which is NOT selectable
 * Timeline structure: morning 57.14% (hours 0-3), lunch 14.29%, afternoon 28.57% (hours 5-7)
 * 
 * Visual layout:
 * - Morning: 0% to 57.14% (4 hours: indices 0-3)
 * - Lunch: 57.14% to 71.43% (NOT fillable, index 4)
 * - Afternoon: 71.43% to 100% (3 hours: indices 5-7)
 * 
 * Hour indices mapping:
 * - Hours 0-3: Morning (08:30-12:30)
 * - Hour 4: Lunch break (12:30-13:30) - NOT selectable
 * - Hours 5-7: Afternoon (13:30-16:30)
 */
function getVisualPosition(startHour: number, endHour: number): { left: number; width: number } {
  const MORNING_HOURS = 4; // Hours 0-3 (selectable)
  const LUNCH_HOUR = 4; // Hour 4 is lunch break (NOT selectable)
  const AFTERNOON_START = 5; // Hours 5-7 are afternoon (selectable)
  const AFTERNOON_HOURS = 3; // 3 afternoon hours
  
  // Timeline visual percentages (matches DayTimeline.tsx layout)
  const MORNING_WIDTH_PERCENT = 57.14; // 4 hours
  const LUNCH_WIDTH_PERCENT = 14.29; // lunch break (NOT fillable)
  const AFTERNOON_WIDTH_PERCENT = 28.57; // 3 hours
  const AFTERNOON_START_PERCENT = MORNING_WIDTH_PERCENT + LUNCH_WIDTH_PERCENT; // 71.43%
  
  // Calculate left position
  let left = 0;
  if (startHour < MORNING_HOURS) {
    // Starts in morning: each hour is 57.14% / 4 = 14.285%
    left = (startHour / MORNING_HOURS) * MORNING_WIDTH_PERCENT;
  } else if (startHour >= AFTERNOON_START) {
    // Starts in afternoon: each hour is 28.57% / 3 = 9.523%
    const afternoonIndex = startHour - AFTERNOON_START;
    left = AFTERNOON_START_PERCENT + (afternoonIndex / AFTERNOON_HOURS) * AFTERNOON_WIDTH_PERCENT;
  } else {
    // Should never happen (at lunch break hour 4)
    left = MORNING_WIDTH_PERCENT;
  }
  
  // Calculate width
  let width = 0;
  if (startHour < MORNING_HOURS && endHour > MORNING_HOURS) {
    // Spans morning and afternoon (skips lunch break)
    // Morning part: from startHour to end of morning (hour 4, exclusive)
    const morningPart = MORNING_HOURS - startHour;
    const morningWidth = (morningPart / MORNING_HOURS) * MORNING_WIDTH_PERCENT;
    
    // Afternoon part: from afternoon start (hour 5) to endHour
    const afternoonPart = endHour - AFTERNOON_START;
    const afternoonWidth = (afternoonPart / AFTERNOON_HOURS) * AFTERNOON_WIDTH_PERCENT;
    
    // Total width = morning part + lunch gap + afternoon part
    width = morningWidth + LUNCH_WIDTH_PERCENT + afternoonWidth;
  } else if (startHour < MORNING_HOURS) {
    // Entirely in morning
    const duration = endHour - startHour;
    width = (duration / MORNING_HOURS) * MORNING_WIDTH_PERCENT;
  } else if (startHour >= AFTERNOON_START) {
    // Entirely in afternoon
    const duration = endHour - startHour;
    width = (duration / AFTERNOON_HOURS) * AFTERNOON_WIDTH_PERCENT;
  }
  
  return { left, width };
}

/**
 * Calculate actual duration accounting for lunch break
 * Hour indices: 0,1,2,3 (morning), 4 (lunch - skip), 5,6,7 (afternoon)
 */
function calculateActualDuration(startHour: number, endHour: number): number {
  const MORNING_HOURS = 4;
  const LUNCH_HOUR = 4;
  const AFTERNOON_START = 5;
  
  if (startHour < MORNING_HOURS && endHour > MORNING_HOURS) {
    // Spans morning and afternoon (skips lunch)
    const morningPart = MORNING_HOURS - startHour;
    const afternoonPart = endHour - AFTERNOON_START;
    return morningPart + afternoonPart;
  } else {
    // Entirely in morning or afternoon
    return endHour - startHour;
  }
}

export default function TimelineBlock({ placedModule, onRemove }: TimelineBlockProps) {
  const { module, startHour, endHour } = placedModule;
  const actualDuration = calculateActualDuration(startHour, endHour);
  const { left, width } = getVisualPosition(startHour, endHour);

  return (
    <div
      className="absolute top-0 h-full rounded-lg bg-gradient-to-br from-accent to-accent/80 text-primary p-2 group hover:shadow-lg transition-all duration-300 flex flex-col justify-between border-2 border-accent/30 z-10"
      style={{
        left: `${left}%`,
        width: `${width}%`,
      }}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs font-bold">{actualDuration}h</span>
          </div>
          <h4 className="text-xs font-semibold leading-tight truncate">
            {module.title}
          </h4>
        </div>
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center"
          aria-label={`Retirer ${module.title}`}
        >
          <X className="w-3 h-3 text-primary" />
        </button>
      </div>
    </div>
  );
}
