import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IssuesState } from './issues.reducer';

export const selectIssuesState = createFeatureSelector<IssuesState>('issues');

export const selectAllIssues = createSelector(
  selectIssuesState,
  state => state.issues
);

export const selectIssuesLoading = createSelector(
  selectIssuesState,
  state => state.loading
);

export const selectIssuesError = createSelector(
  selectIssuesState,
  state => state.error
);
