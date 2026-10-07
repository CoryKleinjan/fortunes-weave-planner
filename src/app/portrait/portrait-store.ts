import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'fw-planner.portraits.v1';
/** Uploaded pictures are scaled down to this many pixels on their longest side. */
const MAX_SIZE = 256;

function load(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

/** Unit pictures the user has chosen, kept in this browser as small data URLs. */
@Injectable({ providedIn: 'root' })
export class PortraitStore {
  readonly pictures = signal<Record<string, string>>(load());

  /** Scales an image file down and saves it as the unit's picture. */
  async setFromFile(unit: string, file: File): Promise<void> {
    this.save(unit, await shrink(file));
  }

  remove(unit: string): void {
    this.pictures.update(({ [unit]: _removed, ...rest }) => rest);
    this.persist();
  }

  private save(unit: string, dataUrl: string): void {
    this.pictures.update((pictures) => ({ ...pictures, [unit]: dataUrl }));
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pictures()));
    } catch {
      // Storage full or unavailable: the picture still shows until the page reloads.
    }
  }
}

async function shrink(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/webp', 0.85);
}
