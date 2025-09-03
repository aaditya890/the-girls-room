import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactUsComponent } from "./components/contact-us/contact-us.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ContactUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('navbar') navbarRef!: ElementRef<HTMLDivElement>;
  isSticky = false;
  navHeight = 80;
  topbarHeight = 32;
  heroUrl = 'assets/hero-bg.jpg';

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
  
}
