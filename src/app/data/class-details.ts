import {
  ClassDetails,
  ClassUnlock,
  ClassWeapon,
  MovementKind,
  Rank,
  SkillRank,
  Stats,
  WeaponType,
} from './models';

/**
 * Weapons, movement, skills, unlock rules and flat stat bonuses per class, from
 * fortunesweave.co.uk's class table and class pages (checked 2026-10-07).
 * No source documents stat caps yet, so every class has `caps: null`.
 */

type StatTuple = [number, number, number, number, number, number, number, number, number];

/** Stats in the app's order: HP, Str, Mag, Spd, Dex, Def, Res, Lck, Cha. */
function stats([hp, str, mag, spd, dex, def, res, lck, cha]: StatTuple): Stats {
  return { hp, str, mag, spd, dex, def, res, lck, cha };
}

const RANK = /\s+(E\+|[EDCBAS])$/;

/** Parses "Sword D, Gauntlet, Axe D" into weapon entries. */
function weapons(list: string): ClassWeapon[] {
  if (!list) return [];
  return list.split(',').map((part) => {
    const text = part.trim();
    const match = RANK.exec(text);
    return {
      type: (match ? text.slice(0, match.index) : text) as WeaponType,
      rank: match ? (match[1] as Rank) : null,
    };
  });
}

/** Parses "Rider D, Bow C" into exam skill requirements. */
function ranks(list: string): SkillRank[] {
  if (!list) return [];
  return list.split(',').map((part) => {
    const text = part.trim();
    const match = RANK.exec(text)!;
    return { skill: text.slice(0, match.index) as SkillRank['skill'], rank: match[1] as Rank };
  });
}

function unlock(
  requires: string,
  level: number | null,
  renown: number | null,
  license: string | null,
  ...notes: string[]
): ClassUnlock {
  return { requires: ranks(requires), level, renown, license, notes };
}

function cls(
  weaponList: string,
  kind: MovementKind,
  range: number | null,
  skills: string[],
  masterSkill: string | null,
  classUnlock: ClassUnlock | null,
  baseBonuses: StatTuple | null,
): ClassDetails {
  return {
    baseBonuses: baseBonuses ? stats(baseBonuses) : null,
    caps: null,
    weapons: weapons(weaponList),
    movement: { kind, range },
    skills,
    masterSkill,
    unlock: classUnlock,
  };
}

const BEGINNER = (requires: string) => unlock(requires, 5, 1, 'Beginner License');
const SPECIALTY = (requires: string, ...notes: string[]) =>
  unlock(requires, 20, 4, 'Specialty License', ...notes);
const ADVANCED = (requires: string, ...notes: string[]) =>
  unlock(requires, 35, 8, 'Advanced License', ...notes);
const MASTER = (requires: string, ...notes: string[]) =>
  unlock(requires, 45, null, 'Master License', 'Master classes open in Part III', ...notes);
const DIVINE = (requires: string, item: string) =>
  unlock(requires, null, null, item, 'One unit at a time: the item is unique');

