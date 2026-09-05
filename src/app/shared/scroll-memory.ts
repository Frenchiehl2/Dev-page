import { ViewportScroller } from '@angular/common';
import {
  EnvironmentProviders,
  Injectable,
  Injector,
  afterNextRender,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

/**
 * Remembers where each route was scrolled to, and puts it back on return.
 *
 * The router's own scrollPositionRestoration is not enough here: 'top' sends
 * every navigation to the top, and 'enabled' restores only on popstate, while
 * the detail page's back arrow is a routerLink — a forward navigation, which
 * would still land at the top. Watching navigation events instead covers the
 * arrow and the browser's Back button through one code path.
 *
 * Positions are held per tab and deliberately not persisted, so a refresh
 * starts at the top. A route with nothing remembered opens at the top too,
 * which is the behaviour the app had before.
 */
@Injectable({ providedIn: 'root' })
export class ScrollMemory {
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);
  private readonly injector = inject(Injector);

  /** Vertical offset per URL, keyed the same way NavigationEnd reports it. */
  private readonly positions = new Map<string, number>();

  constructor() {
    // Take over from the browser's own popstate restoration, which would
    // otherwise race this one on Back.
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        // router.url is still the page being left.
        this.positions.set(this.router.url, this.viewport.getScrollPosition()[1]);
      } else if (event instanceof NavigationEnd) {
        // urlAfterRedirects, so the '**' route resolves to the same '/' key
        // the home page stored itself under.
        this.restore(this.positions.get(event.urlAfterRedirects) ?? 0);
      }
    });
  }

  /**
   * Scrolls once the incoming route has rendered — at NavigationEnd the new
   * view is created but not yet laid out, so the target offset may still be
   * taller than the document.
   */
  private restore(y: number): void {
    afterNextRender(() => this.viewport.scrollToPosition([0, y]), { injector: this.injector });
  }
}

/**
 * Starts ScrollMemory at bootstrap, so it is listening before the first
 * navigation completes.
 */
export function provideScrollMemory(): EnvironmentProviders {
  return provideAppInitializer(() => {
    inject(ScrollMemory);
  });
}
