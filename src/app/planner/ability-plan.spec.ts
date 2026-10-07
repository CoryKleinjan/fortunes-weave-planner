import { abilityEffect } from '../data/abilities';
import { CHARACTER_DETAILS } from '../data/character-details';
import { CLASS_DETAILS } from '../data/class-details';
import { planAbilities } from './ability-plan';

const diego = CHARACTER_DETAILS['Diego'];

describe('planAbilities', () => {
  it('lists the personal ability and class skills as always on', () => {
    const [step] = planAbilities(
      [{ className: 'Myrmidon', levels: 5 }],
      20,
      diego,
      CLASS_DETAILS,
      [],
      abilityEffect,
    );
    expect(step.innate).toEqual(['Caretaker', 'Combat Arts +1', 'Sword Crit +3']);
    expect(step.startLevel).toBe(20);
    expect(step.endLevel).toBe(25);
  });

  it('teaches a mastery ability at the end of a mastered step, equippable later', () => {
    const steps = planAbilities(
      [
        { className: 'Myrmidon', levels: 5, mastered: true, equipped: ['Ravaging Arts'] },
        { className: 'Shido', levels: 5, equipped: ['Ravaging Arts'] },
      ],
      20,
      diego,
      CLASS_DETAILS,
      [],
      abilityEffect,
    );
    expect(steps[0].gained.map((a) => a.name)).toEqual(['Ravaging Arts']);
    expect(steps[0].gained[0].level).toBe(25);
    // Not learned until the end of the first step, so it can't be equipped during it.
    expect(steps[0].equipped).toEqual([]);
    expect(steps[0].notYetLearned).toEqual(['Ravaging Arts']);
    expect(steps[1].equipped).toEqual(['Ravaging Arts']);
  });

  it('does not teach mastery for unmastered steps', () => {
    const steps = planAbilities(
      [{ className: 'Archer', levels: 10 }],
      20,
      diego,
      CLASS_DETAILS,
      [],
      abilityEffect,
    );
    expect(steps[0].masterSkill).toBe('Crescendo');
    expect(steps[0].gained).toEqual([]);
  });

  it('adds custom abilities at their level', () => {
    const steps = planAbilities(
      [
        { className: 'Gladiator', levels: 4 },
        { className: 'Myrmidon', levels: 5 },
      ],
      1,
      diego,
      CLASS_DETAILS,
      [
        { name: 'Swords Lv. 1', effect: 'Hit +3', level: 1 },
        { name: 'Swords Lv. 2', effect: '', level: 7 },
      ],
      abilityEffect,
    );
    expect(steps[0].available.map((a) => a.name)).toEqual(['Swords Lv. 1']);
    expect(steps[1].gained.map((a) => a.name)).toEqual(['Swords Lv. 2']);
    expect(steps[1].gained[0].effect).toBeNull();
  });
});
