import { PORTRAIT_BASE, factionHue, initials, portraitSlug } from './unit-portrait';

describe('unit portrait helpers', () => {
  it('turns names into file slugs', () => {
    expect(portraitSlug('Sha Lan')).toBe('sha-lan');
    expect(portraitSlug("Lu'ay")).toBe('lu-ay');
  });

  it('takes up to two initials', () => {
    expect(initials('Cai')).toBe('C');
    expect(initials('Sha Lan')).toBe('SL');
  });

  it('gives each faction a stable hue', () => {
    expect(factionHue('Ostia')).toBe(factionHue('Ostia'));
    expect(factionHue('Ostia')).toBeGreaterThanOrEqual(0);
    expect(factionHue('Ostia')).toBeLessThan(360);
  });
});

describe('in-game portrait URLs', () => {
  it('match the fan site file names', () => {
    expect(PORTRAIT_BASE + portraitSlug('Yang Jie') + '.webp').toBe(
      'https://fortunesweave.co.uk/images/portrait/yang-jie.webp',
    );
  });
});
