import { Lang, LANGUAGES } from '../shared/language';
import { parseFrontmatter } from './frontmatter';

/** Frontmatter fields as parsed: plain strings, or inline [a, b] lists. */
export type Fields = Record<string, string | string[]>;

/** The Markdown sources for one entry, keyed by language. */
export type Sources = Record<Lang, string>;

/** Entries of one content type, keyed by language. */
export type Localised<T> = Record<Lang, T[]>;

/**
 * Turns a slug -> per-language Markdown map into typed arrays, one per
 * language.
 *
 * Every content type (projects, experience, education) loads the same way:
 * parse the frontmatter, hand the fields and body to a builder, and label any
 * error with the file it came from so a bad content file names itself.
 *
 * Both languages are parsed once at module load — the sources are small
 * strings, so this is cheaper than parsing lazily on every language switch.
 *
 * `kind` is the folder under src/content, used only for that error label.
 *
 * The builder also receives the whole source entry, so a section can read
 * extra per-folder fields its barrel exports — Projects reads `banner` this
 * way — without needing a second lookup table keyed by slug.
 */
export function loadEntries<T, E extends Sources>(
  sources: Record<string, E>,
  kind: string,
  build: (slug: string, fields: Fields, body: string, label: string, source: E) => T,
): Localised<T> {
  const result = {} as Localised<T>;

  for (const lang of LANGUAGES) {
    result[lang] = Object.entries(sources).map(([slug, source]) => {
      const label = `content/${kind}/${slug}/${lang}.md`;
      const { data, body } = parseFrontmatter(source[lang], label);
      return build(slug, data, body, label, source);
    });
  }

  return result;
}

/** Parses a single non-repeating content file, such as the Overview section. */
export function loadDocument<T>(
  sources: Sources,
  kind: string,
  build: (fields: Fields, body: string, label: string) => T,
): Record<Lang, T> {
  const result = {} as Record<Lang, T>;

  for (const lang of LANGUAGES) {
    const label = `content/${kind}/${lang}.md`;
    const { data, body } = parseFrontmatter(sources[lang], label);
    result[lang] = build(data, body, label);
  }

  return result;
}
