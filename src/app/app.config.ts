import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { issuesReducer } from './store/issues.reducer';
import * as IssuesEffects from './store/issues.effects';

export const appConfig = [
  provideStore({ issues: issuesReducer }),
  provideEffects([IssuesEffects]),
  provideStoreDevtools({ maxAge: 25 }),
];
