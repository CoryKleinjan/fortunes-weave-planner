import { CharacterDetails, ClassDetails, STAT_KEYS, StatKey, Stats } from '../data/models';

export type StatCaps = Partial<Record<StatKey, number>>;

/** Character pages call gauntlet training "Brawling"; class requirements call it "Gauntlet". */
const APTITUDE_ALIASES: Readonly<Record<string, string>> = { Brawling: 'Gauntlet' };

function aptitude(name: string): string {
  return APTITUDE_ALIASES[name] ?? name;
}

/**
 * Stats as the game would show them in a class: the unit's own stats plus the class's
 * flat bonuses, held to any caps. User caps win over class caps.
 */
export function statsInClass(
  totals: Stats,
  details: ClassDetails | undefined,
  userCaps: StatCaps,
): Stats {
  const result = { ...totals };
  for (const key of STAT_KEYS) {
    result[key] += details?.baseBonuses?.[key] ?? 0;
    const cap = userCaps[key] ?? details?.caps?.[key];
    if (cap !== undefined && cap !== null) result[key] = Math.min(result[key], cap);
  }
  return result;
}

/** Plain-language problems with putting a unit in a class at a given level. */
export function classWarnings(
  unitName: string,
  unit: CharacterDetails | undefined,
  className: string,
  details: ClassDetails | undefined,
  level: number,
): string[] {
  const warnings: string[] = [];
  if (!details) return warnings;

  const needed = details.unlock?.level;
  if (needed && level < needed) {
    warnings.push(
      `The ${className} exam recommends level ${needed}; this step starts at ${level}.`,
    );
  }

  const kind = details.movement.kind;
  if (unit?.cannotMount && (kind === 'mounted' || kind === 'flying')) {
    warnings.push(`${unitName} can't use cavalry or flying classes.`);
  }

  const weak = new Set((unit?.weaknesses ?? []).map(aptitude));
  for (const req of details.unlock?.requires ?? []) {
    if (weak.has(req.skill)) {
      warnings.push(`Needs ${req.skill} ${req.rank}, and ${unitName} is weak in ${req.skill}.`);
    }
  }
  return warnings;
}

/** True when every skill the class exam checks is one the unit is strong in. */
export function suitsAptitudes(unit: CharacterDetails | undefined, details: ClassDetails): boolean {
  const strong = new Set((unit?.strengths ?? []).map(aptitude));
  const requires = details.unlock?.requires ?? [];
  return requires.length > 0 && requires.every((r) => strong.has(r.skill));
}
