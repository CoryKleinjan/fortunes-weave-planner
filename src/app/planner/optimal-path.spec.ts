import { CHARACTER_DETAILS } from '../data/character-details';
import { CHARACTERS } from '../data/characters';
import { CLASS_DETAILS } from '../data/class-details';
import { CLASSES } from '../data/classes';
import { classWarnings } from './class-checks';
import { optimalPath } from './optimal-path';

function pathFor(name: string, startLevel = 1) {
  const character = CHARACTERS.find((c) => c.name === name)!;
  return optimalPath({
    unitName: name,
    unit: CHARACTER_DETAILS[name],
    personal: character.growths,
    startLevel,
    classes: CLASSES,
    classDetails: CLASS_DETAILS,
  });
}

describe('optimalPath', () => {
  it('plans every level-up to 50 without breaking class rules', () => {
    for (const character of CHARACTERS) {
      const { route } = pathFor(character.name);
      expect(route.reduce((n, s) => n + s.levels, 0)).toBe(49);
      let level = 1;
      for (const step of route) {
        const unit = CHARACTER_DETAILS[character.name];
        if (step.className !== 'Commoner' && step.className !== unit?.startingClass) {
          expect(
            classWarnings(
              character.name,
              unit,
              step.className,
              CLASS_DETAILS[step.className],
              level,
            ),
          ).toEqual([]);
        }
        level += step.levels;
      }
    }
  });

  it('merges repeated classes into one step', () => {
    const { route } = pathFor('Cai');
    for (let i = 1; i < route.length; i++) {
      expect(route[i].className).not.toBe(route[i - 1].className);
    }
  });

  it('starts from the current level and plans nothing at 50', () => {
    expect(pathFor('Cai', 30).route.reduce((n, s) => n + s.levels, 0)).toBe(20);
    expect(pathFor('Cai', 50).route).toEqual([]);
  });

  it('keeps units that cannot mount out of mounted and flying classes', () => {
    const name = CHARACTERS.find((c) => CHARACTER_DETAILS[c.name]?.cannotMount)!.name;
    for (const step of pathFor(name).route) {
      expect(['mounted', 'flying']).not.toContain(CLASS_DETAILS[step.className].movement.kind);
    }
  });
});
