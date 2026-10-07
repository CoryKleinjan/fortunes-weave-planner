import { CHARACTERS } from '../data/characters';
import { CLASSES } from '../data/classes';
import { STAT_KEYS } from '../data/models';
import { effectiveGrowths, focusScore, projectRoute } from './growth';

const classByName = new Map(CLASSES.map((c) => [c.name, c]));
const leda = CHARACTERS.find((c) => c.name === 'Leda')!;

describe('growth math', () => {
  it('adds personal growth and class modifier', () => {
    // KeenGamer's own example: Leda's 65% Speed becomes 90% as a Dancer.
    expect(effectiveGrowths(leda.growths, classByName.get('Dancer')!).spd).toBe(90);
  });

  it('clamps growths to 0-100', () => {
    const big = { ...leda.growths, spd: 95 };
    expect(effectiveGrowths(big, classByName.get('Dancer')!).spd).toBe(100);
  });

  it('projects average stats along a route', () => {
    const start = { hp: 20, str: 5, mag: 5, spd: 10, dex: 8, def: 4, res: 4, lck: 5, cha: 6 };
    const steps = projectRoute(
      leda.growths,
      start,
      1,
      [
        { className: 'Commoner', levels: 4 },
        { className: 'Dancer', levels: 10 },
      ],
      classByName,
    );
    expect(steps.length).toBe(2);
    expect(steps[1].endLevel).toBe(15);
    // 10 + 4 * 0.65 + 10 * 0.90
    expect(steps[1].totals.spd).toBeCloseTo(21.6);
  });

  it('skips unknown classes and empty steps', () => {
    const start = Object.fromEntries(STAT_KEYS.map((k) => [k, 0])) as typeof leda.growths;
    const steps = projectRoute(
      leda.growths,
      start,
      1,
      [
        { className: 'Nope', levels: 5 },
        { className: 'Commoner', levels: 0 },
      ],
      classByName,
    );
    expect(steps).toEqual([]);
  });

  it('scores only the focus stats', () => {
    expect(focusScore(leda.growths, ['spd', 'cha'])).toBe(120);
  });
});

describe('data', () => {
  it('has 63 characters and 59 classes with unique names', () => {
    expect(new Set(CHARACTERS.map((c) => c.name)).size).toBe(63);
    expect(new Set(CLASSES.map((c) => c.name)).size).toBe(59);
  });
});
