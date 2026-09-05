import { Localised, loadEntries } from '../content/load-entries';
import { requireString } from '../content/frontmatter';
import awsSolutionsArchitect from '../../content/certificates/aws-solutions-architect';
import professionalScrumMaster from '../../content/certificates/professional-scrum-master';
import azureFundamentals from '../../content/certificates/azure-fundamentals';

/** One certification, loaded from its Markdown file in src/content/certificates. */
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
 * Add a certificate by creating src/content/certificates/<slug>/ with a single
 * certificate.md and an index.ts serving it to both languages, then adding one
 * import and one entry here.
 *
 * NOTE ON ERROR MESSAGES: loadEntries builds its label as
 * content/<kind>/<slug>/<lang>.md, so a malformed certificate reports
 * 'content/certificates/<slug>/en.md' even though the file on disk is
 * certificate.md. The filename in the message is wrong; the folder is right.
 *
 * NOTE ON CONTENT: all three entries below are placeholders naming real
 * issuers. Replace them before publishing — unlike a placeholder banner, these
 * read as claims about real credentials.
 */
const SOURCES = {
  'aws-solutions-architect': awsSolutionsArchitect,
  'professional-scrum-master': professionalScrumMaster,
  'azure-fundamentals': azureFundamentals,
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
