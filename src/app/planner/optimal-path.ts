import { CharacterDetails, ClassDetails, GameClass, StatKey, Stats } from '../data/models';
import { classWarnings } from './class-checks';
import { RouteStep, effectiveGrowths } from './growth';

export const OPTIMAL_TARGET_LEVEL = 50;

export interface OptimalPathInput {
  unitName: string;
  unit: CharacterDetails | undefined;
  personal: Stats;
  startLevel: number;
  classes: readonly GameClass[];
  classDetails: Readonly<Record<string, ClassDetails>>;
  targetLevel?: number;
}

export interface OptimalPath {
  route: RouteStep[];
  /** The stats the route was chosen to raise. */
  stats: StatKey[];
  /** Expected gain in those stats by the target level, final class bonuses included. */
  gain: number;
}

/**
 * Combat stats: HP, the unit's attack stat (Str or Mag, whichever it grows faster),
 * Spd, Dex, Def and Res. Luck and Charm are left out, and so is the other attack stat.
 */
export function combatStats(personal: Stats): StatKey[] {
  const attack: StatKey = personal.mag > personal.str ? 'mag' : 'str';
  return ['hp', attack, 'spd', 'dex', 'def', 'res'];
}

function sum(stats: Stats, keys: readonly StatKey[]): number {
  return keys.reduce((total, key) => total + stats[key], 0);
}

/**
 * Whether the unit could normally be in this class from `level` on. Only regular
 * certification classes count, entered no earlier than their exam's recommended level,
 * and never one the unit can't use or needs a weak skill for. Story, route and unique-item
 * classes (and the female-only class) are left out, except the class the unit joins in.
 */
function canUse(
  input: OptimalPathInput,
  gameClass: GameClass,
  details: ClassDetails | undefined,
  level: number,
): boolean {
  if (gameClass.name === 'Commoner' || gameClass.name === input.unit?.startingClass) return true;
  const unlock = details?.unlock;
  if (!unlock?.level || !unlock.license) return false;
  // Classes gated on one lord's route or open to one gender can't be planned for everyone.
  if (unlock.notes.some((note) => /route|only/i.test(note))) return false;
  return classWarnings(input.unitName, input.unit, gameClass.name, details, level).length === 0;
}

/**
 * The route to `targetLevel` that maximizes the unit's expected combat stats: every
 * level-up is spent in the open class with the highest growth in those stats, and the last
 * one in whichever open class gives the most growth plus flat stat bonuses in them (the
 * class bonus counts because the game shows stats with it added).
 * Growth stacks per level and classes never close, so this greedy pick is optimal for that
 * rule. Ties keep the current class to avoid needless class changes.
 */
export function optimalPath(input: OptimalPathInput): OptimalPath {
  const target = input.targetLevel ?? OPTIMAL_TARGET_LEVEL;
  const keys = combatStats(input.personal);
  const growthOf = new Map(
    input.classes.map((c) => [c.name, sum(effectiveGrowths(input.personal, c), keys) / 100]),
  );
  const open = (level: number) =>
    input.classes.filter((c) => canUse(input, c, input.classDetails[c.name], level));

  const picks: string[] = [];
  let gain = 0;
  for (let level = input.startLevel; level < target; level++) {
    const last = level === target - 1;
    const score = (c: GameClass) => {
      const bonus = input.classDetails[c.name]?.baseBonuses;
      return growthOf.get(c.name)! + (last && bonus ? sum(bonus, keys) : 0);
    };
    const previous = picks[picks.length - 1];
    let best: GameClass | undefined;
    for (const c of open(level)) {
      if (!best || score(c) > score(best) || (score(c) === score(best) && c.name === previous)) {
        best = c;
      }
    }
    if (!best) break;
    picks.push(best.name);
    gain += score(best);
  }

  const route: RouteStep[] = [];
  for (const className of picks) {
    const step = route[route.length - 1];
    if (step?.className === className) step.levels++;
    else route.push({ className, levels: 1 });
  }
  return { route, stats: keys, gain };
}
