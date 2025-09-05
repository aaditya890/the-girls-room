import { Component } from '@angular/core';
import { ContactUsComponent } from "../contact-us/contact-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    heroUrl = 'assets/hero-bg.jpg';
}
