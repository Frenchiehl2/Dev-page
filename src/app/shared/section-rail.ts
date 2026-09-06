import { DOCUMENT } from '@angular/common';
import {
  Component,
  Injector,
  OnDestroy,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Language } from './language';
import { UI_TEXT } from './ui-text';

/** One entry in the rail. */
interface RailSection {
  /** The heading's id, which is also the section's aria-labelledby. */
  id: string;
  label: string;
}

/**
 * A band across the upper third of the viewport. Whichever section overlaps it
 * is the one being read.
 */
const BAND = '-25% 0px -65% 0px';

/**
 * Fixed rail on the left edge that tracks which section is on screen, and
 * scrolls to one when its tick is pressed.
 *
 * The list is derived from the page rather than kept here: every section in the
 * app is a <section aria-labelledby="x-heading"> wrapping an <h2 id="x-heading">,
 * so the rail reads that contract and stays correct as sections are added,
 * renamed or reordered. It also means the rail empties itself on routes that
 * have no sections, such as the project detail pages.
 */
@Component({
  selector: 'app-section-rail',
  styleUrl: './section-rail.css',
  template: `
    @if (sections().length) {
      <nav class="rail" [attr.aria-label]="t().sections">
        @for (section of sections(); track section.id) {
          <button
            type="button"
            class="tick"
            [class.is-active]="section.id === activeId()"
            [attr.aria-current]="section.id === activeId() ? 'true' : null"
            (click)="jumpTo(section.id)"
          >
            <span class="mark" aria-hidden="true"></span>
            <span class="label">{{ section.label }}</span>
          </button>
        }
      </nav>
    }
  `,
})
export class SectionRail implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly language = inject(Language);
  private readonly injector = inject(Injector);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly sections = signal<RailSection[]>([]);
  protected readonly activeId = signal<string | null>(null);

  /** Section elements by heading id, for observing and for scrolling to. */
  private readonly elements = new Map<string, HTMLElement>();
  private observer?: IntersectionObserver;
  private frame?: number;

  constructor() {
    // Rebuild when the routed component changes.
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.scheduleScan());

    // Labels are read from heading text, so they change with the language.
    effect(() => {
      this.language.current();
      this.scheduleScan();
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.document.defaultView?.removeEventListener('scroll', this.onScroll);
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
  }

  protected jumpTo(id: string): void {
    const target = this.elements.get(id);
    if (!target) {
      return;
    }
    const reduced = this.document.defaultView?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  /** Deferred, so the routed component's sections exist before we look. */
  private scheduleScan(): void {
    afterNextRender(() => this.scan(), { injector: this.injector });
  }

  private scan(): void {
    // No IntersectionObserver (jsdom, very old browsers): render nothing rather
    // than a rail that cannot track anything. Mirrors the guard in reveal.ts.
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const found = [...this.document.querySelectorAll<HTMLElement>('main section[aria-labelledby]')];

    this.elements.clear();
    const entries: RailSection[] = [];

    for (const element of found) {
      const id = element.getAttribute('aria-labelledby');
      const label = id ? this.document.getElementById(id)?.textContent?.trim() : undefined;
      if (!id || !label) {
        continue;
      }
      this.elements.set(id, element);
      entries.push({ id, label });
    }

    this.sections.set(entries);
    this.observe();
  }

  private observe(): void {
    this.observer?.disconnect();
    const view = this.document.defaultView;
    view?.removeEventListener('scroll', this.onScroll);

    if (!this.elements.size) {
      this.activeId.set(null);
      return;
    }

    const visible = new Set<string>();
    this.observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const id = record.target.getAttribute('aria-labelledby');
          if (!id) {
            continue;
          }
          if (record.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        }
        // First in document order, so a transition between two sections settles
        // on one value instead of flickering between them.
        const current = [...this.elements.keys()].find((id) => visible.has(id));
        if (current) {
          this.activeId.set(current);
        }
      },
      { rootMargin: BAND },
    );

    for (const element of this.elements.values()) {
      this.observer.observe(element);
    }

    // The last section may sit below the band once the page has bottomed out,
    // so it would never light up on its own.
    view?.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private readonly onScroll = (): void => {
    if (this.frame !== undefined) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      const view = this.document.defaultView;
      if (!view) {
        return;
      }
      const atBottom =
        view.scrollY + view.innerHeight >= this.document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const ids = [...this.elements.keys()];
        const last = ids[ids.length - 1];
        if (last) {
          this.activeId.set(last);
        }
      }
    });
  };
}
