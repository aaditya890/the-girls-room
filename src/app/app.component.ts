import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "The-Girls-Room"
  @ViewChild('navbar') navbarRef!: ElementRef<HTMLDivElement>;
  isSticky = false;
  navHeight = 80;
  topbarHeight = 32;

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });
  }
  
  ngAfterViewInit(): void {
    queueMicrotask(() => {
      if (this.navbarRef?.nativeElement) this.navHeight = this.navbarRef.nativeElement.offsetHeight || this.navHeight;
      this.onScroll();
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const y = window.scrollY || window.pageYOffset;
    this.isSticky = y > 10;
  }

  subscribeNewsletter(){}

  scrollToTop(){}
  
}
