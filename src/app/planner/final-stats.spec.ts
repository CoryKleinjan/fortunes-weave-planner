import { abilityTotals, alwaysOnBonus } from './final-stats';

describe('alwaysOnBonus', () => {
  it('reads plain stat grants', () => {
    expect(alwaysOnBonus('Grants Str +1.')?.stats).toEqual({ str: 1 });
    expect(alwaysOnBonus('Grants Dex/Spd +1.')?.stats).toEqual({ dex: 1, spd: 1 });
    expect(alwaysOnBonus('Grants max HP +3.')?.stats).toEqual({ hp: 3 });
    expect(alwaysOnBonus('Grants Spd +10.')?.stats).toEqual({ spd: 10 });
  });

  it('keeps non-stat bonuses separately', () => {
    expect(alwaysOnBonus('Grants Avo +7.')).toEqual({ stats: {}, other: { Avo: 7 } });
    expect(alwaysOnBonus('Grants Mov +1.')?.other).toEqual({ Mov: 1 });
  });

  it('ignores conditional effects', () => {
    expect(alwaysOnBonus('When equipped with a sword, grants Hit +3.')).toBeNull();
    expect(alwaysOnBonus('If foe attacks first, grants Atk +3 during combat.')).toBeNull();
    expect(alwaysOnBonus('Grants Res +3 to adjacent allies.')).toBeNull();
    expect(alwaysOnBonus('(Cavalry) Grants Mov +1.')).toBeNull();
    expect(alwaysOnBonus('Grants Shld +5, but the unit cannot avoid attacks.')).toBeNull();
    expect(alwaysOnBonus(null)).toBeNull();
  });
});

describe('abilityTotals', () => {
  it('sums bonuses and names the abilities that gave them', () => {
    const totals = abilityTotals([
      { name: 'Hunting Basics', effect: 'Grants Dex/Spd +1.' },
      { name: 'Divine Insight', effect: 'Grants Spd +10.' },
      { name: 'Swords Lv. 1', effect: 'When equipped with a sword, grants Hit +3.' },
      { name: 'Brio', effect: 'Grants Mov +1.' },
    ]);
    expect(totals.stats.spd).toBe(11);
    expect(totals.stats.dex).toBe(1);
    expect(totals.other).toEqual({ Mov: 1 });
    expect(totals.sources).toEqual(['Hunting Basics', 'Divine Insight', 'Brio']);
  });
});
