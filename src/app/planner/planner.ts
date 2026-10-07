import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ClassTier, STAT_KEYS, STAT_LABELS, StatKey, TIERS } from '../data/models';
import { effectiveGrowths, focusScore } from './growth';
import { PlannerStore } from './planner-store';

@Component({
  selector: 'app-planner',
  imports: [DecimalPipe],
  templateUrl: './planner.html',
  styleUrl: './planner.scss',
})
export class Planner {
  protected readonly store = inject(PlannerStore);
  protected readonly statKeys = STAT_KEYS;
  protected readonly labels = STAT_LABELS;
  protected readonly tiers = TIERS;

  protected readonly factions = computed(() => {
    const groups = new Map<string, string[]>();
    for (const c of this.store.characters) {
      groups.set(c.faction, [...(groups.get(c.faction) ?? []), c.name]);
    }
    return [...groups].map(([faction, names]) => ({ faction, names }));
  });

  protected readonly classesByTier = TIERS.map((t) => ({
    ...t,
    classes: this.store.classes.filter((c) => c.tier === t.id),
  }));

  protected readonly fitTier = signal<ClassTier | 'all'>('all');

  /** Every class ranked by how well this unit grows in the focus stats. */
  protected readonly classFit = computed(() => {
    const personal = this.store.character().growths;
    const focus = this.store.focus();
    const tier = this.fitTier();
    return this.store.classes
      .filter((c) => tier === 'all' || c.tier === tier)
      .map((c) => {
        const growths = effectiveGrowths(personal, c);
        return { gameClass: c, growths, score: focusScore(growths, focus) };
      })
      .sort((a, b) => b.score - a.score);
  });

  protected readonly finalLevel = computed(() => {
    const steps = this.store.projection();
    return steps.length ? steps[steps.length - 1].endLevel : this.store.plan().startLevel;
  });

  protected selectUnit(name: string): void {
    this.store.selectedName.set(name);
  }

  protected setStartLevel(value: string): void {
    this.store.updatePlan((p) => ({ ...p, startLevel: toInt(value, 1) }));
  }

  protected setStartStat(key: StatKey, value: string): void {
    this.store.updatePlan((p) => {
      p.startStats[key] = toInt(value, 0);
      return p;
    });
  }

  protected setStepClass(index: number, className: string): void {
    this.store.updatePlan((p) => {
      p.route[index].className = className;
      return p;
    });
  }

  protected setStepLevels(index: number, value: string): void {
    this.store.updatePlan((p) => {
      p.route[index].levels = toInt(value, 0);
      return p;
    });
  }

  protected moveStep(index: number, delta: number): void {
    this.store.updatePlan((p) => {
      const target = index + delta;
      if (target < 0 || target >= p.route.length) return p;
      [p.route[index], p.route[target]] = [p.route[target], p.route[index]];
      return p;
    });
  }

  protected removeStep(index: number): void {
    this.store.updatePlan((p) => ({ ...p, route: p.route.filter((_, i) => i !== index) }));
  }

  protected addStep(className = 'Commoner'): void {
    this.store.updatePlan((p) => ({ ...p, route: [...p.route, { className, levels: 5 }] }));
  }

  protected setFitTier(value: string): void {
    this.fitTier.set(value as ClassTier | 'all');
  }

  protected tierLabel(tier: ClassTier): string {
    return TIERS.find((t) => t.id === tier)?.label ?? tier;
  }

  /** Colour band for a growth value so strong and weak growths stand out. */
  protected growthClass(value: number): string {
    if (value >= 70) return 'g-high';
    if (value >= 50) return 'g-good';
    if (value >= 30) return 'g-mid';
    return 'g-low';
  }
}

function toInt(value: string, fallback: number): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}
