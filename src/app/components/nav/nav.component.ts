import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  title = "The-Girls-Room"

  @ViewChild("navbar") navbarRef!: ElementRef<HTMLDivElement>

  isSticky = false
  navHeight = 80
  topbarHeight = 40
  showMobileMenu = false

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0])
      this.closeMobileMenu() // Close mobile menu on route change
    })
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      if (this.navbarRef?.nativeElement) {
        this.navHeight = this.navbarRef.nativeElement.offsetHeight || this.navHeight
      }
      this.onScroll()
    })
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    const y = window.scrollY || window.pageYOffset
    this.isSticky = y > 50 // Increased threshold for better UX
  }

  @HostListener("window:resize", [])
  onResize(): void {
    // Close mobile menu on window resize
    if (window.innerWidth >= 1024) {
      // lg breakpoint
      this.showMobileMenu = false
    }
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false
  }


  // Navigation methods
  navigateToBooking(): void {
    this.router.navigate(["/contact"])
  }

  navigateToTreatments(): void {
    this.router.navigate(["/treatments"])
  }
}
