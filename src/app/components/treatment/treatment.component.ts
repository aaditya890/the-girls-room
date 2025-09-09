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
  imports: [ContactUsComponent, RouterLink, CommonModule],
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.scss"],
})
export class TreatmentComponent {
  heroUrl = "assets/images/treatments-hero.jpg"
  selectedTreatment: any

  intro = `Experience the perfect blend of advanced skincare technology and personalized care. Our comprehensive treatment menu addresses every aspect of skin health and aesthetic enhancement, from revitalizing facials that restore your natural glow to precision dermal treatments that turn back time. Each service is carefully curated to deliver exceptional results while maintaining the highest standards of safety and comfort.`

  aftercareImages = [
    {
      url: "assets/images/aftercare/consultation.jpg",
      caption: "Initial Consultation",
    },
    {
      url: "assets/images/aftercare/treatment.jpg",
      caption: "Professional Treatment",
    },
    {
      url: "assets/images/aftercare/aftercare-kit.jpg",
      caption: "Aftercare Kit Provided",
    },
    {
      url: "assets/images/aftercare/follow-up.jpg",
      caption: "Follow-up Support",
    },
    {
      url: "assets/images/aftercare/results.jpg",
      caption: "Beautiful Results",
    },
    {
      url: "assets/images/aftercare/maintenance.jpg",
      caption: "Ongoing Maintenance",
    },
  ]

