import { TestBed } from '@angular/core/testing';
import { PlannerStore } from './planner-store';

describe('PlannerStore recruited units', () => {
  beforeEach(() => localStorage.clear());

  it('lists a unit once it is edited and drops it on reset', () => {
    const store = TestBed.inject(PlannerStore);
    store.selectedName.set('Diego');
    expect(store.plannedUnits()).toEqual([]);

    store.updatePlan((p) => ({ ...p, startLevel: 3 }));
    expect(store.plannedUnits()).toEqual(['Diego']);
    expect(store.planFor('Diego').startLevel).toBe(3);

    store.resetPlan();
    expect(store.plannedUnits()).toEqual([]);
  });

  it('ticks and unticks recruited without losing edits', () => {
    const store = TestBed.inject(PlannerStore);
    store.selectedName.set('Diego');
    store.setRecruited(true);
    expect(store.recruited()).toBe(true);

    store.updatePlan((p) => ({ ...p, startLevel: 5 }));
    store.setRecruited(false);
    expect(store.plannedUnits()).toEqual([]);
    expect(store.planFor('Diego').startLevel).toBe(5);

    store.updatePlan((p) => ({ ...p, startLevel: 6 }));
    expect(store.recruited()).toBe(true);
  });
});
