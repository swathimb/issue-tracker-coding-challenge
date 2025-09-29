import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue, IssueStatus } from '../models/issue.model';

export interface IssuesQuery {
  q?: string;
  status?: IssueStatus | '';
  _sort?: string;
  _order?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class IssuesApiService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000/issues';

  list(query: IssuesQuery = {}): Observable<Issue[]> {
    let params = new HttpParams();
    if (query.q) params = params.set('q', query.q);
    if (query.status) params = params.set('status', query.status);
    if (query._sort) params = params.set('_sort', query._sort);
    if (query._order) params = params.set('_order', query._order);
    return this.http.get<Issue[]>(this.base, { params });
  }

  add(issue: Partial<Issue>) {
    return this.http.post<Issue>(this.base, issue);
  }

  update(id: string, patch: Partial<Issue>) {
    return this.http.patch<Issue>(`${this.base}/${id}`, patch);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
