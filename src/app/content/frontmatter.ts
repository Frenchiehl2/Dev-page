/**
 * Minimal frontmatter reader for this project's content files.
 *
 * Deliberately NOT a general YAML parser. It supports exactly what the
 * project `.md` files use:
 *
 *   ---
 *   key: a plain string value
 *   list: [one, two, three]
 *   quoted: "a value with: a colon"
 *   ---
 *
 * Values run to the end of the line. Surrounding single or double quotes are
 * stripped. Inline `[a, b]` arrays become string arrays; their items may be
 * quoted too. Comments, nested maps, multi-line values and `- ` block lists
 * are not supported — use the Markdown body for anything structural.
 *
 * Anything malformed throws, so a typo in a content file fails loudly at
 * startup rather than rendering a silently empty page.
 */

export interface Frontmatter {
  data: Record<string, string | string[]>;
  body: string;
}

const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  const quoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
  return quoted && trimmed.length >= 2 ? trimmed.slice(1, -1) : trimmed;
}

function parseValue(raw: string): string | string[] {
  const trimmed = raw.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (inner === '') {
      return [];
    }
    return inner.split(',').map(stripQuotes);
  }
  return stripQuotes(trimmed);
}

export function parseFrontmatter(source: string, label = 'content'): Frontmatter {
  const match = FRONTMATTER_BLOCK.exec(source);
  if (!match) {
    throw new Error(
      `${label}: missing frontmatter. Expected the file to open with a '---' block.`,
    );
  }

  const data: Record<string, string | string[]> = {};

  for (const line of match[1].split(/\r?\n/)) {
    if (line.trim() === '') {
      continue;
    }

    const separator = line.indexOf(':');
    if (separator === -1) {
      throw new Error(`${label}: frontmatter line is not 'key: value' — ${line.trim()}`);
    }

    const key = line.slice(0, separator).trim();
    if (key === '') {
      throw new Error(`${label}: frontmatter line has an empty key — ${line.trim()}`);
    }

    data[key] = parseValue(line.slice(separator + 1));
  }

  return { data, body: source.slice(match[0].length).trim() };
}

/** Reads a required string field, failing loudly if it is missing or the wrong shape. */
export function requireString(
  data: Record<string, string | string[]>,
  key: string,
  label: string,
): string {
  const value = data[key];
  if (typeof value !== 'string' || value === '') {
    throw new Error(`${label}: frontmatter is missing a '${key}' string.`);
  }
  return value;
}

/** Reads a required list field, failing loudly if it is missing or the wrong shape. */
export function requireList(
  data: Record<string, string | string[]>,
  key: string,
  label: string,
): string[] {
  const value = data[key];
  if (!Array.isArray(value)) {
    throw new Error(`${label}: frontmatter is missing a '${key}' list, e.g. [one, two].`);
  }
  return value;
}
