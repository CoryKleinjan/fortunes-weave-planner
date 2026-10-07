import { STAT_KEYS, STAT_LABELS, StatKey, Stats, emptyStats } from '../data/models';

const STAT_BY_LABEL = new Map<string, StatKey>(STAT_KEYS.map((k) => [STAT_LABELS[k], k]));

/** "Grants Dex/Spd +1." or "Grants Avo +7, Mov +1." with no condition attached. */
const ALWAYS_ON = /^Grants ((?:[A-Za-z]+(?:\/[A-Za-z]+)* \+\d+(?:, |$))+)$/;

export interface AbilityBonus {
  /** Bonuses to the unit's nine stats. */
  stats: Partial<Record<StatKey, number>>;
  /** Other always-on bonuses, e.g. Avo or Mov, by label. */
  other: Record<string, number>;
}

/**
 * Reads the bonus an ability always gives from its effect text. Returns null for
 * anything conditional (in combat, with a weapon, on a trigger, for allies, or
 * tagged for a movement type), since those don't change the stat screen.
 */
export function alwaysOnBonus(effect: string | null | undefined): AbilityBonus | null {
  if (!effect) return null;
  const text = effect
    .trim()
    .replace(/\.$/, '')
    .replace(/max HP/g, 'HP')
    .replace(/(\w) ?\+ ?(\d)/g, '$1 +$2');
  const match = ALWAYS_ON.exec(text);
  if (!match) return null;
  const bonus: AbilityBonus = { stats: {}, other: {} };
  for (const part of match[1].split(', ')) {
    const [labels, amount] = part.split(' +');
    for (const label of labels.split('/')) {
      const key = STAT_BY_LABEL.get(label);
      if (key) bonus.stats[key] = (bonus.stats[key] ?? 0) + Number(amount);
      else bonus.other[label] = (bonus.other[label] ?? 0) + Number(amount);
    }
  }
  return bonus;
}

export interface AbilityTotals {
  stats: Stats;
  other: Record<string, number>;
  /** Which abilities contributed, for display. */
  sources: string[];
}

/** Adds up the always-on bonuses of the given abilities. */
export function abilityTotals(
  abilities: readonly { name: string; effect: string | null | undefined }[],
): AbilityTotals {
  const totals: AbilityTotals = { stats: emptyStats(), other: {}, sources: [] };
  for (const ability of abilities) {
    const bonus = alwaysOnBonus(ability.effect);
    if (!bonus) continue;
    totals.sources.push(ability.name);
    for (const key of STAT_KEYS) totals.stats[key] += bonus.stats[key] ?? 0;
    for (const [label, amount] of Object.entries(bonus.other)) {
      totals.other[label] = (totals.other[label] ?? 0) + amount;
    }
  }
  return totals;
}
