import { Component, inject } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import * as IssuesActions from '../../store/issues.actions';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  map,
} from 'rxjs/operators';
import { IssueStatus } from '../../core/models/issue.model';
import { Store } from '@ngrx/store';
import { selectAllIssues, selectIssuesError, selectIssuesLoading } from '../../store/issues.selectors';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { IssueForm } from '../issue-form/issue-form';

@Component({
  selector: 'app-issue-list',
  imports: [CommonModule, MatListModule, IssueForm,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatCardModule
  ],
  templateUrl: './issue-list.html',
  styleUrl: './issue-list.css',
})
export class IssueList {
  private store = inject(Store);

  issues$ = this.store.selectSignal(selectAllIssues);
  loading$ = this.store.selectSignal(selectIssuesLoading);
  error$ = this.store.selectSignal(selectIssuesError);

  private search$ = new Subject<string>();
  private statusFilter$ = new Subject<string | undefined>();

  statusEnum = IssueStatus;

  constructor() {
    console.log('-------', this.issues$())
    combineLatest([
      this.search$.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.statusFilter$.pipe(startWith('')),
    ])
      .pipe(
        map(([q, status]) => ({
          q: q || undefined,
          status: status || undefined,
        }))
      )
      .subscribe((query) =>
        this.store.dispatch(IssuesActions.loadIssues(query))
      );

    this.store.dispatch(IssuesActions.loadIssues({}));
  }

  onSearchInput(event: any) {
    console.log(event)
    this.search$.next(event?.target.value);
  }

  onStatusSelect(status?: string) {
    this.statusFilter$.next(status);
  }

  addIssue(payload: { title: string; description?: string }) {
    this.store.dispatch(
      IssuesActions.addIssue({
        issue: { ...payload, status: IssueStatus.Open },
      })
    );
  }

  updateStatus(id: string, status: IssueStatus) {
    this.store.dispatch(IssuesActions.updateIssue({ id, changes: { status } }));
  }

  delete(id: string) {
    this.store.dispatch(IssuesActions.deleteIssue({ id }));
  }
}
