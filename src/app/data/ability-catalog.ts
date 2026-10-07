/**
 * Abilities a unit can pick up outside the class route, from fortunesweave.co.uk's
 * abilities list (checked 2026-10-07). Effects are as the site words them.
 */
export interface CatalogAbility {
  name: string;
  effect: string;
  /** How it's gained, as the site describes it, when it says. */
  gainedBy?: string;
  /** Level the unit gains it at, when the site gives one. */
  level?: number;
}

export interface UniqueAbility extends CatalogAbility {
  /** Units that have it. */
  units: readonly string[];
}

const upgrade = (unit: string, level: number, name: string, effect: string): UniqueAbility => ({
  name,
  effect,
  units: [unit],
  level,
  gainedBy: `Personal ability upgrade at Lv ${level}`,
});
const upgradeAnyLevel = (unit: string, name: string, effect: string): UniqueAbility => ({
  name,
  effect,
  units: [unit],
  gainedBy: 'Personal ability upgrade (level not documented)',
});
const crest = (units: string[], name: string, effect: string): UniqueAbility => ({
  name,
  effect,
  units,
  gainedBy: 'Diadem (crest)',
});

/** Personal ability upgrades and Diadem abilities, each tied to particular units. */
export const UNIQUE_ABILITIES: readonly UniqueAbility[] = [
  upgrade(
    'Lysander',
    20,
    'Accelerate',
    'After defeating a foe, grants Spd +1 until the end of the map. (Max +10)',
  ),
  upgrade(
    'Lysander',
    35,
    'Accelerate+',
    'After defeating a foe, grants Spd +2 until the end of the map. (Max +10)',
  ),
  upgrade(
    'Bonaventure',
    20,
    'Additional Intel',
    'Grants Hit +10 to adjacent allies during their combats. Trigger % = 30.',
  ),
  upgrade(
    'Bonaventure',
    35,
    'Additional Intel+',
    'Grants Hit +20 to adjacent allies during their combats. Trigger % = 30.',
  ),
  upgrade(
    'Tobias',
    20,
    'All-Out Attack',
    'Multiplies damage by 1.3 when attacking with a combat art. Trigger % = 30.',
  ),
  upgrade(
    'Tobias',
    35,
    'All-Out Attack+',
    'Multiplies damage by 1.5 when attacking with a combat art. Trigger % = 30.',
  ),
  upgrade(
    'Olympia',
    20,
    'Ardent Nosferatu',
    'When using Nosferatu, grants Atk +3, Crit +5 during combat.',
  ),
  upgrade(
    'Olympia',
    35,
    'Ardent Nosferatu+',
    'When using Nosferatu, grants Atk +5, Crit +10 during combat.',
  ),
  upgrade(
    'Nydine',
    20,
    'At a Gallop',
    '(Cavalry) Applies -1 to movement cost for terrain (cannot be reduced below 1).',
  ),
  upgrade(
    'Nydine',
    35,
    'At a Gallop+',
    '(Cavalry) Applies -2 to movement cost for terrain (cannot be reduced below 1).',
  ),
  upgrade(
    'Noctula',
    20,
    'Attuned',
    "When Warrior's Clarity triggers, grants Avo +10 until unit's next phase. Trigger % = 10.",
  ),
  upgrade(
    'Noctula',
    35,
    'Attuned+',
    "When Warrior's Clarity triggers, grants Avo +10 until unit's next phase. Trigger % = 20.",
  ),
  upgrade(
    'Dietrich',
    5,
    'Bestial Impulse',
    'After combat, grants Crit +2 until the unit lands a critical.',
  ),
  upgradeAnyLevel(
    'Talimun',
    'Cannoning Flair',
    'When using artillery, grants Hit +30 during combat.',
  ),
  upgrade(
    'Benditz',
    20,
    'Chariot Stagger',
    'If unit is a charioteer, grants +1 uses to staggering blows.',
  ),
  upgrade(
    'Benditz',
    35,
    'Chariot Stagger+',
    'If unit is a charioteer, grants +2 uses to staggering blows.',
  ),
  upgradeAnyLevel('Anatolia', 'Continuum', 'When unit avoids an attack, restores 5 HP to unit.'),
  upgrade('Anatolia', 35, 'Continuum+', 'When unit avoids an attack, restores 10 HP to unit.'),
  upgrade('Peter', 20, 'Correct for Drift', "If unit's hit % ≥ 90, grants Hit +10 during combat."),
  upgrade('Peter', 35, 'Correct for Drift+', "If unit's hit % ≥ 75, grants Hit +20 during combat."),
  upgrade('Fabio', 20, 'Dark Secrets', 'Extends the range of Dark Calling.'),
  upgrade('Fabio', 35, 'Dark Secrets+', 'Extends the range of Dark Calling to 3 spaces.'),
  upgrade(
    'Simon',
    20,
    "Devil's Luck",
    'After defeating a foe, grants Lck +1 until the end of the map. (Max +10)',
  ),
  upgrade(
    'Simon',
    35,
    "Devil's Luck+",
    'After defeating a foe, grants Lck +2 until the end of the map. (Max +10)',
  ),
  upgrade(
    'Theodora',
    5,
    'Direct Hit',
    'Deals +10 damage when attacking with Blaze Arts. Trigger % = 30.',
  ),
  upgrade('Sofia', 20, 'Distant Healing', 'Grants Rng +1 to healing magic.'),
  upgrade('Sofia', 35, 'Distant Healing+', 'Grants Rng +2 to healing magic.'),
  upgrade(
    'Dante',
    20,
    'Dramatic Effect',
    'When Stage Directions triggers, grants Hit +10 to target allies.',
  ),
  upgrade(
    'Dante',
    35,
    'Dramatic Effect+',
    'When Stage Directions triggers, grants Hit/Crit +10 to target allies.',
  ),
  upgrade(
    'Majide',
    20,
    'Fear Nothing',
    'If unit attacks first, grants Atk +3 at the cost of Avo -30 during combat.',
  ),
  upgrade(
    'Majide',
    35,
    'Fear Nothing+',
    'If unit attacks first, grants Atk +6 at the cost of Avo -30 during combat.',
  ),
  upgrade(
    'Cai',
    5,
    'Flamekeeper',
    'Unit and all allies are unaffected by Underworld Flames and take half damage from attacks.',
  ),
  upgrade('Gaitz', 20, 'Flashing Fang', 'Grants Atk +4, Hit +50 when attacking. Trigger % = 20.'),
  upgrade('Gaitz', 35, 'Flashing Fang+', 'Grants Atk +7, Hit +100 when attacking. Trigger % = 20.'),
  upgrade(
    'Jester',
    20,
    'Flickering Edge',
    'When unit avoids an attack, grants Atk +3 during combat.',
  ),
  upgrade(
    'Jester',
    35,
    'Flickering Edge+',
    'When unit avoids an attack, grants Atk +5 during combat.',
  ),
  upgrade(
    'Dadao',
    20,
    'Full Strength',
    'Multiplies damage by 1.3 when attacking. Trigger % = Str ÷ 2.',
  ),
  upgrade(
    'Dadao',
    35,
    'Full Strength+',
    'Multiplies damage by 1.5 when attacking. Trigger % = Str ÷ 2.',
  ),
  upgrade(
    'Fianna',
    20,
    'Gift of Faith',
    'When healing an ally with magic, restores +20 HP. Trigger % = Lck.',
  ),
  upgrade(
    'Fianna',
    35,
    'Gift of Faith+',
    'When healing an ally with magic, restores +30 HP. Trigger % = Lck.',
  ),
  upgradeAnyLevel(
    'Bertrand',
    'Go No Sen',
    "In enemy's phase, unit attacks first during combat. Trigger % = 25.",
  ),
  upgrade(
    'Halvin',
    20,
    'Halt Advance',
    'After combat, if unit attacked first, inflicts Spd -2 on foe through their next combat.',
  ),
  upgrade(
    'Halvin',
    35,
    'Halt Advance+',
    'After combat, if unit attacked first, inflicts Spd -3 on foe through their next combat.',
  ),
  upgradeAnyLevel(
    'Orchel',
    'Harmonic Soul',
    'When healing an ally with magic, restores a little HP to unit.',
  ),
  upgrade('Leda', 35, 'Improviso', 'After using Blaze Arts during Overblaze, unit can attack.'),
  upgrade(
    'Peppe',
    20,
    "King's Majesty",
    'If foe is damaged, grants Atk +2, Crit +5 during combat.',
  ),
  upgrade(
    'Peppe',
    35,
    "King's Majesty+",
    'If foe is damaged, grants Atk +4, Crit +10 during combat.',
  ),
  upgrade('Kiroc', 20, 'Menace', "Halves foes' Ddg during combat. Trigger % = 10."),
  upgrade('Kiroc', 35, 'Menace+', "Halves foes' Ddg during combat. Trigger % = 20."),
  upgrade(
    'Io',
    20,
    'Mounted Push',
    '(Cavalry) If unit attacks first, grants Hit +10 during combat.',
  ),
  upgrade(
    'Io',
    35,
    'Mounted Push+',
    '(Cavalry) If unit attacks first, grants Hit +10, Atk +3 during combat.',
  ),
  upgrade(
    'Nezha',
    20,
    'Never Stop',
    'Grants Atk +5 when attacking after Quick Draw triggers. Trigger % = 30.',
  ),
  upgrade(
    'Nezha',
    35,
    'Never Stop+',
    'Grants Atk +5 when attacking after Quick Draw triggers. Trigger % = 50.',
  ),
  upgrade('Diego', 20, 'No Mercy', 'Grants Hit/Crit +5 when making a follow-up.'),
  upgrade('Diego', 35, 'No Mercy+', 'Grants Hit/Crit +10 when making a follow-up.'),
  upgrade('Seteth', 20, 'Pass Judgement', 'When Diadem of Balance triggers, grants Atk +4.'),
  upgrade('Seteth', 35, 'Pass Judgement+', 'When Diadem of Balance triggers, grants Atk +7.'),
  upgrade('Loretta', 20, 'Peak Form', "If unit's HP = 100%, grants Atk +3 during combat."),
  upgrade(
    'Loretta',
    35,
    'Peak Form+',
    "If unit's HP = 100%, grants Atk +3, Avo +10 during combat.",
  ),
  upgrade('Ludia', 20, 'Perception', 'If unit can make a follow-up, grants Avo +10 during combat.'),
  upgrade(
    'Ludia',
    35,
    'Perception+',
    'If unit can make a follow-up, grants Avo +20 during combat.',
  ),
  upgrade('Inyoni', 20, 'Pierce', 'Grants Atk +2, Crit +5 when attacking with a bow combat art.'),
  upgrade('Inyoni', 35, 'Pierce+', 'Grants Atk +4, Crit +10 when attacking with a bow combat art.'),
  upgrade('Goliath', 20, 'Pin Down', 'Inflicts Mov -3 on adjacent foes.'),
  upgrade('Goliath', 35, 'Pin Down+', 'Inflicts Mov -5 on adjacent foes.'),
  upgrade('Ultand', 20, 'Pray for Safety', 'Grants Ddg +10 to adjacent allies.'),
  upgrade('Ultand', 35, 'Pray for Safety+', 'Grants Ddg +20 to adjacent allies.'),
  upgrade(
    'Nuzzuo',
    20,
    'Precision Strike',
    'If unit is effective against foe, grants Hit +10 during combat.',
  ),
  upgrade(
    'Nuzzuo',
    35,
    'Precision Strike+',
    'If unit is effective against foe, grants Hit +20 during combat.',
  ),
  upgradeAnyLevel(
    'Orchel',
    'Predictive Sense',
    'If unit attacks first, grants Hit +20 to magic during combat.',
  ),
  upgrade('Jasmine', 20, 'Raging Counter', 'If foe attacks first, grants Atk +3 during combat.'),
  upgrade(
    'Jasmine',
    35,
    'Raging Counter+',
    'If foe attacks first, grants Atk +3, Crit +10 during combat.',
  ),
  upgrade('Mikaela', 20, "Redblade's Will", 'Grants Atk +3 during combat against an adjacent foe.'),
  upgrade(
    'Mikaela',
    35,
    "Redblade's Will+",
    'Grants Atk +3 during combat against an adjacent foe, and Atk +3 when attacking an adjacent foe (Trigger % = 30).',
  ),
  upgrade(
    'Buccar',
    20,
    'Retaliatory Blow',
    "If foe attacks first, multiplies unit's damage by 1.3 when attacking. Trigger % = 5.",
  ),
  upgrade(
    'Buccar',
    35,
    'Retaliatory Blow+',
    "If foe attacks first, multiplies unit's damage by 1.3 when attacking. Trigger % = 10.",
  ),
  upgrade(
    'Yang Jie',
    20,
    'Robust Health',
    "Grants Shld +3 when attacked. Trigger % = unit's remaining HP.",
  ),
  upgrade(
    'Yang Jie',
    35,
    'Robust Health+',
    "Grants Shld +5 when attacked. Trigger % = unit's remaining HP.",
  ),
  upgradeAnyLevel(
    'Eshmel',
    'Scorching Sun',
    'Reduces damage done by undead foes to 0. Trigger % = 5.',
  ),
  upgrade(
    'Ursula',
    20,
    'Seize the Chance',
    'Multiplies damage by 1.3 when attacking. Trigger % = Lck ÷ 2.',
  ),
  upgrade(
    'Ursula',
    35,
    'Seize the Chance+',
    'Multiplies damage by 1.5 when attacking. Trigger % = Lck ÷ 2.',
  ),
  upgradeAnyLevel(
    'Bertrand',
    'Sen No Sen',
    "If unit attacks first, unit's follow-up comes before the foe's counter. Trigger % = 25.",
  ),
  upgrade('Alexandra', 20, 'Soar', 'If unit is on inaccessible terrain, grants AS +3.'),
  upgrade('Alexandra', 35, 'Soar+', 'If unit is on inaccessible terrain, grants AS +5.'),
  upgrade('Ninae', 20, "Spirits' Guidance", "Grants Spirits' Voices to adjacent allies."),
  upgrade('Ninae', 35, "Spirits' Guidance+", "Grants Spirits' Voices to allies within 2 spaces."),
  upgrade('Talimun', 35, "Swashbuckler's Luck+", 'Grants Lck +5 to unit and all allies.'),
  upgrade(
    'Tialla',
    20,
    "Tactician's Insight",
    'After combat, if unit attacked first, inflicts Avo -5 on foe through their next combat.',
  ),
  upgrade(
    'Tialla',
    35,
    "Tactician's Insight+",
    'After combat, if unit attacked first, inflicts Avo -10 on foe through their next combat.',
  ),
  upgrade(
    'Esmeralda',
    20,
    'Throwing Arm',
    'If throwing a spear, grants Hit +10, Atk +2 during combat.',
  ),
  upgrade(
    'Esmeralda',
    35,
    'Throwing Arm+',
    'If throwing a spear, grants Hit +20, Atk +4 during combat.',
  ),
  upgrade('Guzran', 20, 'Top Form', 'Changes the effect of Hot-Headed to grant +15.'),
  upgrade('Guzran', 35, 'Top Form+', 'Changes the effect of Hot-Headed to grant +20.'),
  upgradeAnyLevel(
    'Theodora',
    'Unstoppable Force',
    'Multiplies damage by 3 when attacking obstacles.',
  ),
  upgrade('Lilian', 20, 'Upper Hand', "If unit's hit % = 100, grants Atk +3 when attacking."),
  upgrade('Lilian', 35, 'Upper Hand+', "If unit's hit % = 100, grants Atk +5 when attacking."),
  upgrade('Zarcone', 20, 'Vulgar Conduct', "If foe's HP ≤ 50%, grants Hit +20 during combat."),
  upgrade(
    'Zarcone',
    35,
    'Vulgar Conduct+',
    "If foe's HP ≤ 50%, grants Hit +20, Atk +3 during combat.",
  ),
  upgrade('Mu', 20, "Warrior's Blood", 'Grants a stat increase based on equipped weapon type.'),
  upgrade(
    'Mu',
    35,
    "Warrior's Blood+",
    'Grants a large stat increase based on equipped weapon type.',
  ),
  upgrade('Sha Lan', 20, 'Watchfulness', 'Grants Spd +2 to adjacent allies.'),
  upgrade('Sha Lan', 35, 'Watchfulness+', 'Grants Spd +4 to adjacent allies.'),
  upgrade('Catania', 20, 'Wind My Friend', "If AS ≥ foe's AS +5, grants Atk +3 during combat."),
  upgrade(
    'Catania',
    35,
    'Wind My Friend+',
    "If AS ≥ foe's AS +5, grants Atk +3, and if AS ≥ foe's AS +8, grants Avo +20.",
  ),
  upgrade(
    'Sirocco',
    20,
    "Wind's Caprice",
    'Grants one of Avo +1, Avo +5 or Avo +20 during combat.',
  ),
  upgrade(
    'Sirocco',
    35,
    "Wind's Caprice+",
    'Grants one of Avo +1, Avo +5, Avo +20 or Avo +30 during combat.',
  ),
  upgradeAnyLevel(
    'Talimun',
    'Winds of Victory',
    'Grants Hit +15 when attacking and Avo +15 when attacked. Trigger % = Lck.',
  ),

  crest(['Seteth'], 'Diadem of Balance', 'Unit cannot be countered. Trigger % = 3.'),
  crest(
    ['Cai', 'Theodora', 'Bertrand', 'Talimun', 'Orchel'],
    'Diadem of Duality',
    'Grants Atk +3 when attacking. Trigger % = 25.',
  ),
  crest(['Ursula'], 'Diadem of Fetters', 'Multiplies damage by 1.2 when attacking. Trigger % = 5.'),
  crest(['Ninae'], 'Diadem of Reflection', 'Grants Hit +30 when attacking. Trigger % = 10.'),
  crest(
    ['Fianna'],
    'Diadem of Revival',
    'Restores a little HP to unit when attacking. Trigger % = 20.',
  ),
  crest(
    ['Cai', 'Orchel'],
    'Diadem of the Apostle',
    'Grants Hit +20 when attacking. Trigger % = 20.',
  ),
  crest(['Eshmel'], 'Diadem of the Auger', 'Grants Hit +100 when attacking. Trigger % = 5.'),
  crest(['Leda', 'Aswan'], 'Diadem of the Earth', 'Grants Atk +7 when attacking. Trigger % = 3.'),
  crest(
    ['Dietrich'],
    'Diadem of the Endless',
    'Restores some HP to unit when attacking. Trigger % = 10.',
  ),
  crest(['Bertrand'], 'Diadem of the Victor', 'Grants Atk +5 when attacking. Trigger % = 10.'),
  crest(
    ['Esmeralda'],
    'Diadem of Valor',
    'Multiplies damage by 1.5 when attacking. Trigger % = 3.',
  ),
];

