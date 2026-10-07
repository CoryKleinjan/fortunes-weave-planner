import { ClassDetails, STAT_KEYS, StatKey, Stats } from '../data/models';
import { StatCaps, statsInClass } from './class-checks';
import { abilityTotals } from './final-stats';

/** The weapon the user says the unit is holding; weapon data isn't in the planner. */
export interface EquippedWeapon {
  name: string;
  might: number;
  hit: number;
  crit: number;
  weight: number;
  /** Magic uses Mag for Atk instead of Str. */
  magic: boolean;
}

/** A combat stat whose stat-based part no source documents: only the known parts are added up. */
export interface PartialStat {
  /** Weapon value plus always-on ability bonuses. */
  known: number;
  /** The stat the game says feeds it, whose formula isn't published. */
  from: string;
}

export interface CharacterSheet {
  /** Whole-number stats as the game would show them: averages rounded, class and ability bonuses added, caps applied. */
  stats: Stats;
  capped: StatKey[];
  atk: number;
  as: number;
  avo: number;
  prt: number;
  rsl: number;
  hit: PartialStat;
  crit: PartialStat;
  ddg: PartialStat;
  /** Null when the class's movement isn't documented. */
  mov: number | null;
  bld: number;
  /** Always-on bonuses that aren't one of the above, e.g. Shld. */
  otherBonuses: string[];
  /** Abilities whose always-on bonuses are counted. */
  bonusSources: string[];
}

const COUNTED = new Set(['Atk', 'AS', 'Avo', 'Prt', 'Rsl', 'Hit', 'Crit', 'Ddg', 'Mov', 'Bld']);

/**
 * Works out the unit's full stat screen. Formulas used are the published ones:
 * Atk = Str (or Mag) + Mt; AS and Avo = Spd - max(0, Wt - Bld); Prt = Def; Rsl = Res.
 */
export function characterSheet(
  grown: Stats,
  classDetails: ClassDetails | undefined,
  caps: StatCaps,
  abilities: readonly { name: string; effect: string | null | undefined }[],
  weapon: EquippedWeapon | undefined,
  build: number,
): CharacterSheet {
  const bonuses = abilityTotals(abilities);
  const withAbilities = { ...grown };
  for (const key of STAT_KEYS) withAbilities[key] = Math.round(grown[key]) + bonuses.stats[key];
  const stats = statsInClass(withAbilities, classDetails, caps);
  const capped = STAT_KEYS.filter(
    (k) => stats[k] < withAbilities[k] + (classDetails?.baseBonuses?.[k] ?? 0),
  );

  const bonus = (label: string) => bonuses.other[label] ?? 0;
  const bld = build + bonus('Bld');
  const weightPenalty = Math.max(0, (weapon?.weight ?? 0) - bld);
  const range = classDetails?.movement.range ?? null;

  return {
    stats,
    capped,
    atk: (weapon?.magic ? stats.mag : stats.str) + (weapon?.might ?? 0) + bonus('Atk'),
    as: stats.spd - weightPenalty + bonus('AS'),
    avo: stats.spd - weightPenalty + bonus('Avo'),
    prt: stats.def + bonus('Prt'),
    rsl: stats.res + bonus('Rsl'),
    hit: { known: (weapon?.hit ?? 0) + bonus('Hit'), from: 'Dex' },
    crit: { known: (weapon?.crit ?? 0) + bonus('Crit'), from: 'Dex' },
    ddg: { known: bonus('Ddg'), from: 'Lck' },
    mov: range === null ? null : range + bonus('Mov'),
    bld,
    otherBonuses: Object.entries(bonuses.other)
      .filter(([label]) => !COUNTED.has(label))
      .map(([label, amount]) => `${label} +${amount}`),
    bonusSources: bonuses.sources,
  };
}
