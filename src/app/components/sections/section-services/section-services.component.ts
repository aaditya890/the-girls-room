import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"


interface Service {
  id: number
  title: string
  description: string
  image: string
}
@Component({
  selector: 'app-section-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-services.component.html',
  styleUrl: './section-services.component.scss'
})
export class SectionServicesComponent implements OnInit, OnDestroy {
  currentIndex = 0;                // points to the "active" service (also first card)
  visibleCount = 3;                // show 3 cards
  serviceInterval: any;
  imageInterval: any;

  services: Service[] = [
    {
      id: 1,
      title: "Anti-Wrinkle Treatment",
      description:
        "Smooth away fine lines and wrinkles with expert anti-wrinkle injections designed to refresh your natural look.",
      image: "/images/anti-wrinkle.jpg",
    },
    {
      id: 2,
      title: "Dermal Filler",
      description:
        "Restore volume and enhance contours with safe, precise fillers for a youthful, radiant appearance.",
      image: "/images/dermal-filler.jpg",
    },
    {
      id: 3,
      title: "Facial",
      description:
        "Revitalize your skin with bespoke facials that cleanse, hydrate, and leave your complexion glowing.",
      image: "/images/facial.jpg",
    },
    {
      id: 4,
      title: "Fat Dissolving",
      description:
        "Target stubborn areas with advanced fat-dissolving treatments for a more sculpted silhouette.",
      image: "/images/fat-dissolving.jpg",
    },
    {
      id: 5,
      title: "Laser Hair Removal",
      description:
        "Achieve silky, long-lasting smoothness with safe and effective laser hair removal.",
      image: "/images/laser-hair-removal.jpg",
    },
  ];

  serviceImages: string[] = [
    "/images/beauty-1.jpg",
    "/images/beauty-2.jpg",
    "/images/beauty-3.jpg",
    "/images/beauty-4.jpg",
    "/images/beauty-5.jpg",
  ];

  cardTitles: string[] = [
    "LUXURY SPA EXPERIENCE",
    "PREMIUM SKINCARE PRODUCTS",
    "MODERN CLINIC FACILITIES",
    "RELAXING FACIAL MASSAGE",
    "PROFESSIONAL EQUIPMENT",
  ];

  ngOnInit(): void {
    this.startServiceRotation();
    this.startImageRotation();
  }

  ngOnDestroy(): void {
    this.stopServiceRotation();
    this.stopImageRotation();
  }

  // --- Rotation ---
  startServiceRotation(): void {
    this.stopServiceRotation();
    this.serviceInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.services.length;
    }, 4000);
  }
  stopServiceRotation(): void {
    if (this.serviceInterval) clearInterval(this.serviceInterval);
  }
  startImageRotation(): void {
    this.stopImageRotation();
    this.imageInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.serviceImages.length;
    }, 2500);
  }
  stopImageRotation(): void {
    if (this.imageInterval) clearInterval(this.imageInterval);
  }
  restartRotation(): void {
    this.stopServiceRotation();
    setTimeout(() => this.startServiceRotation(), 2000);
  }

  // --- Helpers for 3-card window over 5 services ---
  getGlobalIndex(offset: number): number {
    return (this.currentIndex + offset) % this.services.length;
  }
  get visibleServices(): Service[] {
    return Array.from({ length: this.visibleCount }, (_, i) => this.services[this.getGlobalIndex(i)]);
  }

  // --- UI bindings ---
  selectByOffset(offset: number): void {
    this.currentIndex = this.getGlobalIndex(offset);
    this.restartRotation();
  }

  get currentService(): Service {
    return this.services[this.currentIndex];
  }

  currentImageIndex = 0;
  get currentImage(): string {
    return this.serviceImages[this.currentImageIndex];
  }
}

