import { ClassDetails, emptyStats } from '../data/models';
import { characterSheet } from './character-sheet';

const grown = {
  ...emptyStats(),
  hp: 30.4,
  str: 12.6,
  mag: 5,
  spd: 10,
  def: 8,
  res: 4,
  dex: 9,
  lck: 6,
};

const myrmidon = {
  baseBonuses: { ...emptyStats(), spd: 2 },
  caps: null,
  weapons: [],
  movement: { kind: 'foot', range: 5 },
  skills: [],
  masterSkill: null,
  unlock: null,
} as ClassDetails;

describe('characterSheet', () => {
  it('rounds stats and adds class and always-on ability bonuses', () => {
    const sheet = characterSheet(
      grown,
      myrmidon,
      {},
      [{ name: 'Divine Insight', effect: 'Grants Spd +10.' }],
      undefined,
      0,
    );
    expect(sheet.stats.hp).toBe(30);
    expect(sheet.stats.str).toBe(13);
    expect(sheet.stats.spd).toBe(22);
    expect(sheet.bonusSources).toEqual(['Divine Insight']);
  });

  it('uses the published combat formulas', () => {
    const sword = { name: 'Iron Sword', might: 5, hit: 90, crit: 0, weight: 7, magic: false };
    const sheet = characterSheet(grown, myrmidon, {}, [], sword, 3);
    expect(sheet.atk).toBe(18); // Str 13 + Mt 5
    expect(sheet.as).toBe(8); // Spd 12 - (Wt 7 - Bld 3)
    expect(sheet.avo).toBe(8);
    expect(sheet.prt).toBe(8);
    expect(sheet.rsl).toBe(4);
    expect(sheet.hit).toEqual({ known: 90, from: 'Dex' });
    expect(sheet.mov).toBe(5);
  });

  it('uses Mag for magic and lets Build cancel all weight', () => {
    const tome = { name: 'Fire', might: 4, hit: 80, crit: 0, weight: 2, magic: true };
    const sheet = characterSheet(grown, myrmidon, {}, [], tome, 5);
    expect(sheet.atk).toBe(9);
    expect(sheet.as).toBe(12);
  });

  it('adds non-stat bonuses like Mov and Avo, and holds stats to caps', () => {
    const sheet = characterSheet(
      grown,
      myrmidon,
      { spd: 11 },
      [
        { name: 'Brio', effect: 'Grants Mov +1.' },
        { name: 'Flying Avo +7', effect: 'Grants Avo +7.' },
      ],
      undefined,
      0,
    );
    expect(sheet.mov).toBe(6);
    expect(sheet.stats.spd).toBe(11);
    expect(sheet.capped).toEqual(['spd']);
    expect(sheet.avo).toBe(18);
  });
});
