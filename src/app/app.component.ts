import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from "./components/footer/footer.component";
import { NavComponent } from "./components/nav/nav.component";
import { RouterOutlet ,RouterLink } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterLink, NavComponent, RouterOutlet,ReactiveFormsModule,MatDialogModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'The Girls Room';
  showFooter = false;

  @ViewChild('footerSentinel', { static: true }) footerSentinel!: ElementRef<HTMLElement>;
  private io?: IntersectionObserver;

  ngOnInit(): void {
    console.log("The Girls Room ! Welcome to our website. We are delighted to have you here and look forward to assisting you on your journey to enhanced beauty and confidence.");
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.showFooter = true; return;
    }
    this.io = new IntersectionObserver(
      es => { if (es.some(e => e.isIntersecting)) { this.showFooter = true; this.io?.disconnect(); } },
      { root: null, rootMargin: '100px', threshold: 0 }
    );
    this.io.observe(this.footerSentinel.nativeElement);
  }

  ngOnDestroy(): void { this.io?.disconnect(); }

  
  whatsappEnquiry(): void {
    const message = encodeURIComponent("Hi")
    const phone = "+447878350664"
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
    window.open(whatsappUrl, "_blank")
  }


   emailText = "support@thegirlsroomlondon.com";

  // Newsletter state
  isSubmitting = false;
  submitOk = false;
  submitError: string | null = null;

  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private viewportScroller: ViewportScroller,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  async subscribeNewsletter(): Promise<void> {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitOk = false;
    this.submitError = null;

    const email = this.newsletterForm.value.email as string;

    const payload = {
      access_key: '27bc336c-4125-4338-963c-21ef5fc40d74',
      subject: 'Newsletter subscription',
      from_name: 'The Girls Room London – Website',
      email,                // Web3Forms will include this in the email you receive
      botcheck: '',         // honeypot
      // page_url: typeof window !== 'undefined' ? window.location.href : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      // redirect: 'https://your-site/thank-you' // optional
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data?.success) {
        this.submitOk = true;
        this.newsletterForm.reset();
      } else {
        this.submitError = data?.message || 'Subscription failed. Please try again.';
      }
    } catch {
      this.submitError = 'Network error. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }



  openDialog() {
    this.dialog.open(DialogComponent, {});
  }

}
