import { Component } from '@angular/core';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { ReviewTestimonialComponent } from "../review-testimonial/review-testimonial.component";


interface Service {
  name: string;
  image: string;
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface FAQ {
  id: number
  question: string
  answer: string
  isExpanded: boolean
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactUsComponent,  ReviewTestimonialComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  heroUrl = 'assets/hero-bg.jpg';
  // Hero Section Variables
  typedText: string = "";
  private typingInterval?: number;
  currentIndex = 0;
  isAnimating = false;
  private intervalId?: number;

  // Hero Section Data
  services: Service[] = [
    { name: "Laser Removal", image: "assets/service-images/laser-hair-removal.webp" },
    { name: "Fat Dissolving", image: "assets/service-images/fat-dissolving.webp" }, 
    { name: "Facial Therapy", image: "assets/service-images/facial-treatment.webp" },
    { name: "Dermal Filler", image: "assets/service-images/dermal-filler.webp" },
    { name: "Anti-Wrinkle", image: "assets/service-images/anti-wrinkle-treatment.webp" },
    { name: "Waxing", image: "assets/service-images/waxing.webp" }, 
    { name: "Hydra Facial", image: "assets/service-images/hydra-facial.webp" },
    { name: "Skin Care", image: "assets/service-images/skin-care.webp" }
  ];

  // Features Section Data
  features: Feature[] = [
    {
      icon: "assets/service-images/1.webp",
      title: "Advanced Technology",
      description:
        "We use the latest beauty and aesthetic equipment to deliver safe, effective, and long-lasting results.",
    },
    {
      icon: "assets/service-images/2.webp",
      title: "Hygienic & Safe",
      description:
        "Our clinic maintains the highest standards of hygiene and safety for every client, every time.",
    },
    {
      icon: "assets/service-images/3.webp",
      title: "Comfortable Environment",
      description:
        "Enjoy a relaxing and welcoming atmosphere designed to make your beauty journey stress-free.",
    },
    {
      icon: "assets/service-images/p.webp",
      title: "Affordable Packages",
      description:
        "Get premium quality treatments at transparent and competitive prices, with flexible packages.",
    },
  ];

  // FAQ Section Data
  faqs: FAQ[] = [
    {
      id: 1,
      question: "Which treatment is best for me?",
      answer:
        "We start with a complimentary consultation and skin/medical assessment to understand your goals and suitability. Your practitioner will recommend a personalised plan that may include Laser Hair Removal, Facial Therapy, Dermal Filler, Anti-Wrinkle injections, Fat Dissolving, or a tailored Skin Care routine. Patch tests are carried out where required (e.g., laser) before any course begins.",
      isExpanded: true,
    },
    {
      id: 2,
      question: "How does Laser Hair Removal work and how many sessions will I need?",
      answer:
        "Our medical-grade laser targets the pigment in the hair follicle to reduce regrowth. Most clients need 6–8 sessions spaced 4–6 weeks apart, with occasional maintenance. A patch test is required at least 24–48 hours before your first session. You should shave the area 24 hours prior, avoid sunbeds/self-tan, and use SPF on exposed areas throughout your course.",
      isExpanded: false,
    },
    {
      id: 3,
      question: "Is Fat Dissolving safe and what results can I expect?",
      answer:
        "Fat Dissolving injections (for small, stubborn pockets like chin or lower abdomen) break down fat cells which are then naturally eliminated by the body. Typical plans are 2–4 sessions, 4–6 weeks apart. You may experience swelling, tenderness, or bruising for 3–7 days. Results build gradually; a balanced lifestyle helps maintain them. Not suitable during pregnancy/breastfeeding or for certain medical conditions.",
      isExpanded: false,
    },
    {
      id: 4,
      question: "I have sensitive or acne-prone skin—can I book Facial Therapy?",
      answer:
        "Yes. Our Facial Therapy is fully bespoke. We select gentle, clinically backed actives and adjust intensity based on your skin type and tolerance. Treatments can target congestion, dehydration, dullness, or pigmentation. Mild redness can occur and usually settles within hours. You’ll receive a home-care plan to maintain results between visits.",
      isExpanded: false,
    },
    {
      id: 5,
      question: "How long do Dermal Fillers last and are they reversible?",
      answer:
        "We use premium hyaluronic-acid fillers to softly enhance features and restore volume. Longevity is typically 6–12 months depending on the area, product, and lifestyle. You may see mild swelling or bruising for a few days. HA fillers can be dissolved with hyaluronidase if clinically indicated. A full medical consultation is completed prior to treatment.",
      isExpanded: false,
    },
    {
      id: 6,
      question: "When will I see results from Anti-Wrinkle injections and how long do they last?",
      answer:
        "Initial smoothing is usually noticed in 3–5 days, with peak results around 2 weeks. Effects commonly last 3–4 months, varying by dose, muscle strength, and lifestyle. We offer a two-week review (where appropriate) to ensure a natural, balanced finish.",
      isExpanded: false,
    },
    {
      id: 7,
      question: "What aftercare should I follow and is there any downtime?",
      answer:
        "Most treatments have little to no downtime. General guidance: avoid heat, steam rooms, and strenuous exercise for 24 hours; keep the area clean; use SPF 30+ daily; avoid alcohol the day of injectable treatments; and don’t massage treated areas unless advised. Your practitioner will give you tailored aftercare and red-flag advice to contact us if needed.",
      isExpanded: false,
    },
    {
      id: 8,
      question: "How do bookings, pricing, and cancellations work?",
      answer:
        "Treatment prices vary by area and plan; full costs are confirmed during consultation. A deposit may be required to secure your appointment and is redeemable against treatment. We kindly ask for at least 48 hours’ notice to reschedule; late cancellations or no-shows may forfeit the deposit. We accept major cards. Please arrive a few minutes early for forms and patch tests where applicable.",
      isExpanded: false,
    },
  ];

  ngOnInit(): void {
    this.startCarousel();
    this.typeWriterEffect(this.currentServiceName);
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }


  // Hero Section Methods
  get currentServicePhrase(): string {
    return `Transform Your ${this.services[this.currentIndex]?.name ?? ""}`;
  }

  private typeWriterEffect(text: string): void {
    this.typedText = "";
    let i = 0;

    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    this.typingInterval = window.setInterval(() => {
      if (i < text.length) {
        this.typedText += text.charAt(i);
        i++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 80);
  }

  private startCarousel(): void {
    this.intervalId = window.setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  private stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private nextImage(): void {
    this.isAnimating = true;

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.services.length;
      this.typeWriterEffect(this.currentServiceName); // 👈 sirf service name
      this.isAnimating = false;
    }, 200);
  }

  getImageAtPosition(position: "left" | "center" | "right"): string {
    const totalServices = this.services.length;
    let index: number;

    switch (position) {
      case "left":
        index = (this.currentIndex - 1 + totalServices) % totalServices;
        break;
      case "center":
        index = this.currentIndex;
        break;
      case "right":
        index = (this.currentIndex + 1) % totalServices;
        break;
    }

    return this.services[index].image;
  }

  getServiceAtPosition(position: "left" | "center" | "right"): string {
    const totalServices = this.services.length;
    let index: number;

    switch (position) {
      case "left":
        index = (this.currentIndex - 1 + totalServices) % totalServices;
        break;
      case "center":
        index = this.currentIndex;
        break;
      case "right":
        index = (this.currentIndex + 1) % totalServices;
        break;
    }

    return this.services[index].name;
  }

  get currentServiceName(): string {
    return this.services[this.currentIndex]?.name ?? '';
  }


  // Faq Section Methods
   toggleFAQ(id: number): void {
    const faq = this.faqs.find((f) => f.id === id)
    if (faq) {
      faq.isExpanded = !faq.isExpanded
    }
  }

}
