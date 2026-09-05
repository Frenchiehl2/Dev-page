import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Home } from './home/home';
import { SKILLS } from './skills/skills.data';
import { Language } from './shared/language';
import { UI_TEXT } from './shared/ui-text';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('Home', () => {
  // The Language service persists to real localStorage, so without this a test
  // that switches to German would leak into whichever test ran next.
  afterEach(() => {
    try {
      localStorage.removeItem('lang');
    } catch {
      // Storage unavailable; nothing to clean up.
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the person name in the masthead', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Aleksa Lukic');
  });

  it('should render a skill tile with a logo and name for each skill', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const tiles = compiled.querySelectorAll('.skills .tile');
    expect(tiles.length).toBe(SKILLS.length);
    expect(tiles[0].querySelector('img')?.getAttribute('src')).toBe(SKILLS[0].logo);
    expect(tiles[0].textContent).toContain(SKILLS[0].name);
  });

  it('should place the skills section before the projects section', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const headings = [...compiled.querySelectorAll('section > h2')].map((h) => h.textContent);
    expect(headings).toEqual([
      'Overview',
      'Skills',
      'Commercial Releases',
      'Projects',
      'Practical Experience',
      'Education',
      'Contact',
      'Find me online',
    ]);
  });

  it('should link each project card to its detail route', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // Scoped to .projects: Commercial Releases renders the same card markup.
    const cards = compiled.querySelectorAll('.projects a.card');
    expect(cards.length).toBe(3);
    expect(cards[0].getAttribute('href')).toBe('/projects/tideline');
  });

  it('switches every heading and the article content to German', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const headings = () => [...compiled.querySelectorAll('section > h2')].map((h) => h.textContent);
    expect(headings()).toEqual([
      UI_TEXT.en.overview,
      UI_TEXT.en.skills,
      UI_TEXT.en.commercialReleases,
      UI_TEXT.en.projects,
      UI_TEXT.en.experience,
      UI_TEXT.en.education,
      UI_TEXT.en.contact,
      UI_TEXT.en.findMeOnline,
    ]);

    TestBed.inject(Language).set('de');
    await fixture.whenStable();

    // Chrome switched...
    expect(headings()).toEqual([
      UI_TEXT.de.overview,
      UI_TEXT.de.skills,
      UI_TEXT.de.commercialReleases,
      UI_TEXT.de.projects,
      UI_TEXT.de.experience,
      UI_TEXT.de.education,
      UI_TEXT.de.contact,
      UI_TEXT.de.findMeOnline,
    ]);
    // ...and so did the article content underneath it.
    expect(compiled.querySelector('.role .org')?.textContent).toContain('Rotterdam');
    expect(compiled.querySelector('.projects .card p')?.textContent).toContain('selbst gehostetes');
    expect(compiled.querySelector('.entry h3')?.textContent).toContain('M.Sc.');
  });

  it('keeps project card links identical across languages', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const hrefs = () =>
      [...compiled.querySelectorAll('.projects a.card')].map((a) => a.getAttribute('href'));

    const english = hrefs();
    TestBed.inject(Language).set('de');
    await fixture.whenStable();

    expect(hrefs()).toEqual(english);
  });
});
