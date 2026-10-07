import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { abilityEffect } from '../data/abilities';
import {
  CatalogAbility,
  SKILL_ABILITIES,
  catalogAbility,
  uniqueAbilitiesFor,
} from '../data/ability-catalog';
import { ClassTier, STAT_KEYS, STAT_LABELS, StatKey, TIERS } from '../data/models';
import { DEFAULT_ABILITY_SLOTS, planAbilities } from './ability-plan';
import { classWarnings, statsInClass, suitsAptitudes } from './class-checks';
import { effectiveGrowths, focusScore } from './growth';
import { UnitPortrait } from '../portrait/unit-portrait';
import { PlannerStore } from './planner-store';

@Component({
  selector: 'app-planner',
  imports: [DecimalPipe, UnitPortrait],
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
        return {
          gameClass: c,
          growths,
          score: focusScore(growths, focus),
          suits: suitsAptitudes(this.store.details(), this.store.classDetails[c.name]),
        };
      })
      .sort((a, b) => b.score - a.score);
  });

  protected readonly finalLevel = computed(() => {
    const steps = this.store.projection();
    return steps.length ? steps[steps.length - 1].endLevel : this.store.plan().startLevel;
  });

  /** Warnings for each route step, by step index. */
  protected readonly stepWarnings = computed(() => {
    const plan = this.store.plan();
    const name = this.store.character().name;
    const unit = this.store.details();
    let level = plan.startLevel;
    return plan.route.map((step, i) => {
      // A unit already in its joining class never sits that class's exam.
      const joined = i === 0 && step.className === unit?.startingClass;
      const warnings = joined
        ? []
        : classWarnings(name, unit, step.className, this.store.classDetails[step.className], level);
      level += Math.max(0, step.levels);
      return warnings;
    });
  });

  /** Final projected stats as shown in the last class: class bonuses added, caps applied. */
  protected readonly inGame = computed(() => {
    const steps = this.store.projection();
    const last = steps[steps.length - 1];
    if (!last) return null;
    const details = this.store.classDetails[last.gameClass.name];
    return {
      className: last.gameClass.name,
      bonusesKnown: !!details?.baseBonuses,
      stats: statsInClass(last.totals, details, this.store.plan().caps ?? {}),
    };
  });

  protected readonly abilityEffect = abilityEffect;

  protected readonly abilitySlots = computed(
    () => this.store.plan().abilitySlots ?? DEFAULT_ABILITY_SLOTS,
  );

  /** Innate, learned and equipped abilities for each route step. */
  protected readonly abilitySteps = computed(() => {
    const plan = this.store.plan();
    return planAbilities(
      plan.route,
      plan.startLevel,
      this.store.details(),
      this.store.classDetails,
      plan.customAbilities ?? [],
      abilityEffect,
    );
  });

  /** Every ability the unit learns over the whole route, in the order it's gained. */
  protected readonly learnedAbilities = computed(() => {
    const steps = this.abilitySteps();
    const last = steps[steps.length - 1];
    return last ? [...last.available, ...last.gained] : [];
  });

  /** Abilities from the game's list the user can add for this unit. */
  protected readonly uniqueChoices = computed(() =>
    uniqueAbilitiesFor(this.store.character().name),
  );
  protected readonly skillChoices = SKILL_ABILITIES;

  /** The add-ability form's fields, so picking from the list can fill them in. */
  protected readonly draftName = signal('');
  protected readonly draftEffect = signal('');
  protected readonly draftLevel = signal<number | null>(null);
  private draftSource: string | undefined;

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

  protected setCap(key: StatKey, value: string): void {
    this.store.updatePlan((p) => {
      const caps = { ...p.caps };
      const n = Number.parseInt(value, 10);
      if (Number.isFinite(n) && n > 0) caps[key] = n;
      else delete caps[key];
      return { ...p, caps };
    });
  }

  protected toggleMastered(index: number): void {
    this.store.updatePlan((p) => {
      p.route[index].mastered = !p.route[index].mastered;
      return p;
    });
  }

  protected toggleEquip(index: number, name: string): void {
    this.store.updatePlan((p) => {
      const step = p.route[index];
      const equipped = step.equipped ?? [];
      step.equipped = equipped.includes(name)
        ? equipped.filter((n) => n !== name)
        : [...equipped, name];
      return p;
    });
  }

  /** Copies this step's equipped abilities onto every later step. */
  protected carryEquipsForward(index: number): void {
    this.store.updatePlan((p) => {
      const equipped = p.route[index].equipped ?? [];
      p.route.slice(index + 1).forEach((step) => (step.equipped = [...equipped]));
      return p;
    });
  }

  protected setAbilitySlots(value: string): void {
    this.store.updatePlan((p) => ({ ...p, abilitySlots: toInt(value, DEFAULT_ABILITY_SLOTS) }));
  }

  /** Fills the add-ability form from the game's list. */
  protected pickAbility(name: string): void {
    const ability = catalogAbility(name);
    if (!ability) return;
    this.draftName.set(ability.name);
    this.draftEffect.set(ability.effect);
    this.draftLevel.set(ability.level ?? null);
    this.draftSource = ability.gainedBy;
  }

  protected typeDraftName(name: string): void {
    this.draftName.set(name);
    // A hand-typed ability isn't the one picked from the list any more.
    if (catalogAbility(name)?.gainedBy !== this.draftSource) this.draftSource = undefined;
  }

  protected addCustomAbility(): void {
    const trimmed = this.draftName().trim();
    if (!trimmed) return;
    const source = this.draftSource;
    this.store.updatePlan((p) => ({
      ...p,
      customAbilities: [
        ...(p.customAbilities ?? []).filter((a) => a.name !== trimmed),
        {
          name: trimmed,
          effect: this.draftEffect().trim(),
          level: this.draftLevel() ?? p.startLevel,
          ...(source ? { source } : {}),
        },
      ],
    }));
    this.draftName.set('');
    this.draftEffect.set('');
    this.draftLevel.set(null);
    this.draftSource = undefined;
  }

  protected setDraftLevel(value: string): void {
    const n = Number.parseInt(value, 10);
    this.draftLevel.set(Number.isFinite(n) && n > 0 ? n : null);
  }

  protected removeCustomAbility(name: string): void {
    this.store.updatePlan((p) => ({
      ...p,
      customAbilities: (p.customAbilities ?? []).filter((a) => a.name !== name),
    }));
  }

  protected setStepClass(index: number, className: string): void {
    this.store.updatePlan((p) => {
      p.route[index].className = className;
      // Mastery belongs to the old class, so a new class starts unmastered.
      p.route[index].mastered = false;
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
