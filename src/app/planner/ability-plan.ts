import { CharacterDetails, ClassDetails } from '../data/models';
import { RouteStep } from './growth';

/** An ability the user adds by hand, e.g. one from a skill rank or an item. */
export interface CustomAbility {
  name: string;
  effect: string;
  /** Level at which the unit gains it. */
  level: number;
  /** How it's gained, for abilities picked from the game's list. */
  source?: string;
}

/** Slot count isn't documented anywhere yet, so the planner defaults to this. */
export const DEFAULT_ABILITY_SLOTS = 5;

export interface LearnedAbility {
  name: string;
  effect: string | null;
  source: string;
  level: number;
  /** Added by the user, so it can be removed. */
  custom?: boolean;
}

export interface AbilityStep {
  className: string;
  startLevel: number;
  endLevel: number;
  /** Always-on abilities: the personal ability plus the class's own skills. */
  innate: string[];
  /** Learned before this step starts, so they can be equipped during it. */
  available: LearnedAbility[];
  /** Equipped abilities that are actually available in this step. */
  equipped: string[];
  /** Planned equips that aren't learned yet at this point in the route. */
  notYetLearned: string[];
  /** Mastery ability this step's class teaches, if it has one. */
  masterSkill: string | null;
  /** Abilities gained during this step (mastery at its end, custom ones by level). */
  gained: LearnedAbility[];
}

/**
 * Walks a class route and works out which abilities are innate, learned and
 * equipped at each step. Mastery abilities are learned at the end of a step the
 * user marks as mastered and stay equippable in any class afterwards.
 */
export function planAbilities(
  route: readonly RouteStep[],
  startLevel: number,
  unit: CharacterDetails | undefined,
  classDetails: Readonly<Record<string, ClassDetails>>,
  custom: readonly CustomAbility[],
  effectOf: (name: string) => string | null,
): AbilityStep[] {
  const learned = new Map<string, LearnedAbility>();
  const learn = (ability: LearnedAbility, into: LearnedAbility[]) => {
    if (learned.has(ability.name)) return;
    learned.set(ability.name, ability);
    into.push(ability);
  };

  // Custom abilities gained at or before the starting level are known from the outset.
  const pending = [...custom].sort((a, b) => a.level - b.level);
  const customAbility = (c: CustomAbility): LearnedAbility => ({
    name: c.name,
    effect: c.effect || null,
    source: c.source ?? 'Added by you',
    level: c.level,
    custom: true,
  });
  while (pending.length && pending[0].level <= startLevel)
    learn(customAbility(pending.shift()!), []);

  let level = startLevel;
  return route.map((step) => {
    const details = classDetails[step.className];
    const endLevel = level + Math.max(0, step.levels);
    const available = [...learned.values()];
    const availableNames = new Set(available.map((a) => a.name));
    const planned = step.equipped ?? [];

    const gained: LearnedAbility[] = [];
    while (pending.length && pending[0].level <= endLevel)
      learn(customAbility(pending.shift()!), gained);
    const masterSkill = details?.masterSkill ?? null;
    if (step.mastered && masterSkill) {
      learn(
        {
          name: masterSkill,
          effect: effectOf(masterSkill),
          source: `${step.className} mastery`,
          level: endLevel,
        },
        gained,
      );
    }

    const result: AbilityStep = {
      className: step.className,
      startLevel: level,
      endLevel,
      innate: [...(unit ? [unit.personalAbility.name] : []), ...(details?.skills ?? [])],
      available,
      equipped: planned.filter((name) => availableNames.has(name)),
      notYetLearned: planned.filter((name) => !availableNames.has(name)),
      masterSkill,
      gained,
    };
    level = endLevel;
    return result;
  });
}
