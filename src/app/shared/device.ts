/**
 * Device and capability tests, kept together so the breakpoints are named once
 * rather than spelled out as string literals wherever they are needed.
 *
 * Every query is evaluated on call, never captured at module scope: jsdom has
 * no matchMedia and the specs install their stub inside beforeEach, long after
 * import time.
 */

/** Pointers that can hover precisely — a mouse or trackpad, never touch. */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

/**
 * Wide enough for the desktop chrome. The same breakpoint at which the section
 * rail already takes itself off the page (section-rail.css), so a tablet loses
 * the rail and the crosshair at the same width.
 */
export const DESKTOP_WIDTH = '(min-width: 1101px)';

/** The narrowest layout tier — the 600px breakpoint used across the stylesheets. */
export const PHONE = '(max-width: 600px)';

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** matchMedia is absent in jsdom, so the query is optional-called. */
export function matchesMedia(query: string): boolean {
  return window.matchMedia?.(query).matches ?? false;
}
