import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReviewTestimonialComponent } from "../review-testimonial/review-testimonial.component";
import { ContactUsComponent } from "../contact-us/contact-us.component";

type AfterCareData = {
  url: string,
  title: string,
  subtitle: string
}


interface Certificate {
  id: number
  title: string
  description: string
  recipient: string
  institution: string
  image: string
  year?: string
}

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule, ReviewTestimonialComponent, ContactUsComponent],
  templateUrl: "./testimonials.component.html",
  styleUrls: ["./testimonials.component.scss"],
})
export class TestimonialsComponent {

  aftercareData: AfterCareData[] = [
    {
      url: "assets/after-care/11.webp",
      title: "JAW FILLER AND CHIN FILLER",
      subtitle: "Enhances facial definition while keeping proportions naturally balanced.",
    },
    {
      url: "assets/after-care/16.webp",
      title: "Lip Filler",
      subtitle: "Soft, even lip shape with subtle enhancement and long-lasting finish.",
    },
    {
      url: "assets/after-care/12.webp",
      title: "Anti-wrinkle Treatment Jaw and Cheek Filler",
      subtitle: "Reduces wrinkles and lifts cheek contours for a refreshed profile.",
    },
    {
      url: "assets/after-care/13.webp",
      title: "LIP FILLER",
      subtitle: "Adds gentle volume for fuller, natural-looking lips with symmetry.",
    },
    {
      url: "assets/after-care/14.webp",
      title: "JAW FILLER",
      subtitle: "Sculpts and sharpens the jawline for a more defined silhouette.",
    },
    {
      url: "assets/after-care/15.webp",
      title: "Lip Filler",
      subtitle: "Creates balanced lip volume with hydration and smooth, soft edges.",
    },
  ];

  currentSlide = 0
  isAutoPlaying = true
  autoSlideInterval = 3500 // 3.5 seconds for smooth viewing
  private slideTimer: any

certificates: Certificate[] = [
  {
    id: 1,
    title: "Advanced Botox",
    description: "Qualified in advanced Botox techniques for facial aesthetics.",
    recipient: "Angela Francis",
    institution: "The Vogue Academy",
    image: "assets/certificates/ADVANCED-BOTOX.webp",
    year: "2023",
  },
  {
    id: 2,
    title: "Foundation Botox",
    description: "Certified in foundation-level Botox treatments.",
    recipient: "Angela Francis",
    institution: "The Vogue Academy",
    image: "assets/certificates/FOUNDATION-BOTOX.webp",
    year: "2023",
  },
  {
    id: 3,
    title: "Foundation Filler",
    description: "Certified in dermal filler applications and facial contouring.",
    recipient: "Angela Francis",
    institution: "The Vogue Academy",
    image: "assets/certificates/FOUNDATION-FILLER.webp",
    year: "2023",
  },
  {
    id: 4,
    title: "Level 3 Aesthetics",
    description: "Qualified in anatomy, first aid, dermaplaning, microneedling, and skin peels.",
    recipient: "Angela Francis",
    institution: "The Vogue Academy",
    image: "assets/certificates/lvl-3.webp",
    year: "2023",
  },
  {
    id: 5,
    title: "Pathway to Aesthetics",
    description: "Comprehensive training pathway in aesthetics and skin care.",
    recipient: "Angela Francis",
    institution: "The Vogue Academy",
    image: "assets/certificates/PATHWAY-TO-AESTHETICS.webp",
    year: "2023",
  },
  // NEW
  {
    id: 6,
    title: "Post-Operative Care",
    description: "Qualified in post-operative care protocols for aesthetic procedures.",
    recipient: "Angela Francis",
    institution: "The Vogue Academy",
    image: "assets/certificates/Advanced-filler-Lily.webp", // or your file, e.g. 'assets/certificates/Advanced-filler-Lily.webp'
    year: "2024",
  },
];



  ngOnInit() {
    this.startAutoSlide()
  }

  ngOnDestroy() {
    this.stopAutoSlide()
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.certificates.length
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.certificates.length - 1 : this.currentSlide - 1
  }

  goToSlide(index: number) {
    this.currentSlide = index
  }

  focusOnCertificate(index: number) {
    this.currentSlide = index
    // Briefly pause auto-play when user interacts
    this.stopAutoSlide()
    setTimeout(() => {
      if (this.isAutoPlaying) {
        this.startAutoSlide()
      }
    }, 2000)
  }

  getLeftCertificates() {
    const leftIndices = this.getAdjacentIndices().left
    return leftIndices.map((index) => ({
      ...this.certificates[index],
      originalIndex: index,
    }))
  }

  getRightCertificates() {
    const rightIndices = this.getAdjacentIndices().right
    return rightIndices.map((index) => ({
      ...this.certificates[index],
      originalIndex: index,
    }))
  }

  private getAdjacentIndices() {
    const total = this.certificates.length
    const current = this.currentSlide

    // Calculate 2 certificates for left and 2 for right
    const leftIndices = [(current - 2 + total) % total, (current - 1 + total) % total]

    const rightIndices = [(current + 1) % total, (current + 2) % total]

    return { left: leftIndices, right: rightIndices }
  }

  startAutoSlide() {
    if (this.isAutoPlaying) {
      this.slideTimer = setInterval(() => {
        this.nextSlide()
      }, this.autoSlideInterval)
    }
  }

  stopAutoSlide() {
    if (this.slideTimer) {
      clearInterval(this.slideTimer)
      this.slideTimer = null
    }
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying
    if (this.isAutoPlaying) {
      this.startAutoSlide()
    } else {
      this.stopAutoSlide()
    }
  }

  // Pause auto-slide on hover
  onMouseEnter() {
    this.stopAutoSlide()
  }

  onMouseLeave() {
    if (this.isAutoPlaying) {
      this.startAutoSlide()
    }
  }

}
