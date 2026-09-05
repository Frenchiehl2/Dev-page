import { Injectable, effect, signal } from '@angular/core';

export type Lang = 'en' | 'de';

export const LANGUAGES: readonly Lang[] = ['en', 'de'];

const STORAGE_KEY = 'lang';
const DEFAULT_LANG: Lang = 'en';

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'de';
}

/**
 * The selected interface language, remembered across visits.
 *
 * English is the default; a stored choice wins. Storage access is guarded
 * because reading localStorage throws outright in some privacy modes, and a
 * blocked or corrupted value must fall back rather than break the page.
 */
@Injectable({ providedIn: 'root' })
export class Language {
  readonly current = signal<Lang>(readStored() ?? DEFAULT_LANG);

  constructor() {
    effect(() => {
      const lang = this.current();
      writeStored(lang);
      // Keep the document in sync so assistive tech and crawlers see the
      // language actually on screen.
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    });
  }

  set(lang: Lang): void {
    this.current.set(lang);
  }

  /** Flips to the other language. */
  toggle(): void {
    this.current.update((lang) => (lang === 'en' ? 'de' : 'en'));
  }
}

function readStored(): Lang | undefined {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isLang(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function writeStored(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage unavailable — the choice simply won't persist.
  }
}
