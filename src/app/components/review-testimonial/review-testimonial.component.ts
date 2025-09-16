import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
}
@Component({
  selector: 'app-review-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-testimonial.component.html',
  styleUrls: ['./review-testimonial.component.scss']
})
export class ReviewTestimonialComponent implements OnInit, OnDestroy {
  currentSlide = 0
  currentMobileSlide = 0
  slidesToShow = 3 // Number of slides to show on desktop
  autoSlideInterval: any

testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chelsea Allman.",
    text: "First time lip filler with Angela. She was gentle, explained everything, and took her time. Love the natural result and new confidence.",
    rating: 5,
  },
  {
    id: 2,
    name: "Taronnie World.",
    text: "Had lips and Botox. Lips look natural, not overdone. Clinic was easy to find, spotless, and hygienic. Thrilled with results—will return.",
    rating: 5,
  },
  {
    id: 3,
    name: "Chantelle.",
    text: "Great service from Angela. She answered all questions and eased my nerves about microneedling. Results are great—highly recommend The Girls Room.",
    rating: 4,
  },
  {
    id: 4,
    name: "Rebecca Finn.",
    text: "Botox and Lemon Bottle with Angela. Felt comfortable, even with my daughter. Virtually painless, very professional, and I’m already seeing results. Will be back.",
    rating: 5,
  },
  {
    id: 5,
    name: "Natalie Hazlewood.",
    text: "Botox and brow lift at The Girls Room. Angela was gentle and welcoming, explaining each step. I’m obsessed with the results—highly recommend.",
    rating: 5,
  },
  {
    id: 6,
    name: "A Google User.",
    text: "Angela is the only one I trust. Detailed, calming, and precise—my Botox looks perfect. Excited to return for cheeks and lips; beautiful clinic.",
    rating: 5,
  },
  {
    id: 7,
    name: "Serina lyn.",
    text: "Tried a B12 injection after hearing great things. The team was professional; I barely felt the needle. Excited to notice the benefits soon.",
    rating: 4,
  },
  {
    id: 8,
    name: "Carolene Brissette.",
    text: "Friendly team and clean clinic. Lemon Bottle under the chin was comfortable and relaxing, with instant visible results. Excited for my second session.",
    rating: 5,
  },
  {
    id: 9,
    name: "Sal Chebbah.",
    text: "Lovely visit to The Girls Room. Great product range and excellent results. I’ll definitely be returning. Service was warm and professional.",
    rating: 5,
  },
  {
    id: 10,
    name: "Pest Control And Cleaning Ltd.",
    text: "Angela was friendly and professional. Dermaplaning and microneedling on my face, neck, and back were excellent. I’d recommend her to anyone.",
    rating: 4,
  },
];

  ngOnInit() {
    this.startAutoSlide()
  }

  ngOnDestroy() {
    this.stopAutoSlide()
  }

  get maxSlide(): number {
    return Math.max(0, this.testimonials.length - this.slidesToShow)
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++
    } else {
      this.currentSlide = 0 // Loop back to start
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--
    } else {
      this.currentSlide = this.maxSlide // Loop to end
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index
  }

  goToMobileSlide(index: number) {
    this.currentMobileSlide = index
  }

  getDots(): number[] {
    return Array(this.maxSlide + 1)
      .fill(0)
      .map((_, i) => i)
  }

  getStarArray(rating: number): { filled: boolean }[] {
    return Array(5)
      .fill(0)
      .map((_, i) => ({ filled: i < rating }))
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide()
      // Also advance mobile slide
      if (this.currentMobileSlide < this.testimonials.length - 1) {
        this.currentMobileSlide++
      } else {
        this.currentMobileSlide = 0
      }
    }, 5000) // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval)
    }
  }

  // Pause auto-slide on hover (optional)
  onMouseEnter() {
    this.stopAutoSlide()
  }

  onMouseLeave() {
    this.startAutoSlide()
  }
}
