export const STAT_KEYS = ['hp', 'str', 'mag', 'spd', 'dex', 'def', 'res', 'lck', 'cha'] as const;

export type StatKey = (typeof STAT_KEYS)[number];

export type Stats = Record<StatKey, number>;

export const STAT_LABELS: Record<StatKey, string> = {
  hp: 'HP',
  str: 'Str',
  mag: 'Mag',
  spd: 'Spd',
  dex: 'Dex',
  def: 'Def',
  res: 'Res',
  lck: 'Lck',
  cha: 'Cha',
};

export type ClassTier = 'beginner' | 'specialty' | 'advanced' | 'master' | 'divine';

export const TIERS: readonly { id: ClassTier; label: string; recommendedLevel: number }[] = [
  { id: 'beginner', label: 'Base / Beginner', recommendedLevel: 5 },
  { id: 'specialty', label: 'Specialty', recommendedLevel: 20 },
  { id: 'advanced', label: 'Advanced', recommendedLevel: 35 },
  { id: 'master', label: 'Master', recommendedLevel: 45 },
  { id: 'divine', label: 'Divine', recommendedLevel: 45 },
];

export interface Character {
  name: string;
  faction: string;
  growths: Stats;
}

export interface GameClass {
  name: string;
  tier: ClassTier;
  modifiers: Stats;
}

export function emptyStats(): Stats {
  return { hp: 0, str: 0, mag: 0, spd: 0, dex: 0, def: 0, res: 0, lck: 0, cha: 0 };
}

export const WEAPON_TYPES = [
  'Sword',
  'Spear',
  'Axe',
  'Bow',
  'Gauntlet',
  'White Magic',
  'Black Magic',
] as const;

export type WeaponType = (typeof WEAPON_TYPES)[number];

/** Skills that gate classes but aren't weapons (mount and armor training). */
export type MovementSkill = 'Rider' | 'Flier' | 'Heavy';

export type Rank = 'E' | 'E+' | 'D' | 'C' | 'B' | 'A' | 'S';

export type MovementKind = 'foot' | 'armored' | 'mounted' | 'flying';

export interface SkillRank {
  skill: WeaponType | MovementSkill;
  rank: Rank;
}

export interface ClassWeapon {
  type: WeaponType;
  /** Rank the class trains the weapon to; null when the class can wield it untrained. */
  rank: Rank | null;
}

export interface ClassUnlock {
  /** Skill ranks the certification exam checks. */
  requires: SkillRank[];
  /** Recommended level for the exam (a pass-chance factor, not a hard lock). */
  level: number | null;
  renown: number | null;
  /** License or unique item the exam consumes. */
  license: string | null;
  /** Route-specific or story conditions that also unlock the class. */
  notes: string[];
}

export interface ClassDetails {
  /** Flat stat bonuses while in the class; null where no source documents them. */
  baseBonuses: Stats | null;
  /** Stat caps; null until a source documents them. */
  caps: Stats | null;
  weapons: ClassWeapon[];
  movement: { kind: MovementKind; range: number | null };
  skills: string[];
  masterSkill: string | null;
  unlock: ClassUnlock | null;
}

export interface CharacterDetails {
  personalAbility: { name: string; effect: string };
  /** Skills the unit trains faster in ("Brawling" means gauntlets). */
  strengths: string[];
  weaknesses: string[];
  startingClass: string | null;
  /** Stats when the unit joins, before class bonuses; null where undocumented. */
  bases: Stats | null;
  /** True when the personal ability bars cavalry and flying classes. */
  cannotMount?: boolean;
}
