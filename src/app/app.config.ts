import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';
import { provideScrollMemory } from './shared/scroll-memory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      // Left explicit rather than dropped: ScrollMemory owns scroll behaviour
      // now, and the router must not scroll on top of it.
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
    ),
    provideScrollMemory(),
  ],
};
