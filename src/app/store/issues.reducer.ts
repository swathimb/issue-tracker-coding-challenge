import { createReducer, on } from '@ngrx/store';
import * as IssuesActions from './issues.actions';
import { Issue } from '../core/models/issue.model';

export interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error?: any;
}

export const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: undefined
};

export const issuesReducer = createReducer(
  initialState,

  // Load
  on(IssuesActions.loadIssues, state => ({ ...state, loading: true, error: undefined })),
  on(IssuesActions.loadIssuesSuccess, (state, { issues }) => ({
    ...state,
    loading: false,
    issues
  })),
  on(IssuesActions.loadIssuesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add
  on(IssuesActions.addIssueSuccess, (state, { issue }) => ({
    ...state,
    issues: [...state.issues, issue]
  })),

  // Update
  on(IssuesActions.updateIssueSuccess, (state, { issue }) => ({
    ...state,
    issues: state.issues.map(i => (i.id === issue.id ? issue : i))
  })),

  // Delete
  on(IssuesActions.deleteIssueSuccess, (state, { id }) => ({
    ...state,
    issues: state.issues.filter(i => i.id !== id)
  }))
);
