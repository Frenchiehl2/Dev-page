import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<div class="target" [appReveal]="2">content</div>`,
})
class Host {}

type StubEntry = {
  isIntersecting: boolean;
  boundingClientRect?: { top: number; height: number };
  rootBounds?: { top: number; height: number };
};
type ObserverCallback = (entries: StubEntry[]) => void;

/** Viewport 0..600, so its centre is 300. */
const VIEWPORT = { top: 0, height: 600 };
const ABOVE_CENTRE = { top: -50, height: 100 }; // centre 0   -> arriving over the top
const BELOW_CENTRE = { top: 500, height: 100 }; // centre 550 -> arriving from below

describe('Reveal', () => {
  const realObserver = globalThis.IntersectionObserver;
  const realMatchMedia = window.matchMedia;

  let trigger: (isIntersecting: boolean, box?: { top: number; height: number }) => void;
  let observedCount: number;
  let disconnected: number;

  function stubObserver(): void {
    observedCount = 0;
    disconnected = 0;
    globalThis.IntersectionObserver = class {
      constructor(private readonly callback: ObserverCallback) {
        trigger = (isIntersecting, box) =>
          this.callback([
            box
              ? { isIntersecting, boundingClientRect: box, rootBounds: VIEWPORT }
              : { isIntersecting },
          ]);
      }
      observe() {
        observedCount++;
      }
      disconnect() {
        disconnected++;
      }
      unobserve() {}
    } as unknown as typeof IntersectionObserver;
  }

  function stubReducedMotion(reduce: boolean): void {
    window.matchMedia = ((query: string) => ({
      matches: reduce,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
  }

  function render(): ComponentFixture<Host> {
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture;
  }

  /** The first reveal is deferred a frame so its transition has a start value. */
  function frame(): Promise<void> {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }

  function target(fixture: ComponentFixture<Host>): HTMLElement {
    return (fixture.nativeElement as HTMLElement).querySelector('.target')!;
  }

  beforeEach(() => {
    stubObserver();
    stubReducedMotion(false);
  });

  afterEach(() => {
    globalThis.IntersectionObserver = realObserver;
    window.matchMedia = realMatchMedia;
    TestBed.resetTestingModule();
  });

  it('hides the element and observes it', () => {
    const el = target(render());
    expect(el.classList).toContain('reveal');
    expect(el.classList).not.toContain('reveal--visible');
    expect(observedCount).toBe(1);
  });

  it('reveals on entering the viewport and hides again on leaving', async () => {
    const el = target(render());

    trigger(true);
    // Not yet: the hidden state must be painted first, or the transition has
    // no start value and the element snaps in instead of fading.
    expect(el.classList).not.toContain('reveal--visible');

    await frame();
    expect(el.classList).toContain('reveal--visible');

    trigger(false);
    expect(el.classList).not.toContain('reveal--visible');
  });

  it('staggers by 60ms per position', () => {
    // The host binds position 2.
    expect(target(render()).style.transitionDelay).toBe('120ms');
  });

  it('disconnects the observer on destroy', () => {
    const fixture = render();
    fixture.destroy();
    expect(disconnected).toBe(1);
  });

  // The important safety property: content must never be left hidden when the
  // reveal cannot run, or the page would render blank.
  it('leaves content visible when IntersectionObserver is unavailable', () => {
    (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = undefined;

    const el = target(render());
    expect(el.classList).not.toContain('reveal');
  });

  it('leaves content visible when the OS asks for reduced motion', () => {
    stubReducedMotion(true);

    const el = target(render());
    expect(el.classList).not.toContain('reveal');
    expect(observedCount).toBe(0);
  });

  describe('entry direction', () => {
    function offsetOf(el: HTMLElement): string {
      return el.style.getPropertyValue('--reveal-offset');
    }

    it('rises on the first reveal over the top edge, but descends on later ones', () => {
      const el = target(render());

      // First entrance is always the conventional upward one...
      trigger(true, ABOVE_CENTRE);
      expect(offsetOf(el)).not.toBe('-16px');

      // ...and only afterwards does the same geometry flip the direction,
      // which is what makes the first-reveal exception load-bearing here.
      trigger(false);
      trigger(true, ABOVE_CENTRE);
      expect(offsetOf(el)).toBe('-16px');
    });

    it('descends when re-entering over the top edge', () => {
      const el = target(render());

      trigger(true, BELOW_CENTRE); // first reveal
      trigger(false); // scrolled past
      trigger(true, ABOVE_CENTRE); // scrolled back up

      expect(offsetOf(el)).toBe('-16px');
    });

    it('rises when re-entering from below', () => {
      const el = target(render());

      trigger(true, BELOW_CENTRE);
      trigger(false);
      trigger(true, BELOW_CENTRE);

      expect(offsetOf(el)).toBe('16px');
    });

    it('resets to sinking downward when it leaves', () => {
      const el = target(render());

      trigger(true, BELOW_CENTRE);
      trigger(false);
      trigger(true, ABOVE_CENTRE); // now offset -16px
      trigger(false);

      expect(offsetOf(el)).toBe('16px');
    });

    it('keeps the stagger delay intact across a direction flip', () => {
      const el = target(render());

      trigger(true, BELOW_CENTRE);
      trigger(false);
      trigger(true, ABOVE_CENTRE);

      // The class-based suppression must not clobber the inline delay.
      expect(el.style.transitionDelay).toBe('120ms');
    });
  });
});
