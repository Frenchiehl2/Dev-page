import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { MarkdownPipe } from '../content/markdown-pipe';
import { CERTIFICATES } from './certificates.data';

@Component({
  imports: [Reveal, MarkdownPipe],
  selector: 'app-certificates',
  styleUrl: './certificates.css',
  templateUrl: './certificates.html',
})
export class Certificates {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly certificates = computed(() => CERTIFICATES[this.language.current()]);
}
