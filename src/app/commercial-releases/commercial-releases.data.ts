import { WorkEntry, loadWorkEntries } from '../content/work-entry';
import makework from '../../content/commercial-releases/makework';
import rustAndRuin from '../../content/commercial-releases/rust-and-ruin';

/** A shipped commercial release. Same shape as a project , see WorkEntry. */
export type CommercialRelease = WorkEntry;

/**
 * Each release folder exports its own content and banner from an index.ts.
 *
 * Listed most recent first; this order is the display order.
 *
 * Add a release by creating src/content/commercial-releases/<slug>/ with
 * en.md, de.md, banner.webp (plus banner-800.webp and banner-400.webp) and an
 * index.ts pairing them, then adding one import and one entry here. Vite's
 * import.meta.glob would discover them automatically, but it is not available
 * in the esbuild-based production build, so the list stays explicit.
 */
const SOURCES = { makework, 'rust-and-ruin': rustAndRuin };

export const COMMERCIAL_RELEASES = loadWorkEntries(SOURCES, 'commercial-releases');
