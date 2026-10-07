import { Injectable, computed, effect, signal } from '@angular/core';
import { CHARACTERS } from '../data/characters';
import { CLASSES } from '../data/classes';
import { StatKey, Stats, emptyStats } from '../data/models';
import { RouteStep, projectRoute } from './growth';

export interface UnitPlan {
  startLevel: number;
  startStats: Stats;
  route: RouteStep[];
}

const STORAGE_KEY = 'fw-planner.v1';

interface SavedState {
  selected: string;
  focus: StatKey[];
  plans: Record<string, UnitPlan>;
}

function defaultPlan(): UnitPlan {
  return { startLevel: 1, startStats: emptyStats(), route: [{ className: 'Commoner', levels: 4 }] };
}

function load(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedState) : null;
  } catch {
    return null;
  }
}

/** Holds the planner state for every unit and persists it to localStorage. */
@Injectable({ providedIn: 'root' })
export class PlannerStore {
  readonly characters = CHARACTERS;
  readonly classes = CLASSES;
  readonly classByName = new Map(CLASSES.map((c) => [c.name, c]));

  private readonly saved = load();

  readonly selectedName = signal(this.saved?.selected ?? CHARACTERS[0].name);
  readonly focus = signal<StatKey[]>(this.saved?.focus ?? ['str', 'spd', 'dex']);
  private readonly plans = signal<Record<string, UnitPlan>>(this.saved?.plans ?? {});

  readonly character = computed(
    () => this.characters.find((c) => c.name === this.selectedName()) ?? this.characters[0],
  );
  readonly plan = computed(() => this.plans()[this.character().name] ?? defaultPlan());
  readonly projection = computed(() => {
    const plan = this.plan();
    return projectRoute(
      this.character().growths,
      plan.startStats,
      plan.startLevel,
      plan.route,
      this.classByName,
    );
  });
  readonly plannedUnits = computed(() => Object.keys(this.plans()));

  constructor() {
    effect(() => {
      const state: SavedState = {
        selected: this.selectedName(),
        focus: this.focus(),
        plans: this.plans(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Storage can be unavailable (private mode); the planner still works in memory.
      }
    });
  }

  updatePlan(change: (plan: UnitPlan) => UnitPlan): void {
    const name = this.character().name;
    const current = this.plan();
    const next = change({
      ...current,
      startStats: { ...current.startStats },
      route: current.route.map((s) => ({ ...s })),
    });
    this.plans.update((plans) => ({ ...plans, [name]: next }));
  }

  resetPlan(): void {
    const name = this.character().name;
    this.plans.update(({ [name]: _removed, ...rest }) => rest);
  }

  toggleFocus(key: StatKey): void {
    this.focus.update((keys) =>
      keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key],
    );
  }
}
