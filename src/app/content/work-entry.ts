import { Localised, Sources, loadEntries } from './load-entries';
import { requireList, requireString } from './frontmatter';

/**
 * A piece of work shown as a card and given its own detail page — a portfolio
 * project or a commercial release. Both are loaded from a folder of Markdown
 * files under src/content with an identical set of frontmatter fields.
 */
export interface WorkEntry {
  /** URL segment for the detail route, e.g. /projects/tideline — same in every language. */
  slug: string;
  title: string;
  /** Short blurb shown on the card. */
  summary: string;
  tags: string[];
  role: string;
  year: string;
  /** Raw Markdown body, rendered on the detail page. */
  body: string;
  /** URL of the banner image, emitted from src/content by the build. */
  banner: string;
}

/** The shape each work-entry folder's index.ts exports. */
type WorkSource = Sources & { banner: string };

/**
 * Loads one folder of work entries, e.g. src/content/projects.
 *
 * `kind` is the folder name under src/content; loadEntries uses it only to
 * label errors with the file they came from.
 */
export function loadWorkEntries(
  sources: Record<string, WorkSource>,
  kind: string,
): Localised<WorkEntry> {
  return loadEntries(sources, kind, (slug, fields, body, label, source) => ({
    slug,
    title: requireString(fields, 'title', label),
    summary: requireString(fields, 'summary', label),
    tags: requireList(fields, 'tags', label),
    role: requireString(fields, 'role', label),
    year: requireString(fields, 'year', label),
    body,
    // From the folder's own barrel — one banner per entry, shared by both languages.
    banner: source.banner,
  }));
}
