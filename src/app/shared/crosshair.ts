import { Component, ElementRef, OnDestroy, OnInit, inject, signal } from '@angular/core';

/** Pointers that can hover precisely — a mouse or trackpad, never touch. */
const DESKTOP_POINTER = '(hover: hover) and (pointer: fine)';

/**
 * Crosshair reticle that follows the mouse: full-width and full-height rules
 * meeting under the pointer, with corner brackets marking the intersection.
 *
 * Deliberately part of the backdrop rather than an overlay — the host sits at
 * z-index -1, so it paints behind every piece of content (see crosshair.css).
 * The native cursor is left alone on top of it, so pointer, text and resize
 * shapes still read normally and nothing is lost if this never runs.
 *
 * Desktop only, tested by pointer capability rather than screen width or user
 * agent: a phone or tablet reports no fine pointer and gets nothing, while a
 * tablet with a mouse attached correctly does.
 *
 * The app is zoneless, so the mousemove listener triggers no change detection.
 * Coordinates are written straight to the host as custom properties rather
 * than through a binding, keeping this off the framework's path entirely.
 */
@Component({
  selector: 'app-crosshair',
  styleUrl: './crosshair.css',
  template: `
    @if (enabled()) {
      <div class="line line--x"></div>
      <div class="line line--y"></div>
      <div class="target">
        <span class="bracket bracket--tl"></span>
        <span class="bracket bracket--tr"></span>
        <span class="bracket bracket--bl"></span>
        <span class="bracket bracket--br"></span>
      </div>
    }
  `,
  host: { 'aria-hidden': 'true' },
})
export class Crosshair implements OnInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  /** matchMedia is absent in jsdom, so the query is optional-called. */
  private readonly query = window.matchMedia?.(DESKTOP_POINTER);

  protected readonly enabled = signal(this.query?.matches ?? false);

  /** Latest pointer position, written to the DOM once per frame. */
  private x = 0;
  private y = 0;
  private frame?: number;

  ngOnInit(): void {
    // Re-evaluate when a mouse is attached or removed mid-session.
    this.query?.addEventListener('change', this.onQueryChange);

    if (this.enabled()) {
      this.listen();
    }
  }

  ngOnDestroy(): void {
    this.query?.removeEventListener('change', this.onQueryChange);
    this.stop();
  }

  private readonly onQueryChange = (event: MediaQueryListEvent): void => {
    this.enabled.set(event.matches);
    if (event.matches) {
      this.listen();
    } else {
      this.stop();
    }
  };

  private listen(): void {
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('mouseleave', this.onMouseLeave);
  }

  private stop(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  }

  /**
   * Stores the position and queues a single frame. A fast mouse fires far more
   * events than there are frames, so writing on every event would be wasted
   * style recalculation.
   */
  private readonly onMouseMove = (event: MouseEvent): void => {
    this.x = event.clientX;
    this.y = event.clientY;

    if (this.frame !== undefined) {
      return;
    }
    this.frame = requestAnimationFrame(this.draw);
  };

  private readonly draw = (): void => {
    this.frame = undefined;
    const host = this.element.nativeElement;
    host.style.setProperty('--cx', `${this.x}px`);
    host.style.setProperty('--cy', `${this.y}px`);
    // Held back until the first move, so the reticle is never parked in the
    // top-left corner before the mouse has been used.
    host.classList.add('is-visible');
  };

  private readonly onMouseLeave = (): void => {
    this.element.nativeElement.classList.remove('is-visible');
  };
}
