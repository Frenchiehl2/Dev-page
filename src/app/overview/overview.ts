import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { MarkdownPipe } from '../content/markdown-pipe';
import { OVERVIEW } from './overview.data';

@Component({
  imports: [Reveal, MarkdownPipe],
  selector: 'app-overview',
  styleUrl: './overview.css',
  templateUrl: './overview.html',
})
export class Overview {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly overview = computed(() => OVERVIEW[this.language.current()]);
}
