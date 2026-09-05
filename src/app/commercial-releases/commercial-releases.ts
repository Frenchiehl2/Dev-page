import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { COMMERCIAL_RELEASES } from './commercial-releases.data';

@Component({
  imports: [RouterLink, Reveal],
  selector: 'app-commercial-releases',
  templateUrl: './commercial-releases.html',
})
export class CommercialReleases {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly releases = computed(() => COMMERCIAL_RELEASES[this.language.current()]);
}
