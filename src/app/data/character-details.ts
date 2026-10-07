import { CharacterDetails } from './models';

/**
 * Personal abilities, skill aptitudes, starting classes and join stats, from
 * fortunesweave.co.uk character pages (checked 2026-10-07). Join stats are listed only
 * where the page documents them; join levels aren't documented anywhere yet.
 */
export const CHARACTER_DETAILS: Readonly<Record<string, CharacterDetails>> = {
  Cai: {
    personalAbility: { name: 'Brio', effect: 'Grants Mov +1.' },
    strengths: ['White Magic', 'Rider', 'Spear', 'Sword'],
    weaknesses: ['Bow', 'Flier'],
    startingClass: 'Commoner',
    bases: { hp: 27, str: 10, mag: 7, spd: 8, dex: 8, def: 6, res: 5, lck: 6, cha: 5 },
  },
  Tialla: {
    personalAbility: {
      name: "Tactician's Wit",
      effect: 'Grants Rng +1 to combat arts usable on allies.',
    },
    strengths: ['Authority', 'White Magic', 'Black Magic'],
    weaknesses: ['Sword'],
    startingClass: 'Commoner',
    bases: { hp: 24, str: 5, mag: 8, spd: 6, dex: 6, def: 4, res: 6, lck: 7, cha: 5 },
  },
  Peter: {
    personalAbility: {
      name: 'Steady Aim',
      effect: 'Grants Rng +1 when attacking with a bow combat art.',
    },
    strengths: ['Bow', 'Infantry'],
    weaknesses: ['Heavy'],
    startingClass: 'Commoner',
    bases: { hp: 25, str: 9, mag: 3, spd: 6, dex: 10, def: 5, res: 4, lck: 5, cha: 4 },
  },
  Ultand: {
    personalAbility: {
      name: 'Patch Up',
      effect: "After an adjacent ally's combat, restores a little HP to that ally.",
    },
    strengths: ['White Magic', 'Flier', 'Spear'],
    weaknesses: ['Sword'],
    startingClass: null,
    bases: { hp: 26, str: 8, mag: 11, spd: 7, dex: 7, def: 7, res: 7, lck: 10, cha: 11 },
  },
  Dietrich: {
    personalAbility: {
      name: 'Murderous Intent',
      effect: 'If unit attacks first, grants Crit +5 during combat.',
    },
    strengths: ['Infantry', 'Sword'],
    weaknesses: ['White Magic'],
    startingClass: null,
    bases: null,
  },
  Fabio: {
    personalAbility: { name: 'Dark Calling', effect: 'Inflicts Ddg -5 on adjacent foes.' },
    strengths: ['Authority', 'Black Magic'],
    weaknesses: ['Bow'],
    startingClass: 'Commoner',
    bases: { hp: 25, str: 6, mag: 10, spd: 7, dex: 6, def: 4, res: 8, lck: 6, cha: 5 },
  },
  Esmeralda: {
    personalAbility: { name: 'Brawn', effect: "Reduces the Wt of the unit's equipment to 80%." },
    strengths: ['Axe', 'Heavy', 'Spear'],
    weaknesses: ['Black Magic', 'Sword'],
    startingClass: null,
    bases: null,
  },
  Mikaela: {
    personalAbility: {
      name: "Veteran's Mettle",
      effect: 'Grants Hit +10 during combat against an adjacent foe.',
    },
    strengths: ['Axe', 'Bow', 'Infantry'],
    weaknesses: ['White Magic', 'Flier', 'Black Magic', 'Rider'],
    startingClass: null,
    bases: null,
  },
  Theodora: {
    personalAbility: {
      name: 'Royal Resolve',
      effect: 'Unit takes half damage when attacked. Trigger % = 30.',
    },
    strengths: ['Authority', 'White Magic', 'Spear'],
    weaknesses: ['Black Magic'],
    startingClass: null,
    bases: null,
  },
  Bonaventure: {
    personalAbility: { name: 'Sage Advice', effect: 'Grants Dex +3 to adjacent allies.' },
    strengths: [],
    weaknesses: [],
    startingClass: null,
    bases: { hp: 26, str: 8, mag: 12, spd: 9, dex: 10, def: 7, res: 10, lck: 6, cha: 9 },
  },
  Lysander: {
    personalAbility: {
      name: 'Racing Attack',
      effect: 'If unit attacks first, grants Avo +15 during combat.',
    },
    strengths: ['Axe', 'Flier', 'Rider', 'Spear'],
    weaknesses: ['Brawling', 'Heavy', 'Sword'],
    startingClass: null,
    bases: null,
  },
  Lilian: {
    personalAbility: {
      name: 'Safety First',
      effect: 'If foe cannot counter, grants Hit +10 during combat.',
    },
    strengths: ['Bow', 'Infantry'],
    weaknesses: ['Brawling'],
    startingClass: null,
    bases: null,
  },
  Leda: {
    personalAbility: {
      name: 'Blindside',
      effect: 'If unit attacks first, foe cannot counter. Trigger % = 5.',
    },
    strengths: ['Bow', 'White Magic', 'Infantry', 'Sword'],
    weaknesses: ['Spear'],
    startingClass: null,
    bases: null,
  },
  Buccar: {
    personalAbility: {
      name: "Guardian's Duty",
      effect: 'Reduces damage taken to 90% when attacked.',
    },
    strengths: ['Axe', 'Heavy', 'Rider', 'Spear'],
    weaknesses: ['White Magic', 'Black Magic'],
    startingClass: 'Commoner',
    bases: { hp: 29, str: 12, mag: 4, spd: 5, dex: 6, def: 8, res: 3, lck: 6, cha: 6 },
  },
  Sirocco: {
    personalAbility: { name: "Goddess's Favor", effect: 'Restores 5 HP after combat.' },
    strengths: ['Authority', 'White Magic', 'Black Magic', 'Sword'],
    weaknesses: ['Heavy'],
    startingClass: null,
    bases: null,
  },
  Mu: {
    personalAbility: {
      name: 'Signs of Growth',
      effect: 'Grants enhanced stat growth on level up.',
    },
    strengths: ['Axe', 'Brawling', 'White Magic', 'Sword'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Olympia: {
    personalAbility: {
      name: 'Competitive Zeal',
      effect: 'When equipped with magic, grants Crit +10.',
    },
    strengths: ['Axe', 'White Magic'],
    weaknesses: ['Spear'],
    startingClass: 'Priest',
    bases: { hp: 25, str: 6, mag: 13, spd: 8, dex: 7, def: 6, res: 7, lck: 8, cha: 9 },
  },
  Bertrand: {
    personalAbility: {
      name: 'Requiem Style',
      effect: 'Unit makes a follow-up regardless of AS. Trigger % = 5.',
    },
    strengths: ['Authority', 'Axe', 'Brawling', 'Sword'],
    weaknesses: ['White Magic', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Gaitz: {
    personalAbility: { name: 'Brave Assist', effect: 'Grants Def +3 to adjacent allies.' },
    strengths: ['Axe', 'Rider', 'Spear'],
    weaknesses: ['White Magic', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Dante: {
    personalAbility: {
      name: 'Stage Directions',
      effect:
        "Grants Ddg +10 to allies within 2 spaces during their combats. Trigger % = ally's Cha ÷ 2.",
    },
    strengths: ['Authority', 'White Magic', 'Black Magic'],
    weaknesses: ['Brawling'],
    startingClass: 'Diviner',
    bases: null,
  },
  Goliath: {
    personalAbility: {
      name: 'Heavyweight Class',
      effect: 'Grants Bld +5. Unit cannot change to cavalry or flying classes.',
    },
    strengths: ['Axe', 'Heavy'],
    weaknesses: ['White Magic', 'Flier', 'Black Magic'],
    startingClass: 'Gladiator',
    bases: null,
    cannotMount: true,
  },
  Jester: {
    personalAbility: {
      name: 'Blink of an Eye',
      effect: "After using Swap, grants Def +3 until the unit's next phase.",
    },
    strengths: ['Bow', 'Infantry', 'Sword'],
    weaknesses: ['Axe'],
    startingClass: 'Gladiator',
    bases: null,
  },
  Talimun: {
    personalAbility: { name: "Swashbuckler's Luck", effect: 'Grants Lck +3.' },
    strengths: ['Authority', 'Black Magic', 'Sword'],
    weaknesses: ['Heavy'],
    startingClass: null,
    bases: null,
  },
  Ursula: {
    personalAbility: {
      name: 'Management Skills',
      effect: 'Allows storage access to the unit and allies within 2 spaces.',
    },
    strengths: ['Bow', 'Brawling', 'Sword'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Simon: {
    personalAbility: {
      name: 'Close Call',
      effect: 'If HP ≥ 2 and damage would reduce it to 0, leaves 1 HP. Trigger % = Lck.',
    },
    strengths: ['Axe', 'Infantry', 'Sword'],
    weaknesses: ['White Magic'],
    startingClass: null,
    bases: null,
  },
  Ludia: {
    personalAbility: {
      name: 'Falcon',
      effect: 'If unit attacks first, grants AS +3 during combat.',
    },
    strengths: ['Infantry', 'Spear', 'Sword'],
    weaknesses: ['Axe', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Fianna: {
    personalAbility: {
      name: 'Graceful Light',
      effect: 'Healing an ally with magic costs no magic use. Trigger % = Lck.',
    },
    strengths: ['White Magic', 'Black Magic', 'Rider'],
    weaknesses: ['Brawling', 'Sword'],
    startingClass: 'Diviner',
    bases: null,
  },
  Orchel: {
    personalAbility: {
      name: 'Solid and Sturdy',
      effect: 'Grants Def +5. Unit is armored and cannot change to cavalry or flying classes.',
    },
    strengths: ['Axe', 'White Magic', 'Black Magic'],
    weaknesses: ['Flier', 'Rider', 'Sword'],
    startingClass: 'Bishop',
    bases: { hp: 23, str: 17, mag: 11, spd: 4, dex: 4, def: 14, res: 15, lck: 6, cha: 13 },
    cannotMount: true,
  },
  Diego: {
    personalAbility: {
      name: 'Caretaker',
      effect: 'Adjacent allies cannot suffer a follow-up during combat. Trigger % = 5.',
    },
    strengths: ['Bow', 'Infantry', 'Sword'],
    weaknesses: ['Black Magic'],
    startingClass: 'Gladiator',
    bases: { hp: 27, str: 11, mag: 5, spd: 10, dex: 12, def: 6, res: 4, lck: 8, cha: 6 },
  },
  Ninae: {
    personalAbility: {
      name: "Spirits' Voice",
      effect: 'If foe uses magic, grants Hit/Avo +10 during combat.',
    },
    strengths: ['White Magic', 'Rider', 'Spear'],
    weaknesses: ['Bow'],
    startingClass: 'Diviner',
    bases: null,
  },
  Seteth: {
    personalAbility: {
      name: 'Ready for Battle',
      effect: 'In the first combat of the enemy phase, unit attacks first. Trigger % = 50.',
    },
    strengths: ['Authority', 'Axe', 'Flier', 'Spear'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Loretta: {
    personalAbility: { name: 'Steadfast', effect: 'If HP ≥ 50%, grants Avo +10 during combat.' },
    strengths: ['Flier', 'Spear', 'Sword'],
    weaknesses: ['Heavy'],
    startingClass: null,
    bases: null,
  },
  Anatolia: {
    personalAbility: { name: 'Celestial Flow', effect: 'Grants Avo +3.' },
    strengths: [],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  'Sha Lan': {
    personalAbility: {
      name: 'Cooler Heads',
      effect: 'After using Draw Back, unit can use assist magic.',
    },
    strengths: ['Authority', 'White Magic', 'Spear'],
    weaknesses: ['Sword'],
    startingClass: null,
    bases: null,
  },
  Nezha: {
    personalAbility: {
      name: 'Quick Draw',
      effect: 'If unit attacks first, grants Atk +3 during combat. Trigger % = 50.',
    },
    strengths: ['Brawling', 'Infantry', 'Sword'],
    weaknesses: ['Spear'],
    startingClass: null,
    bases: null,
  },
  Dadao: {
    personalAbility: {
      name: 'One Chance',
      effect: 'If neither unit can follow up, grants Atk +5 during combat.',
    },
    strengths: ['Axe', 'Heavy'],
    weaknesses: ['White Magic', 'Black Magic', 'Spear'],
    startingClass: null,
    bases: null,
  },
  Halvin: {
    personalAbility: {
      name: 'Adaptability',
      effect: 'After combat, grants Hit +2 until the end of the map (max +30).',
    },
    strengths: ['Bow', 'Rider'],
    weaknesses: ['Axe'],
    startingClass: null,
    bases: null,
  },
  Eshmel: {
    personalAbility: {
      name: 'Light of Salvation',
      effect: 'Neutralizes Underworld Boon on foes within 2 spaces.',
    },
    strengths: ['Authority', 'Spear'],
    weaknesses: [],
    startingClass: 'Guardian',
    bases: { hp: 50, str: 33, mag: 24, spd: 26, dex: 28, def: 23, res: 19, lck: 25, cha: 29 },
  },
  'Hong Hua': {
    personalAbility: { name: 'Zhu Ming', effect: 'When equipped with magic, grants Hit +10.' },
    strengths: ['White Magic', 'Black Magic'],
    weaknesses: ['Axe', 'Heavy'],
    startingClass: 'Ovate',
    bases: { hp: 45, str: 15, mag: 34, spd: 26, dex: 30, def: 21, res: 30, lck: 18, cha: 23 },
  },
  Troy: {
    personalAbility: { name: 'Yun Shou', effect: 'When equipped with gauntlets, grants Hit +10.' },
    strengths: ['Brawling', 'White Magic', 'Black Magic'],
    weaknesses: [],
    startingClass: 'War Monk',
    bases: { hp: 52, str: 31, mag: 32, spd: 33, dex: 28, def: 23, res: 28, lck: 24, cha: 21 },
  },
  Tahonia: {
    personalAbility: {
      name: 'Python Technique',
      effect:
        'With a gauntlet combat art, unit makes a follow-up regardless of AS. Trigger % = 15.',
    },
    strengths: ['Brawling'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Aswan: {
    personalAbility: {
      name: 'Princess of Arrows',
      effect: 'When equipped with a bow, grants Hit +20.',
    },
    strengths: ['Authority', 'Bow', 'Infantry'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Klapka: {
    personalAbility: {
      name: 'Spirit of Silver',
      effect: 'After combat, grants Def +1 until the end of the map (max +10). Trigger % = Def.',
    },
    strengths: ['White Magic', 'Infantry', 'Spear'],
    weaknesses: [],
    startingClass: 'Guardian',
    bases: { hp: 60, str: 38, mag: 6, spd: 19, dex: 35, def: 50, res: 20, lck: 19, cha: 25 },
  },
  Benditz: {
    personalAbility: {
      name: 'Wheeled Warrior',
      effect: 'If unit is a Charioteer, grants Hit +20.',
    },
    strengths: ['Authority', 'Bow', 'Rider'],
    weaknesses: ['Infantry'],
    startingClass: null,
    bases: null,
  },
  Alexandra: {
    personalAbility: { name: 'Silver Maiden', effect: 'Grants Hit/Avo +5 for each adjacent ally.' },
    strengths: ['Flier', 'Spear', 'Sword'],
    weaknesses: ['Axe', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Nuzzuo: {
    personalAbility: {
      name: 'Har Hali Wisdom',
      effect: 'If unit is effective against foe, grants Atk +3 during combat.',
    },
    strengths: ['Bow', 'Brawling', 'Sword'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Zarcone: {
    personalAbility: { name: 'Hatchet Man', effect: 'When equipped with an axe, grants Hit +10.' },
    strengths: ['Axe', 'Sword'],
    weaknesses: ['White Magic', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Jasmine: {
    personalAbility: {
      name: 'Expert Counter',
      effect: 'If foe attacks first, grants Hit +20 during combat.',
    },
    strengths: ['Axe', 'Heavy', 'Spear'],
    weaknesses: ['Flier', 'Sword'],
    startingClass: null,
    bases: null,
  },
  Kiroc: {
    personalAbility: {
      name: 'Tyranny',
      effect: 'If foe has a status effect, grants Atk +3 and Crit +10 during combat.',
    },
    strengths: ['Bow'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Inyoni: {
    personalAbility: { name: 'Heavy-Bow User', effect: 'When equipped with a bow, grants Str +3.' },
    strengths: ['Axe', 'Bow'],
    weaknesses: ['White Magic', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Peppe: {
    personalAbility: {
      name: "Hunter's Snare",
      effect: 'In the enemy phase, if foe is damaged, unit attacks first. Trigger % = 30.',
    },
    strengths: ['Bow', 'Infantry', 'Sword'],
    weaknesses: ['White Magic'],
    startingClass: 'Hunter',
    bases: null,
  },
  Guzran: {
    personalAbility: {
      name: 'Hot-Headed',
      effect: 'Grants Hit +10, Avo +10 or Crit +10 during combat.',
    },
    strengths: ['Brawling', 'Infantry', 'Sword'],
    weaknesses: ['White Magic', 'Black Magic'],
    startingClass: 'Gladiator',
    bases: { hp: 28, str: 12, mag: 4, spd: 11, dex: 8, def: 7, res: 3, lck: 10, cha: 6 },
  },
  Nydine: {
    personalAbility: {
      name: 'Barge Through',
      effect: "While mounted, can move through foes' spaces (not large foes).",
    },
    strengths: ['Axe', 'Flier', 'Rider'],
    weaknesses: ['Brawling', 'Heavy'],
    startingClass: null,
    bases: null,
  },
  Io: {
    personalAbility: {
      name: 'With My Steed',
      effect: 'If unit attacks first, grants Shld +3 and Ddg +30 during combat.',
    },
    strengths: ['Axe', 'Rider', 'Spear'],
    weaknesses: ['White Magic', 'Flier'],
    startingClass: null,
    bases: null,
  },
  Catania: {
    personalAbility: {
      name: 'Punishing Squall',
      effect: "If AS ≥ foe's AS +3, grants Hit +20 during combat.",
    },
    strengths: ['Flier', 'Spear', 'Sword'],
    weaknesses: ['Heavy'],
    startingClass: null,
    bases: null,
  },
  Noctula: {
    personalAbility: {
      name: "Warrior's Clarity",
      effect: "After combat, grants Avo +3 until the unit's next phase.",
    },
    strengths: ['Axe', 'Brawling', 'Infantry'],
    weaknesses: ['White Magic', 'Black Magic', 'Sword'],
    startingClass: null,
    bases: null,
  },
  'Yang Jie': {
    personalAbility: {
      name: 'Monkly Havoc',
      effect: 'After defeating a foe, recovers HP. Trigger % = Lck ÷ 2.',
    },
    strengths: ['Axe', 'White Magic'],
    weaknesses: ['Rider', 'Sword'],
    startingClass: null,
    bases: null,
  },
  Majide: {
    personalAbility: { name: 'Hellbent Axe', effect: 'When equipped with an axe, grants Str +3.' },
    strengths: ['Axe', 'Brawling'],
    weaknesses: ['White Magic', 'Flier', 'Black Magic'],
    startingClass: null,
    bases: null,
  },
  Centurio: {
    personalAbility: {
      name: 'Sturdy Corundum',
      effect: 'In the first combat of the enemy phase, unit takes half damage.',
    },
    strengths: ['Axe', 'Heavy', 'Spear'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Sofia: {
    personalAbility: {
      name: 'Healing Knowledge',
      effect: 'When healing an ally with magic, restores +10 HP.',
    },
    strengths: ['Bow', 'White Magic'],
    weaknesses: ['Axe'],
    startingClass: null,
    bases: null,
  },
  Nathan: {
    personalAbility: {
      name: 'Headlong Rush',
      effect: 'If unit attacks first, grants AS +3 and Hit +10 during combat.',
    },
    strengths: ['Heavy', 'Rider', 'Spear'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
  Creek: {
    personalAbility: {
      name: 'Steady Hands',
      effect: 'If foe attacks first, grants AS +3 and Avo +10 during combat.',
    },
    strengths: ['Rider', 'Sword'],
    weaknesses: [],
    startingClass: null,
    bases: null,
  },
};
