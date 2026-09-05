import { WorkEntry, loadWorkEntries } from '../content/work-entry';
import tideline from '../../content/projects/tideline';
import palletjack from '../../content/projects/palletjack';
import marginalia from '../../content/projects/marginalia';

/** A single portfolio project, loaded from its Markdown files in src/content/projects. */
export type Project = WorkEntry;

/**
 * Each project folder exports its own content and banner from an index.ts.
 *
 * Add a project by creating src/content/projects/<slug>/ with en.md, de.md,
 * banner.svg and an index.ts pairing them, then adding one import and one
 * entry here. Vite's import.meta.glob would discover them automatically, but
 * it is not available in the esbuild-based production build, so the list stays
 * explicit.
 */
const SOURCES = { tideline, palletjack, marginalia };

export const PROJECTS = loadWorkEntries(SOURCES, 'projects');
