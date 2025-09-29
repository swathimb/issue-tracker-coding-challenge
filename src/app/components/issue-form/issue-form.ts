import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-issue-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './issue-form.html',
  styleUrl: './issue-form.css',
})
export class IssueForm {
  @Output() create = new EventEmitter<{
    title: string;
    description?: string;
  }>();

  titleCtrl = new FormControl('', { nonNullable: true });
  descCtrl = new FormControl('');

  submit(event: Event) {
    event?.preventDefault();
    if (this.titleCtrl.value.trim()) {
      this.create.emit({
        title: this.titleCtrl.value,
        description: this.descCtrl.value as string,
      });
      this.titleCtrl.setValue('');
      this.descCtrl.setValue('');
    }
  }
}
