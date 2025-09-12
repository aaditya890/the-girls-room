import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from "@angular/forms"
import { Router } from "@angular/router"


@Component({
  selector: "app-contact-us",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"], // Added SCSS file reference
})
export class ContactUsComponent {
  // 🔒 keep these exactly as requested
  contactEmail = 'support@thegirlsroomlondon.com';
  basedIn = 'East London Anti-wrinkle and Dermal filler, lemon bottle ';
  phone = '02046174666';
  whatsappNumber = '02046174666';
  para =
    "For any inquiries or assistance, reach us at the Girl's Room dedicated customer support. Email us using the form below, or call us directly.";

  // UI state
  copiedEmail = false;
  copiedPhone = false;
  isSubmitting = false;
  submitSuccess = false;

  // Reactive form
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder, public router: Router) {}

  // =======================
  // Getters (clean access)
  // =======================
  private ctrl(name: string): AbstractControl | null {
    return this.contactForm.get(name);
  }
  get nameCtrl() { return this.ctrl('name'); }
  get emailCtrl() { return this.ctrl('email'); }
  get subjectCtrl() { return this.ctrl('subject'); }
  get messageCtrl() { return this.ctrl('message'); }

  // =======================
  // Keep existing API used by template
  // =======================
  hasFieldError(fieldName: 'name' | 'email' | 'subject' | 'message'): boolean {
    const c = this.ctrl(fieldName);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  getFieldError(fieldName: 'name' | 'email' | 'subject' | 'message'): string {
    const c = this.ctrl(fieldName);
    if (!c || !(c.dirty || c.touched) || !c.errors) return '';
    if (c.errors['required']) return `${this._label(fieldName)} is required`;
    if (c.errors['email']) return 'Please enter a valid email';
    if (c.errors['minlength']) {
      const req = c.errors['minlength'].requiredLength;
      return `${this._label(fieldName)} must be at least ${req} characters`;
    }
    return 'Invalid value';
  }

  // keep same name used in template; now it just logs values
  async submitToWhatsApp() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // 👉 console the payload (as requested)
    console.log('Contact form payload:', this.contactForm.value);

    // Fake async to show the spinner, then show success
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();

      setTimeout(() => (this.submitSuccess = false), 3000);
    }, 500);
  }

  // Link helpers (keep signatures)
  telHref() {
    const digits = this.phone.replace(/[^\d+]/g, '');
    return `tel:${digits}`;
  }

  mailHref() {
    return `mailto:${this.contactEmail}`;
  }

  // Clipboard copy (keep signature)
  async copy(text: string, type: 'email' | 'phone') {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        this.copiedEmail = true;
        setTimeout(() => (this.copiedEmail = false), 1500);
      } else {
        this.copiedPhone = true;
        setTimeout(() => (this.copiedPhone = false), 1500);
      }
    } catch {
      // no-op
    }
  }

  // =======================
  // private helpers
  // =======================
  private _label(field: string): string {
    switch (field) {
      case 'name': return 'Name';
      case 'email': return 'Email';
      case 'subject': return 'Subject';
      case 'message': return 'Message';
      default: return 'Field';
    }
  }
}
