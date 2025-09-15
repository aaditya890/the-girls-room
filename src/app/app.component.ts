import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from "./components/footer/footer.component";
import { NavComponent } from "./components/nav/nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavComponent, RouterOutlet],
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
}