const rank = (name: string, effect: string, gainedBy?: string): CatalogAbility => ({
  name,
  effect,
  gainedBy: gainedBy ?? 'Weapon or skill rank (rank not documented)',
});
const bond = (name: string, effect: string, gainedBy?: string): CatalogAbility => ({
  name,
  effect,
  gainedBy: gainedBy ?? 'Mount bond (level not documented)',
});

/** Abilities any unit can learn from weapon or skill ranks and mount bonds. */
export const SKILL_ABILITIES: readonly CatalogAbility[] = [
  rank('Axes Lv. 1', 'When equipped with an axe, grants Hit +3.'),
  rank('Axes Lv. 2', 'When equipped with an axe, grants Hit +5.'),
  rank('Axes Lv. 3', 'When equipped with an axe, grants Hit/Avo +5.'),
  rank('Axes Lv. 4', 'When equipped with an axe, grants Hit/Avo +7.'),
  rank(
    'Black Magic Lv. 1',
    'When equipped with black magic, grants Hit +3.',
    'Black Magic rank D+',
  ),
  rank('Black Magic Lv. 2', 'When equipped with black magic, grants Hit +5.'),
  rank('Black Magic Lv. 3', 'When equipped with black magic, grants Hit/Avo +5.'),
  rank('Black Magic Lv. 4', 'When equipped with black magic, grants Hit/Avo +7.'),
  rank('Black Magic Lv. 5', 'When equipped with black magic, grants Hit/Avo +10.'),
  rank('Bows Lv. 1', 'When equipped with a bow, grants Hit +3.', 'Bow rank D+'),
  rank('Bows Lv. 2', 'When equipped with a bow, grants Hit +5.', 'Bow rank C+'),
  rank('Bows Lv. 3', 'When equipped with a bow, grants Hit/Avo +5.'),
  rank('Fists Lv. 1', 'When equipped with gauntlets, grants Hit +3.', 'Gauntlet rank D+'),
  rank('Fists Lv. 2', 'When equipped with gauntlets, grants Hit +5.'),
  rank('Fists Lv. 5', 'When equipped with gauntlets, grants Hit/Avo +10.'),
  rank('Spears Lv. 1', 'When equipped with a spear, grants Hit +3.', 'Spear rank D+'),
  rank('Spears Lv. 2', 'When equipped with a spear, grants Hit +5.', 'Spear rank C+'),
  rank('Spears Lv. 3', 'When equipped with a spear, grants Hit/Avo +5.'),
  rank('Spears Lv. 5', 'When equipped with a spear, grants Hit/Avo +10.'),
  rank('Swords Lv. 1', 'When equipped with a sword, grants Hit +3.', 'Sword rank D+'),
  rank('Swords Lv. 2', 'When equipped with a sword, grants Hit +5.'),
  rank('Swords Lv. 3', 'When equipped with a sword, grants Hit/Avo +5.', 'Sword rank C+'),
  rank('White Magic Lv. 1', 'When equipped with white magic, grants Hit +3.'),
  rank('White Magic Lv. 2', 'When equipped with white magic, grants Hit +5.'),
  rank('White Magic Lv. 3', 'When equipped with white magic, grants Hit/Avo +5.'),
  rank('White Magic Lv. 5', 'When equipped with white magic, grants Hit/Avo +10.'),
  rank('Avoid Fatality', '(Infantry) Grants Ddg +10.'),
  rank('Close Quarters', '(Infantry) Inflicts Mov -1 on adjacent foes.'),
  rank('Evasion', '(Infantry) Grants Avo +100 when attacked. Trigger % = 3.'),
  rank('Knightly Senses', 'If foe uses a spear, grants Avo +10 during combat.'),
  rank('Read the Winds', 'If foe uses a bow, grants Avo +10 during combat.'),
  rank('Rein', 'Inflicts Avo -3 on adjacent foes.', 'Authority rank D'),
  rank('Steady Shot', '(Infantry) When equipped with a bow or magic, grants Hit +5.'),
  bond('Flitting Flier', '(Flying) If unit attacks first, grants AS +2 during combat.'),
  bond('Paired Bulk', '(Cavalry) Grants Bld +2.', 'Meganius bond Lv. 3'),
  bond('Paired Run', '(Cavalry) Grants Mov +1.', 'Wild Ornius bond Lv. 3'),
  bond(
    'Paired Stealth+',
    '(Cavalry) If unit is on favorable terrain, grants Avo +10, Shld +3 during combat.',
    'Wild Ornius bond Lv. 5',
  ),
  bond('Paired Streak', 'Grants Mov +1.', 'Bucephalus bond Lv. 3'),
  bond('Vanguard', '(Cavalry) If unit attacks first, grants Shld +2 during combat.'),
];

const BY_NAME = new Map<string, CatalogAbility>(
  [...UNIQUE_ABILITIES, ...SKILL_ABILITIES].map((a) => [a.name, a]),
);

export function catalogAbility(name: string): CatalogAbility | undefined {
  return BY_NAME.get(name);
}

export function uniqueAbilitiesFor(unit: string): UniqueAbility[] {
  return UNIQUE_ABILITIES.filter((a) => a.units.includes(unit));
}
