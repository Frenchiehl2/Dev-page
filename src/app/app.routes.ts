import { inject } from '@angular/core';
import { Routes, ResolveFn } from '@angular/router';
import { Home } from './home/home';
import { ProjectDetail, COLLECTIONS, Collection } from './project-detail/project-detail';
import { Language } from './shared/language';
import { UI_TEXT } from './shared/ui-text';

const SITE_NAME = 'Aleksas porfolio';

/** Tab title for one work entry, looked up in the collection its route serves. */
const entryTitle =
  (collection: Collection): ResolveFn<string> =>
  (route) => {
    const lang = inject(Language).current();
    const slug = route.paramMap.get('slug');
    const entry = COLLECTIONS[collection][lang].find((e) => e.slug === slug);
    return entry ? `${entry.title} — ${SITE_NAME}` : UI_TEXT[lang].projectNotFound;
  };

export const routes: Routes = [
  { path: '', component: Home, title: SITE_NAME },
  {
    path: 'projects/:slug',
    component: ProjectDetail,
    title: entryTitle('projects'),
    // Bound to ProjectDetail's `collection` input by withComponentInputBinding().
    data: { collection: 'projects' satisfies Collection },
  },
  {
    path: 'commercial-releases/:slug',
    component: ProjectDetail,
    title: entryTitle('commercialReleases'),
    data: { collection: 'commercialReleases' satisfies Collection },
  },
  { path: '**', redirectTo: '' },
];
