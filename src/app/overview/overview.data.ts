import { Lang } from '../shared/language';
import { loadDocument } from '../content/load-entries';
import { requireString } from '../content/frontmatter';
import overview from '../../content/overview';

/** The intro section, loaded from src/content/overview. */
export interface Overview {
  location: string;
  focus: string;
  email: string;
  /** Raw Markdown body — the intro paragraphs. */
  body: string;
}

export const OVERVIEW: Record<Lang, Overview> = loadDocument(
  overview,
  'overview',
  (fields, body, label) => ({
    location: requireString(fields, 'location', label),
    focus: requireString(fields, 'focus', label),
    email: requireString(fields, 'email', label),
    body,
  }),
);

/**
 * Portrait shown beside the masthead — the same image in both languages.
 * Swap src/content/overview/portrait.svg for a real photograph; if the format
 * changes, update the import in that folder's index.ts.
 */
export const PORTRAIT: string = overview.portrait;
