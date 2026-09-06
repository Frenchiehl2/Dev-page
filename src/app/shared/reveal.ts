import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject, input } from '@angular/core';
import { PHONE, REDUCED_MOTION, matchesMedia } from './device';

/** Delay between consecutive items in a staggered group. */
const STAGGER_MS = 25;

/** How far an element travels as it reveals. */
const OFFSET_PX = 10;

/**
 * Fades and slides an element into place as it scrolls into view, and back
 * out again when it leaves.
 *
 * Entry direction follows the direction of travel: an element arriving from
 * below rises into place, one arriving from above descends. Direction comes
 * from the element's own geometry, which IntersectionObserver already
 * reports, so there is no scroll listener and no shared scroll state.
 *
 * Use bare for an immediate reveal, or bind a position to stagger a group:
 *
 *   <li class="tile" [appReveal]="$index + 1">
 *
 * The hidden state is applied from script rather than sitting in the
 * stylesheet, so if this never runs — JS disabled, no IntersectionObserver,
 * a phone, reduced motion — the page still renders fully visible instead of
 * blank. See shouldAnimate().
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  /** Position within a staggered group; each step adds STAGGER_MS of delay. */
  readonly appReveal = input<number | string>('');

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  /** Mirrors --reveal-offset, so it is only rewritten when the direction flips. */
  private offsetPx = OFFSET_PX;

  /** First entrance always rises, whatever the geometry says. */
  private revealedBefore = false;

  /** Pending first-reveal frame, cancelled if the element goes away first. */
  private pendingFrame?: number;

  ngOnInit(): void {
    if (!this.shouldAnimate()) {
      return;
    }

    const el = this.element.nativeElement;
    this.renderer.addClass(el, 'reveal');

    const step = Number(this.appReveal()) || 0;
    if (step > 0) {
      this.renderer.setStyle(el, 'transition-delay', `${step * STAGGER_MS}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal(el, entry);
          } else {
            this.hide(el);
          }
        }
      },
      { threshold: 0.12 },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.pendingFrame !== undefined) {
      cancelAnimationFrame(this.pendingFrame);
    }
  }

  private reveal(el: HTMLElement, entry: IntersectionObserverEntry): void {
    const fromAbove = this.revealedBefore && entersFromAbove(entry);
    this.setOffset(el, fromAbove ? -OFFSET_PX : OFFSET_PX);

    if (this.revealedBefore) {
      this.renderer.addClass(el, 'reveal--visible');
      return;
    }
    this.revealedBefore = true;

    /*
     * First reveal, deferred by a frame.
     *
     * For an element already in view at load, IntersectionObserver delivers
     * its first notification in the same frame the observation starts. Adding
     * the hidden and visible classes within one style flush gives the
     * transition no earlier value to start from, so the element snaps in —
     * which is why above-the-fold content used to appear instantly while the
     * rest of the page faded. A frame boundary separates the two states;
     * a forced reflow is not enough when no paint has happened yet.
     *
     * Later reveals stay synchronous: they already animate, and their
     * direction flip depends on the flush inside setOffset().
     */
    if (typeof requestAnimationFrame === 'undefined') {
      this.renderer.addClass(el, 'reveal--visible');
      return;
    }

    this.pendingFrame = requestAnimationFrame(() => {
      this.pendingFrame = undefined;
      this.renderer.addClass(el, 'reveal--visible');
    });
  }

  private hide(el: HTMLElement): void {
    // Exits always sink downward, so reset before the element becomes visible
    // again. Safe to set directly: while reveal--visible is on, the transform
    // is `none` and the property has no effect until the class comes off.
    this.offsetPx = OFFSET_PX;
    el.style.setProperty('--reveal-offset', `${OFFSET_PX}px`);
    this.renderer.removeClass(el, 'reveal--visible');
  }

  /**
   * Moves the element to its start position.
   *
   * Setting the offset and adding reveal--visible in one frame would make the
   * browser transition from the OLD offset, so the flip would never be seen.
   * The reposition is therefore applied with transitions off and flushed
   * first. Suppression uses a class, not `style.transition`, because assigning
   * the shorthand would wipe the inline transition-delay carrying the stagger.
   */
  private setOffset(el: HTMLElement, px: number): void {
    if (px === this.offsetPx) {
      return;
    }
    this.offsetPx = px;

    el.classList.add('reveal--no-transition');
    el.style.setProperty('--reveal-offset', `${px}px`);
    void el.offsetHeight;
    el.classList.remove('reveal--no-transition');
  }

  /**
   * Skip entirely without IntersectionObserver, on a phone, or when the OS asks
   * for less motion.
   *
   * Phones are excluded on cost rather than taste: an observer per revealed
   * element, and a fade and slide every time any of them crosses the threshold,
   * is a poor trade for the frame budget of a small device on a long scroll.
   * Returning false here means the hidden class is never applied and no
   * observer is built, so the content simply paints in place.
   */
  private shouldAnimate(): boolean {
    if (typeof IntersectionObserver === 'undefined') {
      return false;
    }
    if (matchesMedia(PHONE)) {
      return false;
    }
    return !matchesMedia(REDUCED_MOTION);
  }
}

/**
 * True when the element is arriving over the top edge — its centre sits above
 * the viewport's. Falls back to false (rise) when the browser or a test stub
 * supplies no geometry.
 */
function entersFromAbove(entry: IntersectionObserverEntry): boolean {
  const root = entry.rootBounds;
  const box = entry.boundingClientRect;
  if (!root || !box) {
    return false;
  }
  return box.top + box.height / 2 < root.top + root.height / 2;
}
