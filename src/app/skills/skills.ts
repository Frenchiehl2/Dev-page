import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { SKILLS } from './skills.data';

@Component({
  imports: [Reveal],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly skills = SKILLS;
}
