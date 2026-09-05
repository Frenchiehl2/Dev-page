import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../shared/reveal';
import { Language } from '../shared/language';
import { UI_TEXT } from '../shared/ui-text';
import { MarkdownPipe } from '../content/markdown-pipe';
import { PROJECTS } from '../projects/projects.data';
import { COMMERCIAL_RELEASES } from '../commercial-releases/commercial-releases.data';

/**
 * The work-entry collections this page can render. Projects and commercial
 * releases carry the same fields (see WorkEntry), so one component serves both
 * routes and the route says which list to search.
 */
export const COLLECTIONS = {
  projects: PROJECTS,
  commercialReleases: COMMERCIAL_RELEASES,
};

export type Collection = keyof typeof COLLECTIONS;

@Component({
  imports: [NgTemplateOutlet, RouterLink, MarkdownPipe, Reveal],
  selector: 'app-project-detail',
  styleUrl: './project-detail.css',
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  /** Bound from the :slug route param by withComponentInputBinding(). */
  readonly slug = input.required<string>();

  /** Bound from the route's static `data`, which the same option also binds. */
  readonly collection = input<Collection>('projects');

  private readonly language = inject(Language);

  protected readonly t = computed(() => UI_TEXT[this.language.current()]);
  protected readonly project = computed(() =>
    COLLECTIONS[this.collection()][this.language.current()].find((p) => p.slug === this.slug()),
  );
}
