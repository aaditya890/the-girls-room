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
      name: "Sophie L.",
      text: "The Girls Room completely transformed my skin. The team explained everything clearly, and the results were even better than I expected. I feel more confident every day.",
      rating: 5,
    },
    {
      id: 2,
      name: "Amelia R.",
      text: "From the moment I walked in, I felt so comfortable. The clinic has a calm, luxury feel and the treatments are tailored perfectly. Highly recommend!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily T.",
      text: "I loved how transparent the pricing was. No surprises, just amazing service and genuine care. My skin feels refreshed and healthier than ever.",
      rating: 4,
    },
    {
      id: 4,
      name: "Charlotte K.",
      text: "Professional, friendly, and results-driven. The Girls Room team truly care about your goals. My friends noticed the difference right away!",
      rating: 5,
    },
    {
      id: 5,
      name: "Olivia M.",
      text: "This is my go-to clinic now. They combine expertise with a personal touch, and I always leave feeling radiant. Definitely worth the visit.",
      rating: 5,
    },
    {
      id: 6,
      name: "Hannah P.",
      text: "The consultation was detailed and reassuring. The treatment exceeded my expectations, and the staff made me feel so comfortable throughout. Excellent experience!",
      rating: 5,
    },
    {
      id: 7,
      name: "Grace W.",
      text: "The team took the time to understand my needs. The results look natural, and I couldn’t be happier. Highly recommend The Girls Room to anyone.",
      rating: 4,
    },
    {
      id: 8,
      name: "Isabella D.",
      text: "Outstanding service! The clinic feels premium, the staff are kind, and the treatments are effective. I left feeling confident and refreshed.",
      rating: 5,
    },
    {
      id: 9,
      name: "Ella S.",
      text: "The experience was seamless from start to finish. The Girls Room is modern, welcoming, and the team is highly skilled. I will definitely be returning.",
      rating: 5,
    },
    {
      id: 10,
      name: "Mia J.",
      text: "Everything was explained thoroughly before the treatment. I felt at ease, and the results were exactly what I wanted. Beautiful clinic and professional staff.",
      rating: 4,
    }
  ]


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
