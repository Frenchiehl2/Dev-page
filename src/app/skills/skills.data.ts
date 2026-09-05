/** A technology shown in the Skills section. */
export interface Skill {
  name: string;
  /**
   * Path to the logo, relative to the site base href (files live in public/).
   * These start as neutral initial-tiles: drop a real logo over the file in
   * public/logos/ and it appears here with no code change.
   */
  logo: string;
}

/**
 * Add a skill by adding an entry here and an SVG (or PNG) at the matching
 * path under public/logos/. The grid wraps to new rows on its own.
 */
export const SKILLS: Skill[] = [
  { name: 'Angular', logo: 'logos/angular.svg' },
  { name: 'TypeScript', logo: 'logos/typescript.svg' },
  { name: 'JavaScript', logo: 'logos/javascript.svg' },
  { name: 'Node', logo: 'logos/node.svg' },
  { name: 'Docker', logo: 'logos/docker.svg' },
  { name: 'Git', logo: 'logos/git.svg' },
];
