import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { OVERVIEW } from '../overview/overview.data';

/** How long the copy confirmation stays on the button. */
const COPIED_MS = 2000;

/**
 * Contact form at the foot of the profile.
 *
 * There is no server behind this site, so Send is a mailto: link rather than a
 * request: the visitor's own mail client opens prefilled and they send it
 * themselves. The section says so in as many words, because a Send button that
 * opens a mail app is otherwise a surprise.
 *
 * The address comes from the Overview content, not a second copy, so it can
 * never drift from the one printed in the facts further up the page.
 */
@Component({
  imports: [Reveal],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact implements OnDestroy {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly email = computed(() => OVERVIEW[this.language.current()].email);

  protected readonly subject = signal('');
  protected readonly message = signal('');
  protected readonly copied = signal(false);

  private copiedTimer?: ReturnType<typeof setTimeout>;

  /**
   * Both parts are percent-encoded: an unescaped newline or '&' in the message
   * would otherwise cut the body short at that character.
   */
  protected readonly mailto = computed(
    () =>
      `mailto:${this.email()}` +
      `?subject=${encodeURIComponent(this.subject())}` +
      `&body=${encodeURIComponent(this.message())}`,
  );

  ngOnDestroy(): void {
    clearTimeout(this.copiedTimer);
  }

  /**
   * Copies the address, guarded: navigator.clipboard is undefined outside a
   * secure context and the write rejects if permission is refused. Either way
   * the address is still on screen as selectable text, so nothing is lost.
   */
  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard?.writeText(this.email());
    } catch {
      return;
    }

    this.copied.set(true);
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => this.copied.set(false), COPIED_MS);
  }
}
