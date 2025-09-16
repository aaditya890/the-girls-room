import { Component } from '@angular/core';
import { ContactUsComponent } from "../contact-us/contact-us.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  aboutHeroUrl = "assets/images/about-hero.jpg" // change to your banner
  founderImageUrl = "assets/images/founder.jpg" // change to your image

  // You can add more dynamic content here if needed
  stats = [
    { number: "10+", label: "Years Learning" },
    { number: "100%", label: "Aesthetic Focus" },
    { number: "∞", label: "Inspiration" },
  ]

  values = [
    {
      title: "Personal Expression",
      description: "Guidance to embrace what resonates with you and develop your unique aesthetic voice.",
      icon: "user",
    },
    {
      title: "Everyday Joy",
      description: "Design your routines and spaces to feel uplifting, calming, and authentically you.",
      icon: "sun",
    },
    {
      title: "Learn & Evolve",
      description: "Stay curious with trends and innovations while remaining true to your personal style.",
      icon: "zap",
    },
  ]
}
