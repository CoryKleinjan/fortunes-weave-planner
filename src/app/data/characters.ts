import { Character } from './models';

/**
 * Personal growth rates (%), from KeenGamer's growth-rate guide (2026-09-28).
 * Values were transcribed by hand; verify in-game before relying on them.
 */
export const CHARACTERS: readonly Character[] = [
  {
    name: 'Cai',
    faction: 'Ribeira Winds',
    growths: { hp: 45, str: 45, mag: 40, spd: 45, dex: 45, def: 35, res: 35, lck: 40, cha: 40 },
  },
  {
    name: 'Tialla',
    faction: 'Ribeira Winds',
    growths: { hp: 30, str: 25, mag: 45, spd: 35, dex: 40, def: 20, res: 40, lck: 50, cha: 45 },
  },
  {
    name: 'Peter',
    faction: 'Ribeira Winds',
    growths: { hp: 40, str: 35, mag: 20, spd: 45, dex: 60, def: 30, res: 25, lck: 35, cha: 30 },
  },
  {
    name: 'Ultand',
    faction: 'Ribeira Winds',
    growths: { hp: 45, str: 40, mag: 40, spd: 35, dex: 40, def: 35, res: 45, lck: 55, cha: 50 },
  },
  {
    name: 'Dietrich',
    faction: 'House Lamine',
    growths: { hp: 50, str: 45, mag: 30, spd: 50, dex: 60, def: 40, res: 30, lck: 50, cha: 60 },
  },
  {
    name: 'Fabio',
    faction: 'House Lamine',
    growths: { hp: 40, str: 25, mag: 50, spd: 35, dex: 40, def: 30, res: 45, lck: 35, cha: 30 },
  },
  {
    name: 'Esmeralda',
    faction: 'House Lamine',
    growths: { hp: 55, str: 55, mag: 20, spd: 35, dex: 35, def: 45, res: 25, lck: 35, cha: 30 },
  },
  {
    name: 'Mikaela',
    faction: 'House Lamine',
    growths: { hp: 50, str: 45, mag: 30, spd: 40, dex: 35, def: 40, res: 25, lck: 30, cha: 40 },
  },
  {
    name: 'Theodora',
    faction: "Megaira's Beacon",
    growths: { hp: 70, str: 50, mag: 30, spd: 40, dex: 40, def: 40, res: 30, lck: 30, cha: 50 },
  },
  {
    name: 'Bonaventure',
    faction: "Megaira's Beacon",
    growths: { hp: 35, str: 35, mag: 45, spd: 40, dex: 50, def: 30, res: 40, lck: 35, cha: 40 },
  },
  {
    name: 'Tobias',
    faction: "Megaira's Beacon",
    growths: { hp: 55, str: 60, mag: 15, spd: 25, dex: 30, def: 45, res: 20, lck: 40, cha: 35 },
  },
  {
    name: 'Lysander',
    faction: "Megaira's Beacon",
    growths: { hp: 45, str: 40, mag: 25, spd: 50, dex: 35, def: 40, res: 25, lck: 30, cha: 30 },
  },
  {
    name: 'Lilian',
    faction: "Megaira's Beacon",
    growths: { hp: 35, str: 35, mag: 30, spd: 40, dex: 55, def: 30, res: 35, lck: 50, cha: 25 },
  },
  {
    name: 'Leda',
    faction: 'Rose Tempest',
    growths: { hp: 40, str: 35, mag: 35, spd: 65, dex: 50, def: 30, res: 35, lck: 25, cha: 55 },
  },
  {
    name: 'Buccar',
    faction: 'Rose Tempest',
    growths: { hp: 50, str: 50, mag: 20, spd: 25, dex: 40, def: 45, res: 20, lck: 30, cha: 35 },
  },
  {
    name: 'Sirocco',
    faction: 'Rose Tempest',
    growths: { hp: 40, str: 40, mag: 40, spd: 45, dex: 50, def: 35, res: 35, lck: 50, cha: 45 },
  },
  {
    name: 'Mu',
    faction: 'Rose Tempest',
    growths: { hp: 30, str: 30, mag: 5, spd: 30, dex: 30, def: 20, res: 10, lck: 10, cha: 20 },
  },
  {
    name: 'Olympia',
    faction: 'Rose Tempest',
    growths: { hp: 35, str: 35, mag: 50, spd: 35, dex: 35, def: 30, res: 40, lck: 40, cha: 40 },
  },
  {
    name: 'Bertrand',
    faction: 'Mane of Flames',
    growths: { hp: 50, str: 55, mag: 15, spd: 45, dex: 50, def: 45, res: 20, lck: 30, cha: 50 },
  },
  {
    name: 'Gaitz',
    faction: 'Mane of Flames',
    growths: { hp: 50, str: 50, mag: 20, spd: 40, dex: 45, def: 45, res: 25, lck: 40, cha: 45 },
  },
  {
    name: 'Dante',
    faction: 'Mane of Flames',
    growths: { hp: 30, str: 30, mag: 45, spd: 40, dex: 40, def: 20, res: 40, lck: 45, cha: 30 },
  },
  {
    name: 'Goliath',
    faction: 'Mane of Flames',
    growths: { hp: 55, str: 60, mag: 5, spd: 15, dex: 30, def: 50, res: 20, lck: 35, cha: 20 },
  },
  {
    name: 'Jester',
    faction: 'Mane of Flames',
    growths: { hp: 40, str: 35, mag: 15, spd: 60, dex: 45, def: 35, res: 25, lck: 40, cha: 40 },
  },
  {
    name: 'Talimun',
    faction: "Moon's Lie",
    growths: { hp: 45, str: 40, mag: 45, spd: 40, dex: 45, def: 35, res: 40, lck: 60, cha: 50 },
  },
  {
    name: 'Ursula',
    faction: "Moon's Lie",
    growths: { hp: 40, str: 35, mag: 35, spd: 50, dex: 50, def: 35, res: 30, lck: 40, cha: 45 },
  },
  {
    name: 'Simon',
    faction: "Moon's Lie",
    growths: { hp: 50, str: 50, mag: 20, spd: 35, dex: 40, def: 40, res: 25, lck: 50, cha: 35 },
  },
  {
    name: 'Ludia',
    faction: "Moon's Lie",
    growths: { hp: 40, str: 35, mag: 20, spd: 55, dex: 45, def: 30, res: 20, lck: 30, cha: 30 },
  },
  {
    name: 'Fianna',
    faction: "Moon's Lie",
    growths: { hp: 30, str: 35, mag: 55, spd: 30, dex: 40, def: 20, res: 45, lck: 25, cha: 40 },
  },
  {
    name: 'Orchel',
    faction: "Linaria's Morning Dew",
    growths: { hp: 30, str: 60, mag: 45, spd: 10, dex: 20, def: 60, res: 60, lck: 20, cha: 60 },
  },
  {
    name: 'Diego',
    faction: "Linaria's Morning Dew",
    growths: { hp: 45, str: 40, mag: 20, spd: 45, dex: 60, def: 35, res: 20, lck: 35, cha: 30 },
  },
  {
    name: 'Ninae',
    faction: "Linaria's Morning Dew",
    growths: { hp: 45, str: 45, mag: 35, spd: 35, dex: 45, def: 35, res: 45, lck: 50, cha: 40 },
  },
  {
    name: 'Seteth',
    faction: "Linaria's Morning Dew",
    growths: { hp: 45, str: 45, mag: 30, spd: 40, dex: 45, def: 40, res: 35, lck: 30, cha: 50 },
  },
  {
    name: 'Loretta',
    faction: "Linaria's Morning Dew",
    growths: { hp: 35, str: 35, mag: 35, spd: 55, dex: 40, def: 30, res: 40, lck: 30, cha: 30 },
  },
  {
    name: 'Anatolia',
    faction: 'Brides of the Pale Raven',
    growths: { hp: 40, str: 35, mag: 50, spd: 50, dex: 45, def: 35, res: 40, lck: 40, cha: 50 },
  },
  {
    name: 'Sha Lan',
    faction: 'Brides of the Pale Raven',
    growths: { hp: 35, str: 30, mag: 45, spd: 35, dex: 50, def: 30, res: 45, lck: 35, cha: 40 },
  },
  {
    name: 'Nezha',
    faction: 'Brides of the Pale Raven',
    growths: { hp: 45, str: 55, mag: 25, spd: 45, dex: 50, def: 35, res: 25, lck: 30, cha: 25 },
  },
  {
    name: 'Dadao',
    faction: 'Brides of the Pale Raven',
    growths: { hp: 50, str: 55, mag: 20, spd: 30, dex: 35, def: 45, res: 20, lck: 25, cha: 30 },
  },
  {
    name: 'Halvin',
    faction: 'Brides of the Pale Raven',
    growths: { hp: 35, str: 35, mag: 30, spd: 45, dex: 60, def: 30, res: 25, lck: 40, cha: 35 },
  },
  {
    name: 'Eshmel',
    faction: "Promised One's Army",
    growths: { hp: 50, str: 45, mag: 45, spd: 45, dex: 45, def: 35, res: 35, lck: 40, cha: 50 },
  },
  {
    name: 'Hong Hua',
    faction: "Promised One's Army",
    growths: { hp: 40, str: 30, mag: 45, spd: 45, dex: 45, def: 30, res: 45, lck: 30, cha: 40 },
  },
  {
    name: 'Troy',
    faction: "Promised One's Army",
    growths: { hp: 40, str: 45, mag: 45, spd: 50, dex: 40, def: 30, res: 30, lck: 30, cha: 30 },
  },
  {
    name: 'Tahonia',
    faction: 'Part III Recruits',
    growths: { hp: 65, str: 50, mag: 5, spd: 20, dex: 40, def: 45, res: 35, lck: 20, cha: 40 },
  },
  {
    name: 'Aswan',
    faction: 'Part III Recruits',
    growths: { hp: 40, str: 35, mag: 10, spd: 40, dex: 50, def: 30, res: 15, lck: 30, cha: 20 },
  },
  {
    name: 'Klapka',
    faction: 'Part III Recruits',
    growths: { hp: 40, str: 40, mag: 10, spd: 25, dex: 45, def: 50, res: 15, lck: 25, cha: 35 },
  },
  {
    name: 'Benditz',
    faction: 'Independent',
    growths: { hp: 50, str: 35, mag: 20, spd: 35, dex: 50, def: 35, res: 25, lck: 30, cha: 35 },
  },
  {
    name: 'Alexandra',
    faction: 'Independent',
    growths: { hp: 30, str: 35, mag: 35, spd: 55, dex: 45, def: 30, res: 40, lck: 50, cha: 50 },
  },
  {
    name: 'Nuzzuo',
    faction: 'Independent',
    growths: { hp: 50, str: 50, mag: 15, spd: 55, dex: 45, def: 20, res: 15, lck: 25, cha: 35 },
  },
  {
    name: 'Zarcone',
    faction: 'Independent',
    growths: { hp: 40, str: 30, mag: 20, spd: 35, dex: 60, def: 30, res: 25, lck: 30, cha: 15 },
  },
  {
    name: 'Jasmine',
    faction: 'Independent',
    growths: { hp: 50, str: 40, mag: 20, spd: 30, dex: 45, def: 45, res: 25, lck: 40, cha: 45 },
  },
  {
    name: 'Kiroc',
    faction: 'Independent',
    growths: { hp: 55, str: 40, mag: 15, spd: 55, dex: 50, def: 30, res: 15, lck: 30, cha: 25 },
  },
  {
    name: 'Inyoni',
    faction: 'Independent',
    growths: { hp: 40, str: 50, mag: 20, spd: 35, dex: 40, def: 40, res: 30, lck: 40, cha: 30 },
  },
  {
    name: 'Peppe',
    faction: 'Independent',
    growths: { hp: 30, str: 30, mag: 25, spd: 60, dex: 45, def: 30, res: 30, lck: 45, cha: 30 },
  },
  {
    name: 'Guzran',
    faction: 'Independent',
    growths: { hp: 45, str: 45, mag: 20, spd: 50, dex: 45, def: 35, res: 20, lck: 45, cha: 30 },
  },
  {
    name: 'Nydine',
    faction: 'Independent',
    growths: { hp: 45, str: 40, mag: 30, spd: 45, dex: 40, def: 30, res: 25, lck: 35, cha: 35 },
  },
  {
    name: 'Io',
    faction: 'Independent',
    growths: { hp: 45, str: 40, mag: 25, spd: 35, dex: 45, def: 40, res: 25, lck: 35, cha: 35 },
  },
  {
    name: 'Catania',
    faction: 'Independent',
    growths: { hp: 35, str: 35, mag: 35, spd: 55, dex: 50, def: 30, res: 35, lck: 40, cha: 45 },
  },
  {
    name: 'Noctula',
    faction: 'Independent',
    growths: { hp: 50, str: 45, mag: 20, spd: 45, dex: 40, def: 40, res: 20, lck: 35, cha: 30 },
  },
  {
    name: 'Yang Jie',
    faction: 'Independent',
    growths: { hp: 50, str: 35, mag: 40, spd: 35, dex: 35, def: 30, res: 40, lck: 40, cha: 25 },
  },
  {
    name: 'Majide',
    faction: 'Independent',
    growths: { hp: 65, str: 50, mag: 15, spd: 20, dex: 30, def: 40, res: 10, lck: 25, cha: 5 },
  },
  {
    name: 'Centurio',
    faction: 'Independent',
    growths: { hp: 45, str: 45, mag: 25, spd: 40, dex: 50, def: 50, res: 30, lck: 30, cha: 30 },
  },
  {
    name: 'Sofia',
    faction: 'Independent',
    growths: { hp: 35, str: 30, mag: 45, spd: 40, dex: 30, def: 25, res: 40, lck: 30, cha: 40 },
  },
  {
    name: 'Nathan',
    faction: 'Independent',
    growths: { hp: 55, str: 60, mag: 15, spd: 25, dex: 60, def: 45, res: 15, lck: 25, cha: 30 },
  },
  {
    name: 'Creek',
    faction: 'Independent',
    growths: { hp: 45, str: 50, mag: 15, spd: 60, dex: 50, def: 35, res: 20, lck: 30, cha: 35 },
  },
];
