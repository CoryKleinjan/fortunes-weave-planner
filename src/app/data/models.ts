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
