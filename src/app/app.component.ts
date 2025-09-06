import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { filter } from 'rxjs';
import { FooterComponent } from "./components/sections/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CommonModule, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
   heroUrl = "assets/hero-bg.jpg"
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
