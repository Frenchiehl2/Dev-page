import { Localised, loadEntries } from '../content/load-entries';
import { requireString } from '../content/frontmatter';
import tuDelft from '../../content/education/tu-delft';
import hogeschoolRotterdam from '../../content/education/hogeschool-rotterdam';
import hda from '../../content/education/hda';

/** One qualification, loaded from its Markdown files in src/content/education. */
export interface Study {
  slug: string;
  degree: string;
  institution: string;
  dates: string;
  /** Raw Markdown body — the detail sentence. */
  body: string;
}

/**
 * Listed most recent first; this order is the display order.
 *
 * Add a qualification by creating src/content/education/<slug>/ with en.md,
 * de.md and an index.ts pairing them, then adding one import and one entry
 * here.
 */
const SOURCES = {
  'tu-delft': tuDelft,
  'hogeschool-rotterdam': hogeschoolRotterdam,
  'hda':hda,
};

export const EDUCATION: Localised<Study> = loadEntries(
  SOURCES,
  'education',
  (slug, fields, body, label) => ({
    slug,
    degree: requireString(fields, 'degree', label),
    institution: requireString(fields, 'institution', label),
    dates: requireString(fields, 'dates', label),
    body,
  }),
);
