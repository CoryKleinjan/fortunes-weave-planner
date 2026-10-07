import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { PortraitStore } from './portrait-store';

/** "Sha Lan" → "sha-lan", the file name the app looks for under public/portraits/. */
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
 * Shows a unit's picture: one the user uploaded, else `portraits/<slug>.webp` if the
 * site ships one, else an initials badge in the faction's colour.
 */
@Component({
  selector: 'app-unit-portrait',
  templateUrl: './unit-portrait.html',
  styleUrl: './unit-portrait.scss',
})
export class UnitPortrait {
  readonly name = input.required<string>();
  readonly faction = input.required<string>();

  private readonly store = inject(PortraitStore);

  protected readonly uploaded = computed(() => this.store.pictures()[this.name()]);
  protected readonly bundledSrc = computed(() => `portraits/${portraitSlug(this.name())}.webp`);
  /** Resets for each unit; flips to false when the bundled file is missing. */
  protected readonly bundledOk = linkedSignal({ source: this.name, computation: () => true });
  protected readonly initials = computed(() => initials(this.name()));
  protected readonly hue = computed(() => factionHue(this.faction()));

  protected async onFile(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (file) await this.store.setFromFile(this.name(), file);
  }

  protected remove(): void {
    this.store.remove(this.name());
  }
}
