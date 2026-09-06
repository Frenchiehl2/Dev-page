import { Component, computed, inject } from '@angular/core';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { PORTRAIT } from '../overview/overview.data';
import { Overview } from '../overview/overview';
import { Skills } from '../skills/skills';
import { CommercialReleases } from '../commercial-releases/commercial-releases';
import { Projects } from '../projects/projects';
import { Showcase } from '../showcase/showcase';
import { SHOWCASE } from '../showcase/showcase.data';
import { Experience } from '../experience/experience';
import { Education } from '../education/education';
import { Certificates } from '../certificates/certificates';
import { Downloads } from '../downloads/downloads';
import { DOWNLOADS } from '../downloads/downloads.data';
import { Contact } from '../contact/contact';
import { Contacts } from '../contacts/contacts';

@Component({
  imports: [
    Overview,
    Skills,
    CommercialReleases,
    Projects,
    Showcase,
    Experience,
    Education,
    Certificates,
    Downloads,
    Contact,
    Contacts,
    Reveal,
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly portrait = PORTRAIT;
  /** Drives the @if that hides the section, and its divider, while empty. */
  protected readonly hasShowcase = SHOWCASE.length > 0;
  protected readonly hasDownloads = DOWNLOADS.length > 0;
}