  treatments: Treatment[] = [
    {
      title: "Facials",
      slug: "facials",
      image: "assets/images/treatments/facial.jpg",
      summary:
        "Tailored skincare treatments designed to cleanse, exfoliate, and hydrate the skin, improving texture and promoting a healthy glow. Suitable for all skin types.",
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
      title: "Hydra Facial",
      slug: "hydra-facial",
      image: "assets/images/treatments/hydrafacial.jpg",
      summary:
        "A non-invasive, multi-step treatment that deeply cleanses, exfoliates, and hydrates the skin using advanced serums and vortex technology. Ideal for improving skin tone, texture, and clarity.",
      content: `Our HydraFacial treatment is a revolutionary approach to skin health that combines cleansing, exfoliation, extraction, hydration, and antioxidant protection in one comprehensive session. Using patented vortex technology, this treatment delivers immediate results with no downtime.

The multi-step process begins with gentle resurfacing to remove dead skin cells, followed by a painless extraction process that clears pores of impurities. The final step infuses the skin with intensive moisturizers and antioxidants, leaving your complexion glowing and refreshed.

This treatment is suitable for all skin types and addresses multiple concerns simultaneously, making it perfect for those seeking comprehensive skin improvement in a single session.`,
      benefits: [
        "Instant skin hydration and glow",
        "Improved skin texture and clarity",
        "Reduced appearance of fine lines",
        "Minimized pore appearance",
        "Enhanced skin elasticity",
        "No downtime required",
      ],
      duration: "45-60 minutes",
      downtime: "None",
      results: "Immediate",
      sessions: "Monthly recommended",
    },
    {
      title: "Anti-Wrinkle Injections",
      slug: "anti-wrinkle-injections",
      image: "assets/images/treatments/anti-wrinkle.jpg",
      summary:
        "Botulinum toxin injections that relax targeted facial muscles to reduce the appearance of fine lines and wrinkles. Commonly used on the forehead, crow's feet, and frown lines.",
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
      title: "Dermal Fillers",
      slug: "dermal-fillers",
      image: "assets/images/treatments/fillers.jpg",
      summary:
        "Injectable treatments using hyaluronic acid to restore volume, enhance facial contours, and smooth deep lines. Popular for lips, cheeks, and nasolabial folds.",
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
      title: "Fat Dissolving Injections",
      slug: "fat-dissolving-injections",
      image: "assets/images/treatments/fat-dissolving.jpg",
      summary:
        "Minimally invasive injections that break down stubborn fat cells in targeted areas such as the chin, abdomen, or thighs. Helps contour and slim the treated area.",
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
      title: "Waxing",
      slug: "waxing",
      image: "assets/images/treatments/waxing.jpg",
      summary:
        "Professional hair removal using warm wax to extract hair from the root. Leaves skin smooth and hair-free for up to four weeks.",
      content: `Our professional waxing services provide effective hair removal using high-quality warm wax formulations. We offer comprehensive waxing treatments for all areas of the body, from facial hair to full body services.

Our experienced technicians use gentle techniques to minimize discomfort while ensuring thorough hair removal. We maintain the highest standards of hygiene and use premium wax products suitable for all skin types, including sensitive skin.

The treatment removes hair from the root, resulting in slower regrowth and progressively finer hair texture with regular sessions. Our comfortable treatment rooms and professional approach ensure a pleasant experience every time.`,
      benefits: [
        "Long-lasting hair removal",
        "Smoother skin texture",
        "Reduced hair regrowth over time",
        "Professional hygiene standards",
        "Suitable for all body areas",
        "Cost-effective hair removal",
      ],
      duration: "15-120 minutes",
      downtime: "None",
      results: "Immediate",
      sessions: "Every 4-6 weeks",
    },
    {
      title: "Laser Hair Removal",
      slug: "laser-hair-removal",
      image: "assets/images/treatments/laser-hair-removal.jpg",
      summary:
        "Advanced treatment using medical-grade laser technology to permanently reduce unwanted hair. Safe, effective, and suitable for most skin types.",
      content: `Our laser hair removal treatments utilize state-of-the-art medical-grade laser technology to provide permanent hair reduction. The advanced laser systems target hair follicles with precision while protecting the surrounding skin.

The treatment works by delivering controlled light energy to the hair follicles, which absorb the light and are subsequently destroyed. This process effectively reduces hair growth over a series of treatments, with many clients experiencing permanent hair reduction.

Our certified technicians customize each treatment based on your skin type, hair color, and treatment area to ensure optimal results and safety. The procedure is comfortable and efficient, with most areas requiring only a few minutes of treatment time.`,
      benefits: [
        "Permanent hair reduction",
        "Precision targeting of hair follicles",
        "Suitable for most skin types",
        "Quick and comfortable treatment",
        "Long-term cost savings",
        "Smooth, hair-free skin",
      ],
      duration: "15-60 minutes",
      downtime: "None",
      results: "Progressive over sessions",
      sessions: "6-8 treatments",
    },
    {
      title: "Skin Care",
      slug: "skin-care",
      image: "assets/images/treatments/skin-care.jpg",
      summary:
        "Targeted skin care plans using professional-grade products to improve clarity, hydration, and overall skin health. Suitable for all skin types.",
      content: `Our Skin Care treatments focus on restoring balance and strengthening the skin barrier with a personalised plan. After a detailed skin analysis, we select professional-grade cleansers, exfoliants, serums, and moisturisers tailored to your goals—whether that's calming sensitivity, clearing breakouts, brightening pigmentation, or boosting hydration.

Treatments may include gentle exfoliation, mask therapy, LED/light hydration, and barrier-repair protocols. You'll leave with an easy, effective home-care routine to maintain results between visits.`,
      benefits: [
        "Improves overall skin health and glow",
        "Balances oil and hydration levels",
        "Targets acne, pigmentation, and dullness",
        "Strengthens the skin barrier",
        "Customised plan for your skin type",
        "Supports long-term results with home care"
      ],
      duration: "45–60 minutes",
      downtime: "None",
      results: "Immediate hydration; progressive clarity over weeks",
      sessions: "Every 4–6 weeks"
    }
  ]

  openTreatmentDialog(treatment: Treatment): void {
    this.selectedTreatment = treatment
    document.body.style.overflow = "hidden"
  }

  closeTreatmentDialog(): void {
    this.selectedTreatment = null
    document.body.style.overflow = "auto"
  }

  trackByIndex = (_: number, __: Treatment) => _
}
