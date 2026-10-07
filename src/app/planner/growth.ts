import { GameClass, STAT_KEYS, StatKey, Stats, emptyStats } from '../data/models';

/** One leg of a class route: spend `levels` level-ups in `className`. */
export interface RouteStep {
  className: string;
  levels: number;
}

export interface ProjectedStep {
  step: RouteStep;
  gameClass: GameClass;
  startLevel: number;
  endLevel: number;
  growths: Stats;
  gained: Stats;
  totals: Stats;
}

/**
 * Personal growth plus class modifier, clamped to 0-100%.
 * The clamp is an assumption; the guides don't say how out-of-range values behave.
 */
export function effectiveGrowths(personal: Stats, gameClass: GameClass): Stats {
  const result = emptyStats();
  for (const key of STAT_KEYS) {
    result[key] = Math.min(100, Math.max(0, personal[key] + gameClass.modifiers[key]));
  }
  return result;
}

/** Walks a class route and returns the expected (average) stats after each step. */
export function projectRoute(
  personal: Stats,
  startStats: Stats,
  startLevel: number,
  route: readonly RouteStep[],
  classes: ReadonlyMap<string, GameClass>,
): ProjectedStep[] {
  const projected: ProjectedStep[] = [];
  let totals = { ...startStats };
  let level = startLevel;
  for (const step of route) {
    const gameClass = classes.get(step.className);
    if (!gameClass || step.levels <= 0) continue;
    const growths = effectiveGrowths(personal, gameClass);
    const gained = emptyStats();
    const next = emptyStats();
    for (const key of STAT_KEYS) {
      gained[key] = (growths[key] * step.levels) / 100;
      next[key] = totals[key] + gained[key];
    }
    projected.push({
      step,
      gameClass,
      startLevel: level,
      endLevel: level + step.levels,
      growths,
      gained,
      totals: next,
    });
    totals = next;
    level += step.levels;
  }
  return projected;
}

/** Sum of effective growths over the chosen stats; used to rank classes for a unit. */
export function focusScore(growths: Stats, focus: readonly StatKey[]): number {
  return focus.reduce((sum, key) => sum + growths[key], 0);
}
