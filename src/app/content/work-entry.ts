import { Localised, Sources, loadEntries } from './load-entries';
import { optionalString, requireList, requireString } from './frontmatter';

/**
 * A piece of work shown as a card and given its own detail page — a portfolio
 * project or a commercial release. Both are loaded from a folder of Markdown
 * files under src/content with an identical set of frontmatter fields.
 */
export interface WorkEntry {
  /** URL segment for the detail route, e.g. /projects/vulkan-renderer — same in every language. */
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
  /**
   * Width-descriptor candidates for the banner, so a phone fetches a file its
   * slot can use rather than the full 1200px master. Absent for a vector
   * banner, which needs no ladder -- bind it with [attr.srcset] so the
   * attribute disappears entirely in that case.
   */
  bannerSrcset?: string;
  /**
   * Where the work itself lives — a repository, a product page. Optional: an
   * entry with nothing to point at simply renders no link.
   */
  url?: string;
}

/**
 * The shape each work-entry folder's index.ts exports.
 *
 * The two narrow banners are optional: a folder with a vector banner exports
 * only the one file, and gets no srcset.
 */
type WorkSource = Sources & { banner: string; banner800?: string; banner400?: string };

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
    // Composed here rather than in the template, so neither card nor detail
    // page builds the string itself. Widths match what the variants were
    // generated at; the master is always 1200 wide.
    bannerSrcset:
      source.banner400 && source.banner800
        ? `${source.banner400} 400w, ${source.banner800} 800w, ${source.banner} 1200w`
        : undefined,
    url: optionalString(fields, 'url'),
  }));
}
