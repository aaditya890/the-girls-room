import { Component } from '@angular/core';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { ReviewTestimonialComponent } from "../review-testimonial/review-testimonial.component";
import { NgOptimizedImage } from '@angular/common';

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
  category: string
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
      icon: "assets/service-images/4.webp",
      title: "Affordable Packages",
      description:
        "Get premium quality treatments at transparent and competitive prices, with flexible packages.",
    },
  ];

  // FAQ Section Data
   activeCategory = "Anti-Wrinkle Treatments"

  categories = [
    "Expand All",
    "Anti-Wrinkle Treatments",
    "Dermal Fillers",
    "HydraFacials",
    "Body Waxing",
    "Dermaplaning Treatment",
    "Microneedling",
    "Laser Hair Removal",
  ]

  faqs: FAQ[] = [
    // Anti-Wrinkle Treatments - General FAQs
    {
      id: 1,
      question: "How long do anti-wrinkle treatment results last?",
      answer:
        "Anti-wrinkle treatment results typically last 3-6 months, depending on the individual, treatment area, and lifestyle factors. Regular treatments help maintain optimal results.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 2,
      question: "When will I see results from anti-wrinkle treatments?",
      answer:
        "You'll start to see results within 3-5 days, with full effects visible after 10-14 days. The muscles gradually relax, smoothing out wrinkles and fine lines.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 3,
      question: "Are anti-wrinkle treatments painful?",
      answer:
        "Most clients experience minimal discomfort. The injections feel like small pinpricks, and the procedure is over quickly. We can apply numbing cream if needed.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 4,
      question: "What should I avoid before anti-wrinkle treatment?",
      answer:
        "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible for 24-48 hours before treatment. Stop strong skincare actives like retinol 2-3 days before.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 5,
      question: "Can I wear makeup after anti-wrinkle treatment?",
      answer:
        "Wait at least 4 hours before applying makeup. Avoid touching or massaging the treated area for 24 hours to prevent the product from spreading.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },

    // Dermal Fillers - General FAQs
    {
      id: 6,
      question: "How long do dermal filler results last?",
      answer:
        "Dermal filler results typically last 6-18 months, depending on the type of filler used, treatment area, and individual metabolism. Lip fillers may last 6-12 months, while cheek fillers can last 12-18 months.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 7,
      question: "When will I see results from dermal fillers?",
      answer:
        "Results are visible immediately after treatment, though there may be initial swelling. Final results are seen after 2-3 weeks once any swelling has completely subsided.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 8,
      question: "Are dermal filler treatments painful?",
      answer:
        "Most fillers contain lidocaine (local anaesthetic) to minimize discomfort. You may feel pressure and mild discomfort during injection, but pain is generally minimal.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 9,
      question: "What should I avoid before dermal filler treatment?",
      answer:
        "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible. Stop strong skincare actives like retinol or acids 2-3 days before treatment.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 10,
      question: "What if I notice bruising or swelling after fillers?",
      answer:
        "Apply a cold compress and arnica cream. Mild swelling and bruising are normal and should resolve within a few days. Avoid heat treatments and exercise for 24-48 hours.",
      category: "Dermal Fillers",
      isExpanded: false,
    },

    // HydraFacials - General FAQs
    {
      id: 11,
      question: "How long do HydraFacial results last?",
      answer:
        "HydraFacial results are visible immediately and can last 5-7 days. For optimal results, we recommend monthly treatments to maintain healthy, glowing skin.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 12,
      question: "When will I see results from HydraFacial?",
      answer:
        "You'll see immediate results after your HydraFacial treatment. Your skin will appear brighter, smoother, and more hydrated right away.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 13,
      question: "Is HydraFacial treatment painful?",
      answer:
        "HydraFacial is completely painless and relaxing. Most clients find the treatment soothing and enjoyable, with no discomfort during or after the procedure.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 14,
      question: "Are there side effects with HydraFacial?",
      answer:
        "HydraFacial has minimal side effects. Some clients may experience slight redness immediately after treatment, which typically fades within an hour.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 15,
      question: "Is there downtime after HydraFacial?",
      answer:
        "There's no downtime with HydraFacial. You can return to your normal activities immediately and even apply makeup right after treatment if desired.",
      category: "HydraFacials",
      isExpanded: false,
    },

    // Body Waxing - General FAQs
    {
      id: 16,
      question: "How long do body waxing results last?",
      answer:
        "Body waxing results typically last 3-6 weeks, depending on your hair growth cycle and the area treated. Regular waxing can lead to finer, sparser hair regrowth over time.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 17,
      question: "Is body waxing painful?",
      answer:
        "There is some discomfort during waxing, but it's brief and manageable. The pain decreases with regular treatments as hair becomes finer and skin adapts.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 18,
      question: "What should I avoid before body waxing?",
      answer:
        "Avoid sun exposure, sunbeds, and exfoliating 24-48 hours before treatment. Don't shave for at least 2 weeks prior - hair should be 1/4 inch long for effective waxing.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 19,
      question: "What can I expect immediately after body waxing?",
      answer:
        "Mild redness and sensitivity are normal and usually fade within a few hours. The treated area may feel tender, and you might see some minor bumps initially.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 20,
      question: "Are there aftercare restrictions for body waxing?",
      answer:
        "Avoid heat treatments, hot baths, saunas, and tight clothing for 24-48 hours. Use gentle, fragrance-free products and avoid sun exposure on treated areas.",
      category: "Body Waxing",
      isExpanded: false,
    },

    // Dermaplaning - General FAQs
    {
      id: 21,
      question: "How long do dermaplaning results last?",
      answer:
        "Dermaplaning results typically last 3-4 weeks. Your skin will remain smooth and bright until the hair naturally regrows, which is usually finer than before.",
      category: "Dermaplaning Treatment",
      isExpanded: false,
    },
    {
      id: 22,
      question: "When will I see results from dermaplaning?",
      answer:
        "Results are immediate! Your skin will feel incredibly smooth and look brighter right after treatment, with improved makeup application and skincare absorption.",
      category: "Dermaplaning Treatment",
      isExpanded: false,
    },
    {
      id: 23,
      question: "Is dermaplaning treatment painful?",
      answer:
        "Dermaplaning is completely painless. You'll feel a gentle scraping sensation as the blade removes dead skin and hair, but there's no discomfort involved.",
      category: "Dermaplaning Treatment",
      isExpanded: false,
    },
    {
      id: 24,
      question: "Are there side effects with dermaplaning?",
      answer:
        "Side effects are minimal. Some clients may experience slight redness immediately after treatment, which typically subsides within an hour.",
      category: "Dermaplaning Treatment",
      isExpanded: false,
    },
    {
      id: 25,
      question: "Can I go in the sun after dermaplaning?",
      answer:
        "Avoid direct sun exposure for 24-48 hours after treatment and always use SPF 30+ daily. Your skin will be more sensitive to UV rays after exfoliation.",
      category: "Dermaplaning Treatment",
      isExpanded: false,
    },

    // Microneedling - General FAQs
    {
      id: 26,
      question: "How long do microneedling results last?",
      answer:
        "Microneedling results develop over 4-6 weeks as collagen production increases. Results can last 4-6 months, with optimal results achieved through a series of 3-6 treatments.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 27,
      question: "When will I see results from microneedling?",
      answer:
        "Initial results may be visible within a few days, but significant improvements appear after 4-6 weeks as new collagen forms. Full results develop over 2-3 months.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 28,
      question: "Is microneedling treatment painful?",
      answer:
        "We apply numbing cream before treatment to minimize discomfort. You may feel mild pressure and tingling during the procedure, but pain is generally minimal.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 29,
      question: "Are there side effects with microneedling?",
      answer:
        "Temporary redness and mild swelling are normal for 24-48 hours after treatment. Your skin may feel tight and look slightly sunburned initially.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 30,
      question: "What should I avoid before microneedling?",
      answer:
        "Avoid retinol, acids, and exfoliating products for 3-5 days before treatment. Don't have facial treatments or use sunbeds 1-2 weeks prior.",
      category: "Microneedling",
      isExpanded: false,
    },

    // Laser Hair Removal - General FAQs
    {
      id: 31,
      question: "How long do laser hair removal results last?",
      answer:
        "Laser hair removal provides long-lasting results. After completing a full course (6-8 sessions), most clients enjoy permanent hair reduction with occasional maintenance sessions.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 32,
      question: "When will I see results from laser hair removal?",
      answer:
        "Hair will start shedding 1-3 weeks after treatment. You'll notice significant reduction after 3-4 sessions, with optimal results after completing the full course.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 33,
      question: "Is laser hair removal painful?",
      answer:
        "Most clients describe the sensation as a rubber band snapping against the skin. We use cooling technology to minimize discomfort during treatment.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 34,
      question: "What should I avoid before laser hair removal?",
      answer:
        "Avoid plucking, waxing, and sunbeds for 4-6 weeks before treatment. Shave the area 24 hours prior and avoid fake tan. A patch test is required 24-48 hours before your first session.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 35,
      question: "Are there aftercare restrictions for laser hair removal?",
      answer:
        "Avoid heat treatments, hot baths, saunas, and exercise for 24-48 hours. Use SPF 30+ daily and avoid sun exposure on treated areas. Don't pluck or wax between sessions.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
  ]

  setActiveCategory(category: string) {
    this.activeCategory = category
    // Close all expanded FAQs when switching categories
    this.faqs.forEach((faq) => (faq.isExpanded = false))
  }

  getFilteredFAQs(): FAQ[] {
    if (this.activeCategory === "Expand All") {
      return this.faqs
    }
    return this.faqs.filter((faq) => faq.category === this.activeCategory)
  }

  toggleFAQ(id: number) {
    const faq = this.faqs.find((f) => f.id === id)
    if (faq) {
      faq.isExpanded = !faq.isExpanded
    }
  }

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

}
