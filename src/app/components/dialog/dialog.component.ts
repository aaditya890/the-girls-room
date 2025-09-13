import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule,CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  // Reactive form
  leadForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { compact?: boolean },
    private matdialog: MatDialog,
    private fb: FormBuilder
  ) {}

  closeDialog(): void {
    // Either close the specific one:
    this.dialogRef.close();
    // or close all (your original approach):
    // this.matdialog.closeAll();
  }

  onSubmit(): void {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    // 👉 Console the data (as requested)
    console.log('Dialog lead form:', this.leadForm.value);

    // If you want to pass data back to caller and close:
    this.dialogRef.close(this.leadForm.value);
  }
}
