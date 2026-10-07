import { Component, computed, input, linkedSignal } from '@angular/core';

/** Where the in-game portraits are hosted; the art isn't bundled with the app. */
export const PORTRAIT_BASE = 'https://fortunesweave.co.uk/images/portrait/';

/** "Sha Lan" → "sha-lan", the portrait's file name. */
export function portraitSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** A stable hue per faction so placeholder badges group visually. */
export function factionHue(faction: string): number {
  let hash = 0;
  for (const char of faction) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

/**
 * Shows a unit's in-game portrait from the fan site, or an initials badge in the faction's
 * colour when it can't load (offline, or the site moved it).
 */
@Component({
  selector: 'app-unit-portrait',
  templateUrl: './unit-portrait.html',
  styleUrl: './unit-portrait.scss',
})
export class UnitPortrait {
  readonly name = input.required<string>();
  readonly faction = input.required<string>();
  /** A thumbnail-sized picture, for lists. */
  readonly small = input(false);

  protected readonly gameSrc = computed(() => `${PORTRAIT_BASE}${portraitSlug(this.name())}.webp`);
  /** Resets for each unit; flips to false when the portrait can't be loaded. */
  protected readonly gameOk = linkedSignal({ source: this.name, computation: () => true });
  protected readonly initials = computed(() => initials(this.name()));
  protected readonly hue = computed(() => factionHue(this.faction()));
}
