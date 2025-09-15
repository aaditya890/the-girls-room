import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule,CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
    // UI state
  loading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  errorMsg = '';

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
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.status = 'idle';
    this.errorMsg = '';

    // Build payload for Web3Forms
    const payload = {
      access_key: '27bc336c-4125-4338-963c-21ef5fc40d74',
      name: this.leadForm.value.name,
      email: this.leadForm.value.email,
      subject: this.leadForm.value.subject || 'New enquiry',
      message: this.leadForm.value.message,
      from_name: 'The Girls Room London – Website',
      // Extras (optional; shows up in the email)
      // page_url: typeof window !== 'undefined' ? window.location.href : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      // Honeypot (leave empty)
      botcheck: ''
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data?.success) {
        this.status = 'success';
        this.leadForm.reset();
        // Close after a short delay, but you can remove if you want to keep it open
        setTimeout(() => this.dialogRef.close({ ok: true }), 1200);
      } else {
        this.status = 'error';
        this.errorMsg = data?.message || 'Submission failed. Please try again.';
      }
    } catch (err: any) {
      this.status = 'error';
      this.errorMsg = 'Network error. Please check your connection and try again.';
    } finally {
      this.loading = false;
    }
  }
}
