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
      text: "Had lip filler done by the beautiful angela, she knew it was my first time ever having any work done. But she was so gentle and delicate and took her time it made the experience more comfortable. I absolutely love my lips done by Angela! It’s gave me so much more confidence. She is truly the best! Xx",
      rating: 5,
    },
    {
      id: 2,
      name: "Taronnie World.",
      text: "Had lips & botox done and my lips look amazing they have been perfectly filled without looking fake, the shop was easy to find very clean and hygienic. Over the moon with my results can't wait to re visit ☺.",
      rating: 5,
    },
    {
      id: 3,
      name: "Chantelle.",
      text: "Exceptional customer service from Angela.Answered all my questions promptly. Was nervous about micro needling and she explained thoroughly what to expect. Did an amazing job!!Highly recommend The Girls room london (Angela). Looking forward to getting some other work done. Thank you soo much.",
      rating: 4,
    },
    {
      id: 4,
      name: "Rebecca Finn.",
      text: "I had Botox and lemon bottle fat dissolving with Angela today. I’m so happy with the results already, I was able to bring my daughter with me and we both felt very welcomed and comfortable making the experience even better. Angela made sure I felt no pain and was very professional when doing the procedure. I will be sure to go back to the girls room again for my top ups and any other aesthetic treatment needed in the future ❤.",
      rating: 5,
    },
    {
      id: 5,
      name: "Natalie Hazlewood.",
      text: "I had my Botox and brow lift done by the girls room, and Angela was so gentle and inviting. I’m obsessed with my results. I would definitely recommend she explained everything step by step as she was doing my treatment.",
      rating: 5,
    },
    {
      id: 6,
      name: "A Google User.",
      text: "Angela is the only one I trust with my face! She has the magic touch and I am so happy with my Botox! It had been like 3 years since I’ve had anything done and I just had to come back to Angela! Her attention to detail and my needs are unmatched! I cant wait to get my cheeks and lips done with her. Also the space is so beautiful and calming they really did a great job with the aesthetic!!",
      rating: 5,
    },
    {
      id: 7,
      name: "Serina lyn.",
      text: "I've been hearing about B12 injections for some time now and decided to have it done. The Girls Room was very professional I did not even feel the needle going in. Looking forward to seeing the benefits of have the B12 done.",
      rating: 4,
    },
    {
      id: 8,
      name: "Carolene Brissette.",
      text: "Very friendly am comfortable clean environment I was advice very well on my treatment an after treatment I have a lemon bottle under chin it wasn’t painful I was well relaxed I got a instant result I am very happy an please with my treatment. Can’t wait to go back for my second session xx.",
      rating: 5,
    },
    {
      id: 9,
      name: "Sal Chebbah.",
      text: "Had a lovely time at the Girls Room and the products offering is amazing. Gréât results - will go back again.",
      rating: 5,
    },
    {
      id: 10,
      name: "Pest Control And Cleaning Ltd.",
      text: "Very professional service very friendly service by Angela I had derma planning and micro needling to my face neck and back it’s was very good I would recommend her to any one Very good service👏",
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
