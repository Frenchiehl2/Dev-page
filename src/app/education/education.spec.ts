import { TestBed } from '@angular/core/testing';
import { Education } from './education';
import { EDUCATION } from './education.data';

describe('Education', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [Education] }).compileComponents();
    const fixture = TestBed.createComponent(Education);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders one entry per loaded qualification, newest first', async () => {
    const el = await render();
    const entries = el.querySelectorAll('.entry');

    // Deliberately no hardcoded count: the array is meant to grow, and a
    // literal here would fail every time an entry is added.
    expect(entries.length).toBe(EDUCATION.en.length);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].querySelector('h3')?.textContent).toBe(EDUCATION.en[0].degree);
  });

  it('pulls the header fields from frontmatter', async () => {
    const el = await render();
    const first = el.querySelector('.entry')!;

    expect(first.querySelector('.org')?.textContent).toContain('Delft University of Technology');
    expect(first.querySelector('.dates')?.textContent).toContain('2015');
  });

  it('renders the Markdown body as HTML, not escaped text', async () => {
    const el = await render();
    const body = el.querySelector('.entry .markdown-body');

    expect(body?.querySelector('p')).toBeTruthy();
    expect(body?.textContent).toContain('distributed systems');
    expect(body?.textContent).not.toContain('institution:');
  });
});
