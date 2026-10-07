import { catalogAbility } from './ability-catalog';

/**
 * Class and master skill effects, from fortunesweave.co.uk's abilities list and class
 * pages (checked 2026-10-07).
 */
const EFFECTS: Readonly<Record<string, string>> = {
  'Attack Basics': 'Grants Str +1.',
  'Hunting Basics': 'Grants Dex/Spd +1.',
  'Defense Basics': 'Grants Def +1.',
  'Offense Basics': 'Grants Str/Mag +1.',
  'Magic Basics': 'Grants Mag/Res +1.',
  Locktouch: 'Allows opening chests without keys.',
  Search: 'Search results are more likely to be perfect.',
  'Advanced Search': 'Search results are even more likely to be perfect.',
  'Master Search': 'Search results are very likely to be perfect.',
  'Ultimate Search': 'Search results are almost always perfect.',
  'Mount/Dismount': 'Allows use of the Mount and Dismount commands.',
  Dance: 'Allows the use of the Dance combat art.',
  'White-Magic Seeker': 'Multiplies white magic uses by 2.',
  'Black-Magic Seeker': 'Multiplies black magic uses by 2.',
  'White-Magic Zenith': 'Multiplies white magic uses by 3.',
  'All-Magic Zenith': 'Multiplies black and white magic uses by 3.',
  'Flying Avo +7': 'Grants Avo +7.',
  'Golden Ride': 'Neutralizes effective vs. cavalry.',
  'Chariot Armor': 'Grants Shld +5, but the unit cannot avoid attacks.',
  'Charioteer Tactics': 'Allows Mount/Dismount and the Charge command.',
  "Charioteer's Path": 'Growth increases with level.',
  'War-Elephant Boots': 'Unit takes half damage, but cannot avoid attacks.',
  'Elephant Tactics': 'Allows Mount/Dismount and the heavy Charge command.',

  // Master skills
  'Ravaging Arts': 'Critical hits deal +6 damage.',
  Regroup: "If foe's attack misses, grants Avo +20 during combat.",
  'Attack, Get Back': 'After using a combat art, grants Avo +10 during combat.',
  Crescendo: 'After defeating a foe, grants Hit +3 until the end of the map (max +30).',
  'In Shadow': "After defeating a foe, grants Avo +10 until the unit's next combat.",
  'Great Counter': 'If foe attacks first, grants Atk +3 during combat.',
  'Bolster Health': 'Grants max HP +3.',
  Charger: "After using Charge, grants Prt +10 until the unit's next phase.",
  'Sense Threat': 'If foe is effective against unit, grants Avo +20 during combat.',
  'Protecting Wings': 'Grants Res +3.',
  Piety: 'Grants Lck +3.',
  'Bind Dexterity': 'Inflicts Dex -3 on adjacent foes.',
  'Practiced Art': 'Grants Hit +10 when using combat arts.',
  'Ever Vigilant': 'Restores some HP after defeating a foe with a critical hit.',
  'Special Dance': 'Grants Dex/Spd +3 to the danced ally for the current phase.',
  Makeshift: '10% chance that combat arts cost no weapon durability.',
  Marksmanship: 'When equipped with a bow, grants Hit +15.',
  "Hunter's Eye": 'Grants Atk +3 on bow follow-up attacks.',
  Countershot: '50% chance to counter adjacent foes with an equipped bow.',
  Pavise: '20% chance to halve physical damage.',
  Brace: "After defeating a foe, grants Prt +3 until the unit's next phase.",
  'Elephant Vanguard': 'Grants Hit +10.',
  'Focused Counter': 'If foe attacks first, grants Hit +10 during combat.',
  Aegis: '20% chance to halve magic damage.',
  Besieger: 'Grants Hit +20 when the foe is on favorable terrain.',
  Overtake: 'After defeating a foe, grants Mov +1 (max +3).',
  'Bind Speed': 'Inflicts Spd -3 on adjacent foes.',
  Barrier: 'Grants Res +3 to adjacent allies.',
  'Song of Courage': "Grants Dex/Spd +2 to allies in range until the unit's next phase.",
  "War Master's Strike": 'Multiplies damage by 1.5.',
  Ambush: 'Grants Atk +4 on terrain foes cannot enter.',
  'Sky Hunter': 'If foe is flying, grants Hit +50.',
  'Dropshadow Blade': "Ignores foes' favorable terrain effects.",
  'Resolute Stance': 'Grants Shld +5 during combat while at full HP.',
  Intercept: 'Reduces damage taken by 5.',
  'Fierce Spear': 'Unit cannot suffer a follow-up attack during combat.',
  'Lightning Reflexes':
    "If unit attacks first and AS ≥ foe's AS +10, unit's follow-up comes before the foe's counter.",
  'Bind Resistance': 'Inflicts Res -3 on adjacent foes.',
  'Dominate Magic': 'Foes using magic cannot counter (10% trigger).',
  'Divine Insight': 'Grants Spd +10.',
  'Divine Dance': 'Grants Cha +10.',
  'Divine Might': 'Grants Str +10.',
  'Divine Adornment': 'Grants Res +10.',
  'Divine Will': 'Grants Lck +10.',
  'Divine Wall': 'Grants Def +10.',
  'Divine Dexterity': 'Grants Dex +10.',
  'Divine Law': 'Grants Mag +10.',
};

const WEAPON_WORDS: Readonly<Record<string, string>> = {
  Axe: 'an axe',
  Bow: 'a bow',
  Sword: 'a sword',
  Brawl: 'gauntlets',
  Magic: 'magic',
};

const STAT_WORDS: Readonly<Record<string, string>> = { Hit: 'Hit', Crit: 'Crit', Avo: 'Avo' };

/** Effect text for a class, master, unique or skill ability, or null if no source describes it. */
export function abilityEffect(name: string): string | null {
  if (EFFECTS[name]) return EFFECTS[name];
  const catalog = catalogAbility(name);
  if (catalog) return catalog.effect;

  const arts = /^Combat Arts \+(\d+)$/.exec(name);
  if (arts) return `Unit can equip +${arts[1]} combat arts.`;

  const heal = /^Magic Heal \+(\d+)$/.exec(name);
  if (heal) return `When healing an ally with magic, restores +${heal[1]} HP.`;

  const strikeLast = /^Strike-Last Def \+(\d+)$/.exec(name);
  if (strikeLast) return `If foe attacks first, grants Prt +${strikeLast[1]} during combat.`;

  const weaponBonus = /^(Axe|Bow|Sword|Brawl|Magic) (Hit|Crit|Avo) \+(\d+)$/.exec(name);
  if (weaponBonus) {
    const [, weapon, stat, amount] = weaponBonus;
    return `When equipped with ${WEAPON_WORDS[weapon]}, grants ${STAT_WORDS[stat]} +${amount}.`;
  }
  return null;
}
