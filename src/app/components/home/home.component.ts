import { Component } from '@angular/core';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { SectionServicesComponent } from "../sections/section-services/section-services.component";
import { HeroComponent } from "../sections/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactUsComponent, SectionServicesComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    heroUrl = 'assets/hero-bg.jpg';
}
