import { createAction, props } from '@ngrx/store';
import { Issue, IssueStatus } from '../core/models/issue.model';

export const loadIssues = createAction(
  '[Issues] Load Issues',
  props<{
    q?: string;
    status?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }>()
);
export const loadIssuesSuccess = createAction(
  '[Issues] Load Issues Success',
  props<{ issues: Issue[] }>()
);
export const loadIssuesFailure = createAction(
  '[Issues] Load Issues Failure',
  props<{ error: any }>()
);

export const addIssue = createAction(
  '[Issues] Add Issue',
  props<{ issue: Partial<Issue> }>()
);
export const addIssueSuccess = createAction(
  '[Issues] Add Issue Success',
  props<{ issue: Issue }>()
);
export const addIssueFailure = createAction(
  '[Issues] Add Issue Failure',
  props<{ error: any }>()
);

export const updateIssue = createAction(
  '[Issues] Update Issue',
  props<{ id: string; changes: Partial<Issue> }>()
);
export const updateIssueSuccess = createAction(
  '[Issues] Update Issue Success',
  props<{ issue: Issue }>()
);
export const updateIssueFailure = createAction(
  '[Issues] Update Issue Failure',
  props<{ error: any }>()
);

export const deleteIssue = createAction(
  '[Issues] Delete Issue',
  props<{ id: string }>()
);
export const deleteIssueSuccess = createAction(
  '[Issues] Delete Issue Success',
  props<{ id: string }>()
);
export const deleteIssueFailure = createAction(
  '[Issues] Delete Issue Failure',
  props<{ error: any }>()
);
