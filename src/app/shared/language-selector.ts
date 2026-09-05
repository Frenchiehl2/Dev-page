import { Component, computed, inject } from '@angular/core';
import { Language } from './language';
import { UI_TEXT } from './ui-text';

/**
 * Single-control EN/DE toggle: pressing anywhere on it flips the language.
 *
 * A plain <button> rather than role="switch" — a switch implies on/off, and
 * neither language is meaningfully "off". The knob text is aria-hidden and the
 * button carries an explicit label, since an accessible name of just "EN"
 * would say nothing about what pressing does.
 */
@Component({
  selector: 'app-language-selector',
  styleUrl: './language-selector.css',
  template: `
    <button
      type="button"
      class="switch"
      [class.is-de]="current() === 'de'"
      [attr.aria-label]="t().languageToggle"
      (click)="toggle()"
    >
      <span class="track" aria-hidden="true">
        <span class="knob">{{ current().toUpperCase() }}</span>
      </span>
    </button>
  `,
})
export class LanguageSelector {
  private readonly language = inject(Language);

  protected readonly current = this.language.current;
  protected readonly t = computed(() => UI_TEXT[this.language.current()]);

  protected toggle(): void {
    this.language.toggle();
  }
}
