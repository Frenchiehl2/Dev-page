import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { CONTACT_PLATFORMS } from './contacts.data';

@Component({
  imports: [Reveal],
  selector: 'app-contacts',
  styleUrl: './contacts.css',
  templateUrl: './contacts.html',
})
export class Contacts {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  /** Not localised: platform names are proper nouns. */
  protected readonly platforms = CONTACT_PLATFORMS;
}
