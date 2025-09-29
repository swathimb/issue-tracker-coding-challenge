import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IssueList } from './components/issue-list/issue-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, IssueList],
  template: `
    <mat-toolbar color="primary">Issue Tracker</mat-toolbar>
    <app-issue-list></app-issue-list>
  `,
})
export class AppComponent {}
