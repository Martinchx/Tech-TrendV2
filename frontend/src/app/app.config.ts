import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions({
        skipInitialTransition: true,
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideHotToastConfig({
      theme: 'snackbar',
      dismissible: true,
      duration: 3000,
      reverseOrder: true,
    }),
  ],
};
