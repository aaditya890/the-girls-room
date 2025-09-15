import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-contact-us",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent {
  // Route flag
  isContactRoute = false;

  // Contact info
  contactEmail = 'support@thegirlsroomlondon.com';
  basedIn = 'East London Anti-wrinkle and Dermal filler, lemon bottle';
  phone = '02046174666';
  whatsappNumber = '02046174666';
  para = "For any inquiries or assistance, reach us at the Girl's Room dedicated customer support. Email us using the form below, or call us directly.";

  copiedEmail = false;
  copiedPhone = false;

  // Submit state
  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;

  // Reactive form
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder, public router: Router) {
    // Set initial route state
    this.isContactRoute = this.router.url.startsWith('/contact');

    // Update on navigation
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.isContactRoute = e.urlAfterRedirects.startsWith('/contact');
      });
  }

  // ===== Getters / validation helpers =====
  private ctrl(name: string): AbstractControl | null { return this.contactForm.get(name); }

  get nameCtrl() { return this.ctrl('name'); }
  get emailCtrl() { return this.ctrl('email'); }
  get subjectCtrl() { return this.ctrl('subject'); }
  get messageCtrl() { return this.ctrl('message'); }

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

  // ===== Submit to Web3Forms =====
  async submitToWhatsApp() { // keeping your existing name used in template
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = null;

    const v = this.contactForm.value;

    const payload = {
      access_key: '27bc336c-4125-4338-963c-21ef5fc40d74',
      name: v.name,
      email: v.email,
      subject: v.subject || 'New enquiry',
      message: v.message,
      from_name: 'The Girls Room London – Website',
      // page_url: typeof window !== 'undefined' ? window.location.href : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      botcheck: '' // honeypot
      // redirect: 'https://your-domain.com/thank-you' // optional
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data?.success) {
        this.submitSuccess = true;
        this.contactForm.reset();
        // Auto-hide success after a bit (optional)
        setTimeout(() => (this.submitSuccess = false), 3000);
      } else {
        this.submitError = data?.message || 'Submission failed. Please try again.';
      }
    } catch {
      this.submitError = 'Network error. Please check your connection and try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  telHref() {
    const digits = this.phone.replace(/[^\d+]/g, '');
    return `tel:${digits}`;
  }

  mailHref() {
    return `mailto:${this.contactEmail}`;
  }

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
    } catch {}
  }

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
