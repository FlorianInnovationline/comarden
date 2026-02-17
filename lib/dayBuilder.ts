import type { FormationModule, FormationModuleDuration } from "./formations";

export interface PlacedModule {
  module: FormationModule;
  startHour: number; // 0-6 (hour index in the 7-hour day)
  endHour: number; // exclusive
}

export interface DaySchedule {
  placedModules: PlacedModule[];
  remainingHours: number;
  morningHoursUsed: number; // 0-4
  afternoonHoursUsed: number; // 0-3
}

const TOTAL_HOURS = 7;
const MORNING_HOURS = 4; // Hours 0-3 (08:30-12:30)
const LUNCH_HOUR = 4; // Hour index 4 is the lunch break (12:30-13:30) - NOT selectable
const AFTERNOON_START_HOUR = 5; // Afternoon starts at hour index 5 (13:30)
const AFTERNOON_HOURS = 3; // Hours 5-7 (13:30-16:30)

/**
 * Convert hour index to timeline position (accounting for lunch break)
 * Hour indices: 0,1,2,3 (morning), 4 (lunch - skip), 5,6,7 (afternoon)
 */
function hourIndexToPosition(hourIndex: number): number {
  if (hourIndex < LUNCH_HOUR) {
    return hourIndex; // Morning hours map directly
  }
  // Afternoon hours need to account for lunch break in visual positioning
  // But for calculation, we use actual hour indices
  return hourIndex;
}

/**
 * Calculate the current schedule state from selected modules
 * Ensures lunch break (hour index 4) is never filled
 */
export function calculateSchedule(selectedModules: FormationModule[]): DaySchedule {
  const placedModules: PlacedModule[] = [];
  let currentHour = 0;

  for (const module of selectedModules) {
    const duration = module.durationHours;
    
    // Calculate available hours accounting for lunch break
    let availableHours = 0;
    if (currentHour < MORNING_HOURS) {
      // In morning
      availableHours = MORNING_HOURS - currentHour; // Hours available in morning
      if (duration > availableHours) {
        // Need afternoon hours too
        const afternoonNeeded = duration - availableHours;
        availableHours += AFTERNOON_HOURS; // Can use all afternoon if needed
      }
    } else if (currentHour >= AFTERNOON_START_HOUR) {
      // In afternoon
      const afternoonUsed = currentHour - AFTERNOON_START_HOUR;
      availableHours = AFTERNOON_HOURS - afternoonUsed;
    } else {
      // At lunch break - should never happen, but just in case
      currentHour = AFTERNOON_START_HOUR;
      const afternoonUsed = currentHour - AFTERNOON_START_HOUR;
      availableHours = AFTERNOON_HOURS - afternoonUsed;
    }
    
    if (duration > availableHours) {
      // Doesn't fit - skip (should be prevented by UI)
      continue;
    }

    // Place module
    if (currentHour < MORNING_HOURS) {
      const morningRemaining = MORNING_HOURS - currentHour;
      if (duration <= morningRemaining) {
        // Fits entirely in morning (before lunch break)
        placedModules.push({
          module,
          startHour: currentHour,
          endHour: currentHour + duration, // endHour is exclusive, so hour 4 (lunch) is never filled
        });
        currentHour += duration;
      } else {
        // Spans morning and afternoon (must skip lunch break)
        // Morning part: use remaining morning hours
        const morningPart = morningRemaining; // e.g., if currentHour=0, morningPart=4
        const afternoonPart = duration - morningPart; // e.g., if duration=5, afternoonPart=1
        
        // Start afternoon after lunch break (hour 5)
        const afternoonStart = AFTERNOON_START_HOUR;
        const afternoonEndHour = afternoonStart + afternoonPart; // e.g., 5 + 1 = 6
        
        placedModules.push({
          module,
          startHour: currentHour, // Starts in morning (e.g., 0)
          endHour: afternoonEndHour, // Ends at afternoon end hour (e.g., 6, which is exclusive)
        });
        currentHour = afternoonEndHour; // Next module starts here (e.g., 6)
      }
    } else if (currentHour >= AFTERNOON_START_HOUR) {
      // Currently in afternoon (after lunch break)
      placedModules.push({
        module,
        startHour: currentHour,
        endHour: currentHour + duration,
      });
      currentHour += duration;
    } else {
      // At lunch break (should never happen due to earlier check, but skip to afternoon)
      currentHour = AFTERNOON_START_HOUR;
      placedModules.push({
        module,
        startHour: currentHour,
        endHour: currentHour + duration,
      });
      currentHour += duration;
    }
  }

  const morningHoursUsed = Math.min(currentHour, MORNING_HOURS);
  const afternoonHoursUsed = currentHour > MORNING_HOURS ? Math.min(currentHour - AFTERNOON_START_HOUR, AFTERNOON_HOURS) : 0;
  const remainingHours = TOTAL_HOURS - (morningHoursUsed + afternoonHoursUsed);

  return {
    placedModules,
    remainingHours,
    morningHoursUsed,
    afternoonHoursUsed,
  };
}

/**
 * Check if a module can be added given current selections
 */
export function canAddModule(
  module: FormationModule,
  selectedModules: FormationModule[]
): boolean {
  const schedule = calculateSchedule(selectedModules);
  return schedule.remainingHours >= module.durationHours;
}

/**
 * Get hour label for timeline display
 * Timeline: 08:30, 09:30, 10:30, 11:30, 12:30 (lunch), 13:30, 14:30, 15:30, 16:30
 * hourIndex 0-7 corresponds to these 8 markers
 */
export function getHourLabel(hourIndex: number): string {
  const times = [
    "08:30", // Start morning
    "09:30",
    "10:30",
    "11:30",
    "12:30", // End morning, start lunch
    "13:30", // End lunch, start afternoon
    "14:30",
    "15:30",
    "16:30", // End afternoon
  ];
  return times[Math.min(hourIndex, times.length - 1)] || "08:30";
}
