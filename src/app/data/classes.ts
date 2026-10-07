import { GameClass } from './models';

/**
 * Class growth modifiers (added to personal growths), from KeenGamer's growth-rate
 * guide (2026-09-28). Verify in-game before relying on them.
 */
export const CLASSES: readonly GameClass[] = [
  {
    name: 'Commoner',
    tier: 'beginner',
    modifiers: { hp: 0, str: 0, mag: 0, spd: 0, dex: 0, def: 0, res: 0, lck: 0, cha: 0 },
  },
  {
    name: 'Gladiator',
    tier: 'beginner',
    modifiers: { hp: 10, str: 10, mag: 0, spd: 0, dex: 0, def: 0, res: 0, lck: 0, cha: 0 },
  },
  {
    name: 'Hunter',
    tier: 'beginner',
    modifiers: { hp: 10, str: 0, mag: 0, spd: 10, dex: 10, def: 0, res: 0, lck: 0, cha: 0 },
  },
  {
    name: 'Soldier',
    tier: 'beginner',
    modifiers: { hp: 10, str: 5, mag: 0, spd: -5, dex: 5, def: 10, res: 0, lck: 0, cha: 0 },
  },
  {
    name: 'Ornius Rider',
    tier: 'beginner',
    modifiers: { hp: 10, str: 0, mag: 0, spd: 10, dex: 5, def: 0, res: 5, lck: 5, cha: 0 },
  },
  {
    name: 'Diviner',
    tier: 'beginner',
    modifiers: { hp: 5, str: -5, mag: 15, spd: 0, dex: 5, def: -5, res: 10, lck: 0, cha: 0 },
  },
  {
    name: 'Myrmidon',
    tier: 'specialty',
    modifiers: { hp: 10, str: 0, mag: 0, spd: 15, dex: 10, def: 0, res: 0, lck: 5, cha: 5 },
  },
  {
    name: 'Brigand',
    tier: 'specialty',
    modifiers: { hp: 15, str: 15, mag: -5, spd: 5, dex: 0, def: 5, res: 0, lck: 0, cha: 5 },
  },
  {
    name: 'Pugilist',
    tier: 'specialty',
    modifiers: { hp: 15, str: 10, mag: -5, spd: 10, dex: 5, def: 10, res: 0, lck: 0, cha: 5 },
  },
  {
    name: 'Archer',
    tier: 'specialty',
    modifiers: { hp: 10, str: 5, mag: 0, spd: 10, dex: 10, def: 5, res: 0, lck: 5, cha: 5 },
  },
  {
    name: 'Rogue',
    tier: 'specialty',
    modifiers: { hp: 10, str: 0, mag: 0, spd: 15, dex: 10, def: 0, res: 5, lck: 5, cha: 0 },
  },
  {
    name: 'Armored Knight',
    tier: 'specialty',
    modifiers: { hp: 10, str: 10, mag: -5, spd: -5, dex: 5, def: 25, res: -5, lck: 0, cha: 5 },
  },
  {
    name: 'Light Cavalry',
    tier: 'specialty',
    modifiers: { hp: 10, str: 5, mag: -5, spd: 5, dex: 0, def: 5, res: 0, lck: 5, cha: 10 },
  },
  {
    name: 'Charioteer',
    tier: 'specialty',
    modifiers: { hp: 10, str: 5, mag: -5, spd: -5, dex: 15, def: 10, res: 0, lck: 5, cha: 10 },
  },
  {
    name: 'Armored Ornius Rider',
    tier: 'specialty',
    modifiers: { hp: 10, str: 0, mag: -5, spd: 10, dex: 5, def: 10, res: 0, lck: 5, cha: 5 },
  },
  {
    name: 'Wing Soldier',
    tier: 'specialty',
    modifiers: { hp: 10, str: 0, mag: 5, spd: 0, dex: 5, def: 5, res: 5, lck: 5, cha: 10 },
  },
  {
    name: 'Priest',
    tier: 'specialty',
    modifiers: { hp: 5, str: -5, mag: 10, spd: 5, dex: 5, def: -10, res: 15, lck: 15, cha: 10 },
  },
  {
    name: 'Shaman',
    tier: 'specialty',
    modifiers: { hp: 5, str: -5, mag: 15, spd: 10, dex: 10, def: -10, res: 10, lck: 10, cha: 0 },
  },
  {
    name: 'Warrior',
    tier: 'advanced',
    modifiers: { hp: 20, str: 20, mag: -5, spd: 0, dex: 0, def: 5, res: -5, lck: 0, cha: 5 },
  },
  {
    name: 'Shido',
    tier: 'advanced',
    modifiers: { hp: 10, str: 5, mag: 0, spd: 15, dex: 10, def: 0, res: -5, lck: 5, cha: 5 },
  },
  {
    name: 'Dancer',
    tier: 'advanced',
    modifiers: { hp: 15, str: 5, mag: 0, spd: 25, dex: 10, def: 0, res: 5, lck: 10, cha: 20 },
  },
  {
    name: 'Blacksmith',
    tier: 'advanced',
    modifiers: { hp: 15, str: 10, mag: 10, spd: 0, dex: 5, def: 10, res: 10, lck: 0, cha: 5 },
  },
  {
    name: 'Sniper',
    tier: 'advanced',
    modifiers: { hp: 10, str: 5, mag: 0, spd: 10, dex: 20, def: 5, res: 5, lck: 5, cha: 5 },
  },
  {
    name: 'Forest Knight',
    tier: 'advanced',
    modifiers: { hp: 10, str: 5, mag: 0, spd: 10, dex: 10, def: 5, res: 5, lck: 5, cha: 5 },
  },
  {
    name: 'Ranger',
    tier: 'advanced',
    modifiers: { hp: 10, str: 5, mag: 0, spd: 15, dex: 15, def: 0, res: 10, lck: 15, cha: 0 },
  },
  {
    name: 'Cataphract',
    tier: 'advanced',
    modifiers: { hp: 15, str: 15, mag: -5, spd: -10, dex: 0, def: 10, res: -5, lck: 0, cha: 5 },
  },
  {
    name: 'Guardian',
    tier: 'advanced',
    modifiers: { hp: 10, str: 10, mag: 0, spd: 0, dex: 5, def: 10, res: 15, lck: 5, cha: 5 },
  },
  {
    name: 'Elephant Rider',
    tier: 'advanced',
    modifiers: { hp: 20, str: 10, mag: -5, spd: 20, dex: -10, def: 15, res: -5, lck: 5, cha: 10 },
  },
  {
    name: 'Dreadnought',
    tier: 'advanced',
    modifiers: { hp: 15, str: 15, mag: -5, spd: -10, dex: 5, def: 30, res: -10, lck: 0, cha: 5 },
  },
  {
    name: 'Bardinger',
    tier: 'advanced',
    modifiers: { hp: 10, str: 10, mag: -5, spd: 0, dex: 0, def: 5, res: 10, lck: 5, cha: 10 },
  },
  {
    name: 'Dragoon',
    tier: 'advanced',
    modifiers: { hp: 15, str: 5, mag: 0, spd: 0, dex: 5, def: 10, res: 10, lck: 10, cha: 5 },
  },
  {
    name: 'Caladrius',
    tier: 'advanced',
    modifiers: { hp: 15, str: 0, mag: 10, spd: 5, dex: 10, def: 10, res: 10, lck: 5, cha: 5 },
  },
  {
    name: 'Ovate',
    tier: 'advanced',
    modifiers: { hp: 10, str: -5, mag: 20, spd: 5, dex: 15, def: -10, res: 15, lck: 10, cha: 0 },
  },
  {
    name: 'Bishop',
    tier: 'advanced',
    modifiers: { hp: 10, str: -5, mag: 15, spd: 0, dex: 0, def: -10, res: 20, lck: 20, cha: 10 },
  },
  {
    name: 'Troubadour',
    tier: 'advanced',
    modifiers: { hp: 10, str: 0, mag: 15, spd: 5, dex: 0, def: 5, res: 15, lck: 15, cha: 10 },
  },
  {
    name: 'Swordmaster',
    tier: 'master',
    modifiers: { hp: 15, str: 10, mag: 0, spd: 20, dex: 15, def: 0, res: 0, lck: 5, cha: 5 },
  },
  {
    name: 'High Savant',
    tier: 'master',
    modifiers: { hp: 10, str: 15, mag: 15, spd: 10, dex: 5, def: 5, res: 5, lck: 5, cha: 5 },
  },
  {
    name: 'Battlemaster',
    tier: 'master',
    modifiers: { hp: 25, str: 25, mag: -5, spd: -5, dex: 5, def: 10, res: -5, lck: -5, cha: 5 },
  },
  {
    name: 'War Monk',
    tier: 'master',
    modifiers: { hp: 15, str: 10, mag: 0, spd: 15, dex: 0, def: 5, res: 15, lck: 5, cha: 5 },
  },
  {
    name: 'Bow Adept',
    tier: 'master',
    modifiers: { hp: 15, str: 5, mag: 0, spd: 15, dex: 20, def: 5, res: 5, lck: 5, cha: 5 },
  },
  {
    name: 'Bow Knight',
    tier: 'master',
    modifiers: { hp: 10, str: 10, mag: 0, spd: 15, dex: 10, def: 5, res: 0, lck: 5, cha: 5 },
  },
  {
    name: 'Shadow Seeker',
    tier: 'master',
    modifiers: { hp: 15, str: 5, mag: 0, spd: 15, dex: 25, def: 0, res: 10, lck: 15, cha: 0 },
  },
  {
    name: 'Sentinel',
    tier: 'master',
    modifiers: { hp: 15, str: 15, mag: 0, spd: 5, dex: 5, def: 10, res: 15, lck: 5, cha: 5 },
  },
  {
    name: 'Castle Knight',
    tier: 'master',
    modifiers: { hp: 25, str: 20, mag: -5, spd: -15, dex: 5, def: 30, res: -10, lck: 0, cha: 5 },
  },
  {
    name: 'Orichaldia',
    tier: 'master',
    modifiers: { hp: 15, str: 15, mag: -5, spd: 0, dex: 5, def: 5, res: 5, lck: 5, cha: 10 },
  },
  {
    name: 'Great Knight',
    tier: 'master',
    modifiers: { hp: 20, str: 20, mag: -5, spd: -10, dex: 0, def: 15, res: -10, lck: 0, cha: 5 },
  },
  {
    name: 'Celestial Trooper',
    tier: 'master',
    modifiers: { hp: 15, str: 5, mag: -5, spd: 10, dex: 5, def: 5, res: 15, lck: 15, cha: 10 },
  },
  {
    name: 'Bau Lord',
    tier: 'master',
    modifiers: { hp: 15, str: 5, mag: 0, spd: 5, dex: 0, def: 10, res: 10, lck: 10, cha: 5 },
  },
  {
    name: 'Druid',
    tier: 'master',
    modifiers: { hp: 10, str: -5, mag: 30, spd: 15, dex: 10, def: -10, res: 20, lck: 10, cha: 0 },
  },
  {
    name: 'Wiseman',
    tier: 'master',
    modifiers: { hp: 10, str: -5, mag: 20, spd: 0, dex: 5, def: -10, res: 25, lck: 20, cha: 10 },
  },
  {
    name: 'Valkyrium',
    tier: 'master',
    modifiers: { hp: 10, str: 0, mag: 15, spd: 5, dex: 5, def: 5, res: 10, lck: 15, cha: 10 },
  },
  {
    name: 'The Blade',
    tier: 'divine',
    modifiers: { hp: 15, str: 10, mag: 10, spd: 20, dex: 20, def: 5, res: 5, lck: 5, cha: 10 },
  },
  {
    name: 'The Apsara',
    tier: 'divine',
    modifiers: { hp: 15, str: 5, mag: 10, spd: 25, dex: 15, def: 5, res: 5, lck: 10, cha: 30 },
  },
  {
    name: 'The Eternal',
    tier: 'divine',
    modifiers: { hp: 30, str: 30, mag: 0, spd: 10, dex: 0, def: 15, res: 0, lck: 0, cha: 0 },
  },
  {
    name: 'The Godhand',
    tier: 'divine',
    modifiers: { hp: 15, str: 10, mag: 10, spd: 15, dex: 5, def: 10, res: 15, lck: 5, cha: 10 },
  },
  {
    name: 'The Calamity',
    tier: 'divine',
    modifiers: { hp: 15, str: 5, mag: 15, spd: 25, dex: 20, def: 5, res: 15, lck: 15, cha: 5 },
  },
  {
    name: 'The Trident',
    tier: 'divine',
    modifiers: { hp: 15, str: 15, mag: 5, spd: 10, dex: 10, def: 15, res: 15, lck: 5, cha: 10 },
  },
  {
    name: 'The Cavalier',
    tier: 'divine',
    modifiers: { hp: 20, str: 15, mag: 5, spd: 10, dex: 10, def: 15, res: 10, lck: 5, cha: 15 },
  },
  {
    name: 'The Avatar',
    tier: 'divine',
    modifiers: { hp: 10, str: -5, mag: 30, spd: 10, dex: 5, def: -5, res: 30, lck: 20, cha: 10 },
  },
];
