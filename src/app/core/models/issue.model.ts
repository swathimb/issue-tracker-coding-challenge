export enum IssueStatus {
  Open = 'open',
  InProgress = 'in-progress',
  Done = 'done',
}

export interface Issue {
  id: string; // can be uuid
  title: string;
  description?: string;
  status: IssueStatus;
  createdAt?: string;
}
