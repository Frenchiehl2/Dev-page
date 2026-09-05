import { parseFrontmatter, requireList, requireString } from './frontmatter';

describe('parseFrontmatter', () => {
  it('reads string fields and separates the body', () => {
    const { data, body } = parseFrontmatter(
      ['---', 'title: Tideline', 'role: Sole author', '---', '', 'The body.'].join('\n'),
    );

    expect(data['title']).toBe('Tideline');
    expect(data['role']).toBe('Sole author');
    expect(body).toBe('The body.');
  });

  it('reads inline arrays, trimming and unquoting items', () => {
    const { data } = parseFrontmatter(
      ['---', 'tags: [Angular, "TypeScript", D3]', '---', '', 'x'].join('\n'),
    );

    expect(data['tags']).toEqual(['Angular', 'TypeScript', 'D3']);
  });

  it('keeps colons inside a quoted value', () => {
    const { data } = parseFrontmatter(
      ['---', 'summary: "A tool: for reading"', '---', '', 'x'].join('\n'),
    );

    expect(data['summary']).toBe('A tool: for reading');
  });

  it('throws when the frontmatter block is missing', () => {
    expect(() => parseFrontmatter('Just a body.', 'demo.md')).toThrowError(
      /demo\.md: missing frontmatter/,
    );
  });

  it('throws on a line that is not key: value', () => {
    expect(() =>
      parseFrontmatter(['---', 'title: Ok', 'nonsense', '---', '', 'x'].join('\n'), 'demo.md'),
    ).toThrowError(/not 'key: value'/);
  });
});

describe('required field readers', () => {
  it('throws when a string field is absent or the wrong shape', () => {
    expect(() => requireString({ tags: ['a'] }, 'title', 'demo.md')).toThrowError(
      /missing a 'title' string/,
    );
  });

  it('throws when a list field is absent or the wrong shape', () => {
    expect(() => requireList({ tags: 'not-a-list' }, 'tags', 'demo.md')).toThrowError(
      /missing a 'tags' list/,
    );
  });
});
