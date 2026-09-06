/** A platform shown in the Find me online section. */
export interface ContactPlatform {
  name: string;
  /** Full profile URL, opened in a new tab. */
  url: string;
  /**
   * Path to the logo, relative to the site base href (files live in public/).
   * public/logos/ follows the Simple Icons convention the Skills tiles use:
   * a 24x24 monochrome glyph recoloured to --text, so the two grids match.
   */
  logo: string;
}

/**
 * Add a platform by adding an entry here and an SVG (or PNG) at the matching
 * path under public/logos/. The grid wraps to new rows on its own.
 */
export const CONTACT_PLATFORMS: ContactPlatform[] = [
  { name: 'GitHub', url: 'https://github.com/Frenchiehl2', logo: 'logos/github.svg' },
  { name: 'YouTube', url: 'https://www.youtube.com/@Frenchie-f1c', logo: 'logos/youtube.svg' },
  {
    name: 'Discord',
    url: 'https://discord.com/users/269142111042011138',
    logo: 'logos/discord.svg',
  },
  { name: 'Sketchfab', url: 'https://sketchfab.com/frenchiehl2', logo: 'logos/sketchfab.svg' },
];