export const CLASS_DETAILS: Readonly<Record<string, ClassDetails>> = {
  // Starting class
  Commoner: cls('', 'foot', null, [], null, null, null),

  // Base / Beginner
  Gladiator: cls(
    'Sword D, Gauntlet D, Axe D',
    'foot',
    4,
    ['Attack Basics'],
    null,
    BEGINNER(''),
    [1, 1, 0, 0, 0, 0, 0, 0, 0],
  ),
  Hunter: cls(
    'Bow D, Sword D',
    'foot',
    4,
    ['Hunting Basics'],
    null,
    BEGINNER(''),
    [0, 0, 0, 1, 1, 0, 0, 0, 0],
  ),
  Soldier: cls(
    'Spear D, Sword, Axe D',
    'foot',
    4,
    ['Defense Basics'],
    null,
    BEGINNER(''),
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
  ),
  'Ornius Rider': cls(
    'Spear D, Sword, Axe D',
    'mounted',
    5,
    ['Offense Basics', 'Mount/Dismount'],
    null,
    BEGINNER('Rider E+'),
    [0, 0, 0, 3, 1, 0, 0, 1, 0],
  ),
  Diviner: cls(
    'Sword, Gauntlet, Axe, White Magic D, Black Magic D',
    'foot',
    4,
    ['Magic Basics'],
    null,
    BEGINNER(''),
    null,
  ),

  // Specialty
  Myrmidon: cls(
    'Spear, Sword C',
    'foot',
    5,
    ['Combat Arts +1', 'Sword Crit +3'],
    'Ravaging Arts',
    SPECIALTY('Sword C'),
    [1, 0, 0, 2, 0, 0, -1, 0, 0],
  ),
  Brigand: cls(
    'Sword C, Gauntlet, Axe C',
    'foot',
    5,
    ['Combat Arts +1', 'Axe Hit +3'],
    'Regroup',
    SPECIALTY('Axe C, Sword C'),
    null,
  ),
  Pugilist: cls(
    'Gauntlet C',
    'foot',
    5,
    ['Combat Arts +1', 'Brawl Avo +3'],
    'Attack, Get Back',
    SPECIALTY('Gauntlet C'),
    null,
  ),
  Archer: cls(
    'Bow C',
    'foot',
    5,
    ['Combat Arts +1', 'Bow Hit +5'],
    'Crescendo',
    SPECIALTY('Bow C'),
    [0, 0, 0, 2, 2, 1, 0, 0, 0],
  ),
  Rogue: cls(
    'Bow C, Sword C',
    'foot',
    5,
    ['Combat Arts +1', 'Locktouch', 'Search'],
    'In Shadow',
    SPECIALTY('Bow C, Sword C'),
    [0, 0, 0, 3, 1, 0, 1, 1, -1],
  ),
  'Armored Knight': cls(
    'Spear C, Sword, Axe C',
    'armored',
    null,
    ['Strike-Last Def +3', 'Combat Arts +1'],
    'Great Counter',
    SPECIALTY('Heavy E+, Axe C, Spear C'),
    [2, 1, 0, -2, 0, 4, 0, 0, 0],
  ),
  'Light Cavalry': cls(
    'Spear C, Sword C, Axe',
    'mounted',
    6,
    [],
    'Bolster Health',
    SPECIALTY('Rider D, Spear C, Sword C'),
    [1, 1, 0, 1, 0, 2, 0, 0, 1],
  ),
  Charioteer: cls(
    'Bow C',
    'mounted',
    5,
    ['Chariot Armor', 'Charioteer Tactics', "Charioteer's Path"],
    'Charger',
    SPECIALTY('Rider D, Bow C'),
    [3, 1, 0, -2, 3, 3, 0, 0, 1],
  ),
  'Armored Ornius Rider': cls(
    'Spear C, Sword, Axe C',
    'mounted',
    6,
    [],
    'Sense Threat',
    SPECIALTY('Rider D, Axe C, Spear C'),
    [1, 0, 0, 2, 0, 2, 0, 0, 0],
  ),
  'Wing Soldier': cls(
    'Spear C, Sword C',
    'flying',
    6,
    [],
    'Protecting Wings',
    SPECIALTY('Flier D, Spear C, Sword C', 'Female units only'),
    [0, 0, 0, 4, 1, 1, 2, 0, 1],
  ),
  Priest: cls(
    'Gauntlet, Axe, White Magic C, Black Magic',
    'foot',
    5,
    ['White-Magic Seeker', 'Magic Heal +5'],
    'Piety',
    SPECIALTY('White Magic C'),
    [0, 0, 1, 0, 0, 0, 3, 2, 1],
  ),
  Shaman: cls(
    'Sword, Gauntlet, White Magic, Black Magic C',
    'foot',
    5,
    ['Black-Magic Seeker', 'Magic Hit +3'],
    'Bind Dexterity',
    SPECIALTY('Black Magic C'),
    null,
  ),

  // Advanced
  Warrior: cls(
    'Sword B, Gauntlet B, Axe B',
    'foot',
    5,
    ['Combat Arts +2', 'Axe Hit +5', 'Brawl Hit +5'],
    'Practiced Art',
    ADVANCED('Gauntlet B, Axe B, Sword B'),
    null,
  ),
  Shido: cls(
    'Spear, Sword B',
    'foot',
    5,
    ['Combat Arts +2', 'Sword Crit +5'],
    'Ever Vigilant',
    ADVANCED('Sword B'),
    [3, 0, 0, 7, 3, 0, 0, 0, 0],
  ),
  Dancer: cls(
    'Bow B, Sword B',
    'foot',
    5,
    ['Combat Arts +2', 'Dance'],
    'Special Dance',
    ADVANCED(
      'Bow B, Sword B',
      "Leda's route: clear the Part I Chapter 9 sub-quest 'Great Dancer's Successor'",
    ),
    [4, 0, 0, 9, 5, 0, 0, 0, 5],
  ),
  Blacksmith: cls(
    'Axe C, Black Magic D',
    'foot',
    5,
    ['Black-Magic Seeker', 'Axe Hit +5'],
    'Makeshift',
    unlock(
      '',
      null,
      null,
      null,
      "Dietrich's route: do 10 combat art upgrades, then talk to the receptionist at the Temple of Smyrnos",
    ),
    [5, 1, 1, 1, 0, 3, 1, 0, 0],
  ),
  Sniper: cls(
    'Bow B',
    'foot',
    5,
    ['Combat Arts +2', 'Bow Hit +10'],
    'Marksmanship',
    ADVANCED('Bow B'),
    [1, 0, 0, 5, 5, 0, 0, 0, 0],
  ),
  'Forest Knight': cls(
    'Bow B, Sword',
    'mounted',
    6,
    ['Combat Arts +1', 'Bow Hit +5'],
    "Hunter's Eye",
    ADVANCED('Rider D, Bow B'),
    [1, 0, 0, 5, 2, 1, 0, 0, 0],
  ),
  Ranger: cls(
    'Bow B, Sword B',
    'foot',
    5,
    ['Combat Arts +2', 'Locktouch', 'Advanced Search'],
    'Countershot',
    ADVANCED(
      'Bow B, Sword B',
      "Dietrich's route: clear Oko's challenge (Renown 10)",
      "Leda's route: clear the fourth 'new product' tavern show",
    ),
    null,
  ),
  Cataphract: cls(
    'Spear B, Sword, Axe B',
    'mounted',
    5,
    ['Strike-Last Def +3', 'Combat Arts +1'],
    'Pavise',
    ADVANCED(
      'Heavy E+, Rider D, Axe B, Spear B',
      "Theodora's route: clear every battalion boost available up to the start of Chapter 8",
    ),
    null,
  ),
  Guardian: cls(
    'Spear B, White Magic',
    'foot',
    5,
    ['Combat Arts +2', 'Magic Heal +10'],
    'Brace',
    ADVANCED(
      'Spear B',
      "Dietrich's route: clear Il-Lara's challenge (Renown 6)",
      "Theodora's route: clear the Roca battalion boost",
    ),
    [3, 1, 0, 1, 0, 3, 4, 0, 0],
  ),
  'Elephant Rider': cls(
    '',
    'mounted',
    5,
    ['War-Elephant Boots', 'Elephant Tactics'],
    'Elephant Vanguard',
    ADVANCED('Rider C'),
    [10, 2, 0, -5, 3, 7, 0, 0, 3],
  ),
  Dreadnought: cls(
    'Spear B, Axe B',
    'armored',
    4,
    ['Strike-Last Def +5', 'Combat Arts +2'],
    'Focused Counter',
    ADVANCED('Heavy D, Axe B, Spear B'),
    [5, 3, 0, -5, 0, 9, -1, 0, 0],
  ),
  Bardinger: cls(
    'Spear C, Sword B, Axe',
    'mounted',
    6,
    ['Combat Arts +2', 'Mount/Dismount'],
    'Aegis',
    ADVANCED('Rider C, Sword B, Spear C'),
    [3, 0, 0, 1, 0, 1, 0, 0, 3],
  ),
  Dragoon: cls(
    'Spear B, Sword, Axe B',
    'flying',
    6,
    ['Combat Arts +1'],
    'Besieger',
    ADVANCED(
      'Flier C, Axe B, Spear B',
      "Cai's route: clear Aurora's training request (Renown 8)",
      "Theodora's route: clear the Rilfish battalion boost",
    ),
    [2, 1, 0, 3, 1, 1, 0, 0, 0],
  ),
  Caladrius: cls(
    'Spear, Sword, Axe, Black Magic B',
    'mounted',
    null,
    ['Black-Magic Seeker', 'Combat Arts +1'],
    'Overtake',
    ADVANCED('Rider D, Black Magic B', "Cai's route: clear Castor's training request (Renown 7)"),
    [2, 0, 1, 3, 0, 1, 2, 0, 0],
  ),
  Ovate: cls(
    'Sword, Gauntlet, White Magic, Black Magic B',
    'foot',
    5,
    ['Black-Magic Seeker', 'Magic Hit +5'],
    'Bind Speed',
    ADVANCED('Black Magic B'),
    null,
  ),
  Bishop: cls(
    'Gauntlet, Axe, White Magic B, Black Magic',
    'foot',
    5,
    ['White-Magic Seeker', 'Magic Heal +10'],
    'Barrier',
    ADVANCED('White Magic B'),
    null,
  ),
  Troubadour: cls(
    'White Magic B, Black Magic B',
    'mounted',
    6,
    ['Magic Hit +3', 'Magic Heal +5'],
    'Song of Courage',
    ADVANCED(
      'Rider D, White Magic B, Black Magic B',
      "Cai's route: clear Bertrand's training request (Renown 10)",
      "Leda's route: clear the fourth 'new product' tavern show",
    ),
    [0, 0, 1, 1, 1, 1, 2, 0, 3],
  ),

  // Master
  Swordmaster: cls(
    'Spear, Sword A',
    'foot',
    5,
    ['Combat Arts +3', 'Sword Crit +7'],
    null,
    MASTER('Sword A', 'Restore the associated temple in Part III, then clear its follow-up quest'),
    [5, 2, 0, 7, 7, 0, 0, 0, 0],
  ),
  'High Savant': cls(
    'Sword B, Black Magic D',
    'mounted',
    7,
    ['Combat Arts +2', 'Black-Magic Seeker'],
    null,
    MASTER('Rider D, Black Magic D, Sword B'),
    [5, 2, 2, 3, 3, 2, 0, 0, 0],
  ),
  Battlemaster: cls(
    'Sword A, Gauntlet A, Axe A',
    'foot',
    5,
    ['Combat Arts +3', 'Axe Hit +7', 'Brawl Hit +7'],
    "War Master's Strike",
    MASTER('Gauntlet A, Axe A, Sword A'),
    [13, 6, 0, 2, 0, 4, 0, 0, 0],
  ),
  'War Monk': cls(
    'Gauntlet B, White Magic D',
    'foot',
    5,
    ['White-Magic Seeker', 'Combat Arts +3'],
    null,
    MASTER('White Magic D, Gauntlet B'),
    [5, 2, 0, 5, 2, 2, 4, 0, 0],
  ),
  'Bow Adept': cls(
    'Bow A',
    'foot',
    5,
    ['Combat Arts +3', 'Bow Hit +15'],
    'Sky Hunter',
    MASTER('Bow A'),
    [4, 2, 0, 5, 9, 0, 0, 0, 0],
  ),
  'Bow Knight': cls(
    'Bow A, Sword',
    'mounted',
    7,
    ['Combat Arts +2', 'Bow Hit +10'],
    null,
    MASTER('Rider D, Bow A'),
    null,
  ),
  'Shadow Seeker': cls(
    'Bow A, Sword A',
    'foot',
    5,
    ['Locktouch', 'Combat Arts +3', 'Master Search'],
    'Dropshadow Blade',
    MASTER('Bow A, Sword A'),
    [4, 0, 0, 9, 7, 0, 0, 2, -2],
  ),
  Sentinel: cls(
    'Spear A, White Magic',
    'foot',
    5,
    ['White-Magic Seeker', 'Magic Heal +10', 'Combat Arts +3'],
    'Resolute Stance',
    MASTER('Spear A'),
    [5, 4, 0, 2, 4, 4, 5, 0, 0],
  ),
  'Castle Knight': cls(
    'Spear A, Axe A',
    'armored',
    4,
    ['Combat Arts +3', 'Strike-Last Def +7'],
    'Intercept',
    MASTER('Heavy C, Axe A, Spear A'),
    [9, 6, 0, -6, 4, 13, -2, 0, 0],
  ),
  Orichaldia: cls(
    'Spear A, Sword A, Axe',
    'mounted',
    7,
    ['Combat Arts +3', 'Mount/Dismount'],
    'Fierce Spear',
    MASTER('Rider B, Spear A, Sword A'),
    [7, 3, 0, 2, 3, 2, 0, 0, 2],
  ),
  'Great Knight': cls(
    'Spear A, Sword, Axe A',
    'mounted',
    6,
    ['Combat Arts +2', 'Mount/Dismount'],
    null,
    MASTER('Heavy D, Rider D, Axe A, Spear A'),
    null,
  ),
  'Celestial Trooper': cls(
    'Spear A, Sword A',
    'flying',
    7,
    ['Combat Arts +1', 'Flying Avo +7'],
    'Lightning Reflexes',
    MASTER('Flier C, Spear A, Sword A'),
    null,
  ),
  'Bau Lord': cls(
    'Spear A, Sword, Axe A',
    'flying',
    7,
    ['Combat Arts +2'],
    'Ambush',
    MASTER('Flier C, Axe A, Spear A'),
    [5, 2, 0, 3, 3, 3, 0, 0, 0],
  ),
  Druid: cls(
    'Sword, Gauntlet, Black Magic A',
    'foot',
    5,
    ['Black-Magic Seeker', 'Magic Hit +7'],
    'Bind Resistance',
    MASTER('Black Magic A'),
    null,
  ),
  Wiseman: cls(
    'Gauntlet, Axe, White Magic A',
    'foot',
    5,
    ['White-Magic Seeker', 'Magic Heal +15'],
    'Dominate Magic',
    MASTER('White Magic A'),
    null,
  ),
  Valkyrium: cls(
    'White Magic A, Black Magic A',
    'mounted',
    7,
    ['Magic Heal +10'],
    null,
    MASTER('Rider D, White Magic A, Black Magic A'),
    [2, 0, 2, 2, 3, 2, 3, 0, 2],
  ),

  // Divine
  'The Blade': cls(
    'Spear, Sword',
    'foot',
    6,
    ['Combat Arts +3', 'Sword Crit +10'],
    'Divine Insight',
    DIVINE('Sword S', 'Demonic Swordguard'),
    [7, 4, 4, 7, 7, 0, 0, 0, 2],
  ),
  'The Apsara': cls(
    'Bow, Sword',
    'foot',
    6,
    ['Combat Arts +3', 'Dance'],
    'Divine Dance',
    DIVINE('Bow C, Sword A', "Muses' Necklace"),
    [5, 2, 4, 7, 5, 0, 0, 0, 9],
  ),
  'The Eternal': cls(
    'Sword, Gauntlet, Axe',
    'foot',
    6,
    ['Combat Arts +3', 'Axe Hit +10', 'Brawl Hit +10'],
    'Divine Might',
    DIVINE('Gauntlet S, Axe S, Sword S', 'Scales of Judgement'),
    [12, 6, 0, 2, 1, 5, 0, 0, 2],
  ),
  'The Godhand': cls(
    'Gauntlet, White Magic',
    'foot',
    6,
    ['Combat Arts +3', 'Brawl Avo +10', 'White-Magic Zenith'],
    'Divine Adornment',
    DIVINE('White Magic C, Gauntlet S', "Emperor's Sash"),
    [7, 4, 4, 5, 2, 4, 5, 0, 2],
  ),
  'The Calamity': cls(
    'Bow, Sword',
    'foot',
    6,
    ['Locktouch', 'Combat Arts +3', 'Ultimate Search'],
    'Divine Will',
    DIVINE('Bow S, Sword S', 'Crystal of Darkness'),
    [5, 2, 4, 7, 5, 0, 4, 4, 0],
  ),
  'The Trident': cls(
    'Spear, White Magic',
    'foot',
    6,
    ['Magic Heal +10', 'Combat Arts +3', 'White-Magic Zenith'],
    'Divine Wall',
    DIVINE('Spear S', 'Trident'),
    [7, 4, 4, 2, 4, 5, 5, 0, 2],
  ),
  'The Cavalier': cls(
    'Spear, Sword, Axe',
    'mounted',
    8,
    ['Mount/Dismount', 'Combat Arts +3', 'Golden Ride'],
    'Divine Dexterity',
    DIVINE('Rider A, Axe S, Spear S, Sword S', 'Divinium Saddle'),
    [11, 3, 0, 4, 5, 5, 1, 0, 2],
  ),
  'The Avatar': cls(
    'Sword, Gauntlet, Axe, White Magic, Black Magic',
    'foot',
    6,
    ['Magic Hit +10', 'Magic Heal +20', 'All-Magic Zenith'],
    'Divine Law',
    DIVINE('White Magic S, Black Magic S', 'Lotus of Reincarnation'),
    [5, 0, 9, 2, 2, 0, 9, 5, 2],
  ),
};
