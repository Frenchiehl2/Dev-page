import { TestBed } from '@angular/core/testing';
import { Language } from './language';
import { PROJECTS } from '../projects/projects.data';
import { EXPERIENCE } from '../experience/experience.data';
import { EDUCATION } from '../education/education.data';

describe('Language', () => {
  const realStorage = Object.getOwnPropertyDescriptor(window, 'localStorage');

  function useStorage(impl: Partial<Storage>): void {
    Object.defineProperty(window, 'localStorage', { value: impl, configurable: true });
  }

  function inject(): Language {
    TestBed.resetTestingModule();
    return TestBed.inject(Language);
  }

  afterEach(() => {
    if (realStorage) {
      Object.defineProperty(window, 'localStorage', realStorage);
    }
    TestBed.resetTestingModule();
  });

  it('defaults to English', () => {
    useStorage({ getItem: () => null, setItem: () => {} });
    expect(inject().current()).toBe('en');
  });

  it('restores a stored choice', () => {
    useStorage({ getItem: () => 'de', setItem: () => {} });
    expect(inject().current()).toBe('de');
  });

  it('ignores a stored value that is not a supported language', () => {
    useStorage({ getItem: () => 'klingon', setItem: () => {} });
    expect(inject().current()).toBe('en');
  });

  it('falls back to English when storage throws', () => {
    // Some privacy modes throw outright rather than returning null.
    useStorage({
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });

    const language = inject();
    expect(language.current()).toBe('en');
    // Setting must not throw either, it just won't persist.
    expect(() => {
      language.set('de');
      TestBed.tick();
    }).not.toThrow();
    expect(language.current()).toBe('de');
  });

  it('persists the choice and reflects it on the document', () => {
    let saved: string | undefined;
    useStorage({ getItem: () => null, setItem: (_k, v) => void (saved = v) });

    const language = inject();
    language.set('de');
    TestBed.tick();

    expect(saved).toBe('de');
    expect(document.documentElement.lang).toBe('de');
  });
});

describe('content across languages', () => {
  it('uses identical slugs in both languages, so URLs do not change', () => {
    expect(PROJECTS.de.map((p) => p.slug)).toEqual(PROJECTS.en.map((p) => p.slug));
    expect(EXPERIENCE.de.map((r) => r.slug)).toEqual(EXPERIENCE.en.map((r) => r.slug));
    expect(EDUCATION.de.map((s) => s.slug)).toEqual(EDUCATION.en.map((s) => s.slug));
  });

  it('has genuinely different German text, not copied English', () => {
    expect(PROJECTS.de[0].summary).not.toBe(PROJECTS.en[0].summary);
    expect(EXPERIENCE.de[0].title).not.toBe(EXPERIENCE.en[0].title);
    expect(EDUCATION.de[0].degree).not.toBe(EDUCATION.en[0].degree);
  });
});
