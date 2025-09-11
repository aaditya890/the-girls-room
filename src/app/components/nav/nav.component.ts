import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
 title = 'The-Girls-Room';

  @ViewChild('navbar') navbarRef!: ElementRef<HTMLDivElement>;

  isSticky = false;
  navHeight = 80;
  topbarHeight = 40;
  showMobileMenu = false;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
        this.closeMobileMenu();
      });
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      if (this.navbarRef?.nativeElement) {
        this.navHeight = this.navbarRef.nativeElement.offsetHeight || this.navHeight;
      }
      this.onScroll();
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY || window.pageYOffset;
    this.isSticky = y > 50;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 1024) this.showMobileMenu = false; // lg breakpoint
  }

  toggleMobileMenu(): void { this.showMobileMenu = !this.showMobileMenu; }
  closeMobileMenu(): void { this.showMobileMenu = false; }

  // Navigation helpers
  navigateToBooking(): void { this.router.navigate(['/contact']); }
  navigateToTreatments(): void { this.router.navigate(['/treatments']); }
}
