import { WorkEntry, loadWorkEntries } from '../content/work-entry';
import harbourline from '../../content/commercial-releases/harbourline';
import foxglove from '../../content/commercial-releases/foxglove';

/** A shipped commercial release. Same shape as a project — see WorkEntry. */
export type CommercialRelease = WorkEntry;

/**
 * Each release folder exports its own content and banner from an index.ts.
 *
 * Add a release by creating src/content/commercial-releases/<slug>/ with
 * en.md, de.md, banner.svg and an index.ts pairing them, then adding one
 * import and one entry here. Vite's import.meta.glob would discover them
 * automatically, but it is not available in the esbuild-based production
 * build, so the list stays explicit.
 */
const SOURCES = { harbourline, foxglove };

export const COMMERCIAL_RELEASES = loadWorkEntries(SOURCES, 'commercial-releases');
