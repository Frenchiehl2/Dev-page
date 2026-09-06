import { WorkEntry, loadWorkEntries } from '../content/work-entry';
import devPage from '../../content/projects/dev-page';
import localLlm from '../../content/projects/local-llm';
import desktopLikeWebsite from '../../content/projects/desktop-like-website';
import webglEditor from '../../content/projects/webgl-editor';
import physicsSimulationFramework from '../../content/projects/physics-simulation-framework';
import vulkanRenderer from '../../content/projects/vulkan-renderer';
import motorControlSimulation from '../../content/projects/motor-control-simulation';
import pizzaService from '../../content/projects/pizza-service';
import coffeeMachine from '../../content/projects/coffee-machine';

/** A single portfolio project, loaded from its Markdown files in src/content/projects. */
export type Project = WorkEntry;

/**
 * Each project folder exports its own content and banner from an index.ts.
 *
 * Listed most recent first; this order is the display order.
 *
 * Add a project by creating src/content/projects/<slug>/ with en.md, de.md,
 * banner.webp and an index.ts pairing them, then adding one import and one
 * entry here. Vite's import.meta.glob would discover them automatically, but
 * it is not available in the esbuild-based production build, so the list stays
 * explicit.
 */
const SOURCES = {
  'dev-page': devPage,
  'local-llm': localLlm,
  'desktop-like-website': desktopLikeWebsite,
  'webgl-editor': webglEditor,
  'physics-simulation-framework': physicsSimulationFramework,
  'vulkan-renderer': vulkanRenderer,
  'motor-control-simulation': motorControlSimulation,
  'pizza-service': pizzaService,
  'coffee-machine': coffeeMachine,
};

export const PROJECTS = loadWorkEntries(SOURCES, 'projects');
