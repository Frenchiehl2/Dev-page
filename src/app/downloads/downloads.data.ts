import { Lang } from '../shared/language';

/** A file offered in the Downloads section. */
export interface Download {
  /** Button label, per language. */
  label: Record<Lang, string>;
  /** Path relative to the site base href; the file itself lives in public/. */
  file: string;
  /** Optional line under the label, e.g. 'PDF · 82 kB'. Maintained by hand. */
  meta?: string;
}

/**
 * Add a download by dropping the file in public/downloads/ and adding one
 * entry here. The grid wraps to new rows on its own, and the section hides
 * itself entirely while this list is empty.
 *
 * NOTE: adding the first entry makes the Downloads heading appear, which will
 * fail the three expected-heading arrays in src/app/app.spec.ts until
 * 'Downloads' / UI_TEXT.en.downloads / UI_TEXT.de.downloads is added to each.
 *
 * Shape of an entry:
 *
 *   {
 *     label: { en: 'Curriculum Vitae', de: 'Lebenslauf' },
 *     file: 'downloads/cv.pdf',
 *     meta: 'PDF · 82 kB',
 *   }
 */
export const DOWNLOADS: Download[] = [
  {
    label: { en: 'CV', de: 'Lebenslauf' },
    file: 'downloads/Resume.pdf',
    meta: 'PDF · 1 MB',
  },
];
