import { Component } from "@angular/core"
import { ContactUsComponent } from "../contact-us/contact-us.component"
import { RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"

type Treatment = {
  title: string
  slug: string
  summary: string
  content: string
  image: string
  benefits: string[]
  duration: string
  downtime: string
  results: string
  sessions: string
}

@Component({
  selector: "app-treatment",
  standalone: true,
  imports: [ContactUsComponent, RouterLink,CommonModule],
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent {
  heroUrl = "assets/images/treatments-hero.jpg"
  selectedTreatment: any

  intro = `Experience the perfect blend of advanced skincare technology and personalized care. Our comprehensive treatment menu addresses every aspect of skin health and aesthetic enhancement, from revitalizing facials that restore your natural glow to precision dermal treatments that turn back time. Each service is carefully curated to deliver exceptional results while maintaining the highest standards of safety and comfort.`

  treatments: Treatment[] = [
    {
      title: "Facial Treatment",
      slug: "facial-treatment",
      image: "assets/images/treatments/facial.jpg",
      summary: "Therapeutic sessions to cleanse, exfoliate, extract and nourish for healthier, radiant skin.",
      content: `Our signature facial treatments combine traditional techniques with modern technology to deliver exceptional results. Each session begins with a thorough skin analysis to determine the most suitable approach for your unique skin type and concerns.

The treatment includes deep cleansing to remove impurities, gentle exfoliation to reveal fresh skin, professional extractions when needed, and the application of customized masks and serums. We use only premium, clinically-proven products that nourish and protect your skin.

Our skilled aestheticians employ specialized massage techniques to improve circulation, promote lymphatic drainage, and enhance the absorption of active ingredients. The result is immediately visible: clearer, smoother, and more radiant skin that continues to improve with regular treatments.`,
      benefits: [
        "Deep cleansing and pore refinement",
        "Improved skin texture and tone",
        "Enhanced hydration and nourishment",
        "Reduced appearance of fine lines",
        "Immediate glow and radiance",
        "Customized to your skin type",
      ],
      duration: "60-90 minutes",
      downtime: "None",
      results: "Immediate",
      sessions: "Monthly recommended",
    },
    {
      title: "Advanced Skin Care",
      slug: "skin-care",
      image: "assets/images/treatments/skincare.jpg",
      summary: "Targeted routines for cleansing, exfoliation, moisturization and tone correction.",
      content: `Our advanced skincare treatments utilize cutting-edge technology and medical-grade products to address specific skin concerns. Whether you're dealing with acne, hyperpigmentation, aging, or sensitivity, we have targeted solutions.

These treatments may include chemical peels, microdermabrasion, LED light therapy, or advanced serums with active ingredients like retinoids, peptides, and growth factors. Each treatment is customized based on your skin analysis and goals.

We focus on building healthy skin from the foundation up, addressing underlying issues rather than just surface concerns. Our approach ensures long-lasting results and improved overall skin health.`,
      benefits: [
        "Targeted treatment for specific concerns",
        "Medical-grade products and technology",
        "Improved skin barrier function",
        "Reduced acne and breakouts",
        "Evening of skin tone and texture",
        "Long-term skin health improvement",
      ],
      duration: "45-75 minutes",
      downtime: "Minimal to none",
      results: "2-4 weeks",
      sessions: "Series recommended",
    },
    {
      title: "Dermal Fillers",
      slug: "dermal-fillers",
      image: "assets/images/treatments/fillers.jpg",
      summary: "Non-surgical volume restoration to soften lines and enhance facial contours.",
      content: `Dermal fillers offer a non-surgical solution to restore volume, smooth wrinkles, and enhance facial contours. Using premium hyaluronic acid-based fillers, we can address various concerns including nasolabial folds, marionette lines, lip enhancement, and cheek augmentation.

Our experienced practitioners use advanced injection techniques to ensure natural-looking results. The treatment is performed with precision, taking into account your facial anatomy and aesthetic goals to achieve harmonious enhancement.

The procedure is relatively quick with minimal discomfort, thanks to the use of topical anesthetics and ultra-fine needles. Results are immediate and continue to improve over the following days as any minor swelling subsides.`,
      benefits: [
        "Immediate volume restoration",
        "Natural-looking results",
        "Minimal downtime required",
        "Long-lasting effects",
        "Reversible treatment option",
        "Enhanced facial contours",
      ],
      duration: "30-60 minutes",
      downtime: "1-2 days",
      results: "Immediate",
      sessions: "Touch-ups as needed",
    },
    {
      title: "Anti-Wrinkle Treatment",
      slug: "anti-wrinkle",
      image: "assets/images/treatments/anti-wrinkle.jpg",
      summary: "Popular treatment for dynamic wrinkles (forehead, frown lines, crow's feet).",
      content: `Our anti-wrinkle treatments effectively address dynamic wrinkles caused by repetitive facial expressions. This popular treatment is particularly effective for forehead lines, frown lines between the eyebrows, and crow's feet around the eyes.

The treatment works by temporarily relaxing the muscles responsible for creating these expression lines, resulting in smoother, more youthful-looking skin. Our skilled practitioners use precise injection techniques to ensure natural-looking results that don't compromise your ability to express emotions.

The procedure is quick and relatively comfortable, with most clients returning to their normal activities immediately afterward. Results typically begin to appear within 3-5 days and reach full effect within two weeks.`,
      benefits: [
        "Smooths dynamic wrinkles effectively",
        "Prevents formation of new lines",
        "Quick, minimally invasive procedure",
        "Natural-looking results",
        "No surgery required",
        "Proven safety record",
      ],
      duration: "15-30 minutes",
      downtime: "None",
      results: "3-5 days",
      sessions: "Every 3-4 months",
    },
    {
      title: "Fat Dissolving",
      slug: "fat-dissolving",
      image: "assets/images/treatments/fat-dissolving.jpg",
      summary: "Non-surgical injections to target localized fat using agents like deoxycholic acid.",
      content: `Fat dissolving treatments offer a non-surgical approach to reducing localized fat deposits that are resistant to diet and exercise. Using FDA-approved injectable solutions, we can effectively target areas such as double chins, jowls, and other small fat pockets.

The treatment works by breaking down fat cells, which are then naturally eliminated by the body's lymphatic system. This process occurs gradually over several weeks, resulting in a more contoured and defined appearance.

Multiple sessions may be required depending on the area being treated and the amount of fat present. Our practitioners will assess your individual needs and create a customized treatment plan to achieve your desired results.`,
      benefits: [
        "Non-surgical fat reduction",
        "Targets stubborn fat deposits",
        "Permanent fat cell destruction",
        "Improved facial contours",
        "Minimal downtime required",
        "Natural-looking results",
      ],
      duration: "30-45 minutes",
      downtime: "3-5 days",
      results: "4-6 weeks",
      sessions: "2-4 treatments",
    },
    {
      title: "Skin Rejuvenation",
      slug: "skin-rejuvenation",
      image: "assets/images/treatments/rejuvenation.jpg",
      summary: "Advanced techniques to restore youthful texture, tone, and elasticity.",
      content: `Our comprehensive skin rejuvenation treatments combine multiple modalities to address signs of aging, sun damage, and skin texture issues. Using state-of-the-art technology including radiofrequency, microneedling, and advanced light therapies.

These treatments stimulate natural collagen production, improve skin elasticity, and promote cellular renewal. The result is firmer, smoother, and more youthful-looking skin with improved texture and tone.

We customize each treatment protocol based on your specific concerns and skin type, ensuring optimal results with minimal downtime. The treatments can be performed as standalone procedures or combined for enhanced benefits.`,
      benefits: [
        "Stimulates natural collagen production",
        "Improves skin texture and tone",
        "Reduces fine lines and wrinkles",
        "Minimizes pore appearance",
        "Evens skin pigmentation",
        "Restores youthful radiance",
      ],
      duration: "60-90 minutes",
      downtime: "2-3 days",
      results: "4-8 weeks",
      sessions: "3-6 treatments",
    },
  ]

  openTreatmentDialog(treatment: Treatment): void {
    this.selectedTreatment = treatment
    document.body.style.overflow = "hidden" // Prevent background scrolling
  }

  closeTreatmentDialog(): void {
    this.selectedTreatment = null
    document.body.style.overflow = "auto" // Restore scrolling
  }

  trackByIndex = (_: number, __: Treatment) => _
}
