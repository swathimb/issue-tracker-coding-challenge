import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IssuesActions from './issues.actions';
import { IssuesApiService } from '../core/services/issues.api.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const loadIssues$ = createEffect(
  (actions$ = inject(Actions), api = inject(IssuesApiService)) =>
    actions$.pipe(
      ofType(IssuesActions.loadIssues),
      switchMap(({ q, status, sort, order }) =>
        api.list({
            q,
            status,
            _sort: sort,
            _order: order,
          } as {
            q?: string;
            status?: '';
            _sort?: string;
            _order?: 'asc' | 'desc';
          }).pipe(
          map((issues) => {
            console.log('------issues--------', issues)
            return IssuesActions.loadIssuesSuccess({ issues })
          }),
          catchError((error) => of(IssuesActions.loadIssuesFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const addIssue$ = createEffect(
  (actions$ = inject(Actions), api = inject(IssuesApiService)) =>
    actions$.pipe(
      ofType(IssuesActions.addIssue),
      switchMap(({ issue }) =>
        api.add(issue).pipe(
          map((created) => IssuesActions.addIssueSuccess({ issue: created })),
          catchError((error) => of(IssuesActions.addIssueFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const updateIssue$ = createEffect(
  (actions$ = inject(Actions), api = inject(IssuesApiService)) =>
    actions$.pipe(
      ofType(IssuesActions.updateIssue),
      switchMap(({ id, changes }) =>
        api.update(id, changes).pipe(
          map((issue) => IssuesActions.updateIssueSuccess({ issue })),
          catchError((error) => of(IssuesActions.updateIssueFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const deleteIssue$ = createEffect(
  (actions$ = inject(Actions), api = inject(IssuesApiService)) =>
    actions$.pipe(
      ofType(IssuesActions.deleteIssue),
      switchMap(({ id }) =>
        api.delete(id).pipe(
          map(() => IssuesActions.deleteIssueSuccess({ id })),
          catchError((error) => of(IssuesActions.deleteIssueFailure({ error })))
        )
      )
    ),
  { functional: true }
);
