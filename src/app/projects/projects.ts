import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { PROJECTS } from './projects.data';

@Component({
  imports: [RouterLink, Reveal],
  selector: 'app-projects',
  templateUrl: './projects.html',
})
export class Projects {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly projects = computed(() => PROJECTS[this.language.current()]);
}
