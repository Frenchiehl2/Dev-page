import { Localised, loadEntries } from '../content/load-entries';
import { requireString } from '../content/frontmatter';
import ciscoNetworking from '../../content/certificates/cisco-networking';
import jugendForscht from '../../content/certificates/jugend-forscht';

/** One certification, loaded from its Markdown files in src/content/certificates. */
export interface Certificate {
  slug: string;
  name: string;
  issuer: string;
  date: string;
  /** Raw Markdown body — the detail sentence. */
  body: string;
}

/**
 * Listed most recent first; this order is the display order.
 *
 * Add a certificate by creating src/content/certificates/<slug>/ with en.md,
 * de.md and an index.ts pairing them, then adding one import and one entry
 * here.
 */
const SOURCES = { 
  'cisco-networking': ciscoNetworking,
  'jugend-forscht': jugendForscht,
};

export const CERTIFICATES: Localised<Certificate> = loadEntries(
  SOURCES,
  'certificates',
  (slug, fields, body, label) => ({
    slug,
    name: requireString(fields, 'name', label),
    issuer: requireString(fields, 'issuer', label),
    date: requireString(fields, 'date', label),
    body,
  }),
);
