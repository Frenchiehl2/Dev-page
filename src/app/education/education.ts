import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { MarkdownPipe } from '../content/markdown-pipe';
import { EDUCATION } from './education.data';

@Component({
  imports: [Reveal, MarkdownPipe],
  selector: 'app-education',
  styleUrl: './education.css',
  templateUrl: './education.html',
})
export class Education {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly studies = computed(() => EDUCATION[this.language.current()]);
}
