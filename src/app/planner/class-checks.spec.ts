import { abilityEffect } from '../data/abilities';
import { CHARACTER_DETAILS } from '../data/character-details';
import { CHARACTERS } from '../data/characters';
import { CLASS_DETAILS } from '../data/class-details';
import { CLASSES } from '../data/classes';
import { emptyStats } from '../data/models';
import { classWarnings, statsInClass, suitsAptitudes } from './class-checks';

describe('class details data', () => {
  it('covers every class', () => {
    for (const c of CLASSES) expect(CLASS_DETAILS[c.name], c.name).toBeDefined();
    expect(Object.keys(CLASS_DETAILS).length).toBe(CLASSES.length);
  });

  it('only describes known characters', () => {
    const names = new Set(CHARACTERS.map((c) => c.name));
    for (const name of Object.keys(CHARACTER_DETAILS)) expect(names.has(name), name).toBe(true);
  });

  it('has an effect for every class and master skill', () => {
    for (const [name, d] of Object.entries(CLASS_DETAILS)) {
      for (const skill of [...d.skills, ...(d.masterSkill ? [d.masterSkill] : [])]) {
        expect(abilityEffect(skill), `${name}: ${skill}`).not.toBeNull();
      }
    }
  });

  it('parses weapon ranks and exam requirements', () => {
    expect(CLASS_DETAILS['Ornius Rider'].weapons).toEqual([
      { type: 'Spear', rank: 'D' },
      { type: 'Sword', rank: null },
      { type: 'Axe', rank: 'D' },
    ]);
    expect(CLASS_DETAILS['Ornius Rider'].unlock?.requires).toEqual([
      { skill: 'Rider', rank: 'E+' },
    ]);
    expect(CLASS_DETAILS['Dancer'].unlock?.level).toBe(35);
  });
});

describe('statsInClass', () => {
  it('adds class bonuses and applies caps', () => {
    const totals = { ...emptyStats(), hp: 30, spd: 20 };
    const shown = statsInClass(totals, CLASS_DETAILS['Dancer'], { spd: 25 });
    expect(shown.hp).toBe(34);
    expect(shown.spd).toBe(25);
    expect(shown.cha).toBe(5);
  });

  it('adds nothing when bonuses are undocumented', () => {
    const totals = { ...emptyStats(), str: 12 };
    expect(statsInClass(totals, CLASS_DETAILS['Warrior'], {}).str).toBe(12);
  });
});

describe('classWarnings', () => {
  it('flags an early exam, a barred mount and a weak skill', () => {
    const goliath = CHARACTER_DETAILS['Goliath'];
    const warnings = classWarnings('Goliath', goliath, 'Dragoon', CLASS_DETAILS['Dragoon'], 20);
    expect(warnings).toContain('The Dragoon exam recommends level 35; this step starts at 20.');
    expect(warnings).toContain("Goliath can't use cavalry or flying classes.");
    expect(warnings).toContain('Needs Flier C, and Goliath is weak in Flier.');
  });

  it('is quiet for a good fit', () => {
    const peter = CHARACTER_DETAILS['Peter'];
    expect(classWarnings('Peter', peter, 'Archer', CLASS_DETAILS['Archer'], 20)).toEqual([]);
    expect(suitsAptitudes(peter, CLASS_DETAILS['Archer'])).toBe(true);
  });

  it('treats Brawling as gauntlet training', () => {
    expect(suitsAptitudes(CHARACTER_DETAILS['Tahonia'], CLASS_DETAILS['Pugilist'])).toBe(true);
  });
});
