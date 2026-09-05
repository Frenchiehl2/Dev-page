import { TestBed } from '@angular/core/testing';
import { Experience } from './experience';
import { EXPERIENCE } from './experience.data';

describe('Experience', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [Experience] }).compileComponents();
    const fixture = TestBed.createComponent(Experience);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders one entry per loaded role, newest first', async () => {
    const el = await render();
    const roles = el.querySelectorAll('.role');

    // Deliberately no hardcoded count: the array is meant to grow, and a
    // literal here would fail every time a role is added.
    expect(roles.length).toBe(EXPERIENCE.en.length);
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].querySelector('h3')?.textContent).toBe(EXPERIENCE.en[0].title);
  });

  it('pulls the header fields from frontmatter', async () => {
    const el = await render();
    const first = el.querySelector('.role')!;

    expect(first.querySelector('.dates')?.textContent).toContain('2022');
    // company · location
    expect(first.querySelector('.org')?.textContent).toContain('Meridian Logistics');
    expect(first.querySelector('.org')?.textContent).toContain('Rotterdam');
  });

  it('renders the Markdown body as a real list, not escaped text', async () => {
    const el = await render();
    const body = el.querySelector('.role .markdown-body');

    expect(body?.querySelectorAll('li').length).toBe(3);
    expect(body?.textContent).toContain('shared component library');
    // The frontmatter block must not leak into the rendered body.
    expect(body?.textContent).not.toContain('company:');
  });
});
