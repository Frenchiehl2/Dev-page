import { Localised, loadEntries } from '../content/load-entries';
import { requireString } from '../content/frontmatter';
import meridianLogistics from '../../content/experience/meridian-logistics';
import kestrelData from '../../content/experience/kestrel-data';
import bellweatherStudio from '../../content/experience/bellweather-studio';

/** One role, loaded from its Markdown files in src/content/experience. */
export interface Role {
  slug: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  /** Raw Markdown body — the responsibility bullets. */
  body: string;
}

/**
 * Listed most recent first; this order is the display order.
 *
 * Add a role by creating src/content/experience/<slug>/ with en.md, de.md and
 * an index.ts pairing them, then adding one import and one entry here.
 */
const SOURCES = {
  'meridian-logistics': meridianLogistics,
  'kestrel-data': kestrelData,
  'bellweather-studio': bellweatherStudio,
};

export const EXPERIENCE: Localised<Role> = loadEntries(
  SOURCES,
  'experience',
  (slug, fields, body, label) => ({
    slug,
    title: requireString(fields, 'title', label),
    company: requireString(fields, 'company', label),
    location: requireString(fields, 'location', label),
    dates: requireString(fields, 'dates', label),
    body,
  }),
);
