import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { MarkdownPipe } from '../content/markdown-pipe';
import { EXPERIENCE } from './experience.data';

@Component({
  imports: [Reveal, MarkdownPipe],
  selector: 'app-experience',
  styleUrl: './experience.css',
  templateUrl: './experience.html',
})
export class Experience {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly roles = computed(() => EXPERIENCE[this.language.current()]);
}
