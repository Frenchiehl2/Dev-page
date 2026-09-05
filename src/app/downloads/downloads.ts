import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { DOWNLOADS } from './downloads.data';

@Component({
  imports: [Reveal],
  selector: 'app-downloads',
  styleUrl: './downloads.css',
  templateUrl: './downloads.html',
})
export class Downloads {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);

  /** Flattened to the current language, so the template stays free of lookups. */
  protected readonly downloads = computed(() => {
    const lang = this.language.current();
    return DOWNLOADS.map((entry) => ({
      label: entry.label[lang],
      file: entry.file,
      meta: entry.meta,
    }));
  });
}
