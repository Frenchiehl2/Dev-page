import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';

describe('ProjectDetail routing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    }).compileComponents();
  });

  it('renders the project matching the :slug route param', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/vulkan-renderer');

    const text = (harness.routeNativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Vulkan Renderer');
    expect(text).toContain('Sole author');
    // Detail-page-only content: a highlight, which never appears on the card.
    expect(text).toContain('surface-mesh handling');
    expect(text).not.toContain('Pizza Service');
  });

  it('renders the Markdown body as HTML rather than escaped text', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/vulkan-renderer');

    const body = (harness.routeNativeElement as HTMLElement).querySelector('.markdown-body');
    expect(body).toBeTruthy();
    // The '## Highlights' heading and '- ' list became real elements.
    expect(body?.querySelector('h2')?.textContent).toContain('Highlights');
    expect(body?.querySelectorAll('li').length).toBe(3);
    // The frontmatter block itself must not leak into the rendered body.
    expect(body?.textContent).not.toContain('tags:');
  });

  it('shows a not-found message for an unknown slug', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/nope');

    const text = (harness.routeNativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Project not found');
  });
});
