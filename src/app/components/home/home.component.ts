import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { ReviewTestimonialComponent } from "../review-testimonial/review-testimonial.component";
import {MatDialog, MatDialogModule,} from '@angular/material/dialog';
import { RouterLink } from "@angular/router";
import { DialogComponent } from '../dialog/dialog.component';
import { take } from 'rxjs';

interface Service {
  name: string;
  image: string;
}

interface VideoItem {
  src: string;
  poster: string;
  title: string;
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
  imports: [ContactUsComponent, ReviewTestimonialComponent, RouterLink,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  heroUrl = 'assets/hero-bg.jpg';
  // Hero Section Variables
  typedText: string = "";
  // simple config
  private readonly DIALOG_LS_KEY = 'promoClosedAt';
  private readonly COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h (change to 6*60*60*1000 for 6h)
  private typingInterval?: number;
  currentIndex = 0;
  isAnimating = false;
  private intervalId?: number;

  constructor(private dialog:MatDialog){} 

   private shouldOpenPromoDialog(): boolean {
    if (typeof window === 'undefined') return false;
    const ts = Number(localStorage.getItem(this.DIALOG_LS_KEY));
    if (!ts || Number.isNaN(ts)) return true;

    const expired = (Date.now() - ts) > this.COOLDOWN_MS;
    if (expired) {
      // auto-clear so it can show again next time
      try { localStorage.removeItem(this.DIALOG_LS_KEY); } catch {}
    }
    return expired; // open only if expired
  }

  openDialog(): void {
    const ref = this.dialog.open(DialogComponent, { data: { compact: false } });

    // remember close time so we don't reopen during cooldown
    ref.afterClosed().subscribe(() => {
      try { localStorage.setItem(this.DIALOG_LS_KEY, String(Date.now())); } catch {}
    });
  }
  // Hero Section Data
  services: Service[] = [
    { name: "Laser Removal", image: "assets/service-images/laser-hair-removal.webp" },
    { name: "Fat Dissolving", image: "assets/service-images/fat-dissolving.webp" },
    { name: "Facial Therapy", image: "assets/service-images/facial-treatment.webp" },
    { name: "Dermal Filler", image: "assets/service-images/dermal-filler.webp" },
    { name: "Waxing", image: "assets/service-images/waxing.webp" },
    { name: "Hydra Facial", image: "assets/service-images/hydra-facial.webp" },
    { name: "Skin Care", image: "assets/service-images/skin-care.webp" },
    { name: "Anti-Wrinkle", image: "assets/service-images/anti-wrinkle-treatment.webp" }
  ];

  // Features Section Data
  features: Feature[] = [
    {
      icon: "assets/Logo/service-images/technology-2.png",
      title: "Advanced Technology",
      description:
        "We use the latest beauty and aesthetic equipment to deliver safe, effective, and long-lasting results.",
    },
    {
      icon: "assets/Logo/service-images/safe-2.png",
      title: "Hygienic & Safe",
      description:
        "Our clinic maintains the highest standards of hygiene and safety for every client, every time.",
    },
    {
      icon: "assets/Logo/service-images/environment-2.png",
      title: "Comfortable Environment",
      description:
        "Enjoy a relaxing and welcoming atmosphere designed to make your beauty journey stress-free.",
    },
    {
      icon: "assets/Logo/service-images/pound-2.png",
      title: "Affordable Packages",
      description:
        "Get premium quality treatments at transparent and competitive prices, with flexible packages.",
    },
  ];

  // FAQ Section Data
  activeCategory = "Anti-Wrinkle Treatments"

  categories = [
    "Anti-Wrinkle Treatments",
    "Dermal Fillers",
    "HydraFacials",
    "Body Waxing",
    "Microneedling",
    "Laser Hair Removal",
  ]

  faqs: FAQ[] = [
  // Anti-Wrinkle Treatments - General FAQs
  {
    id: 1,
    question: "How long do anti-wrinkle results last?",
    answer: "Typically 3–4 months before a top-up is needed.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 2,
    question: "When will I see results?",
    answer: "Initial softening of lines in 3–5 days; full effect within 2 weeks.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 3,
    question: "What areas can be treated?",
    answer: "Commonly forehead lines, frown lines and crow's feet.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 4,
    question: "Does the treatment hurt?",
    answer: "Only brief pin-pricks; discomfort is minimal.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 5,
    question: "What product is used?",
    answer: "A prescription-only botulinum toxin type A.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 6,
    question: "Will it freeze my face?",
    answer: "No—correct dosing relaxes muscles without removing natural expression.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 7,
    question: "How long is the appointment?",
    answer: "Usually about 20 minutes including consultation.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 8,
    question: "Who should avoid this treatment?",
    answer: "Pregnant or breastfeeding clients and anyone with certain neurological conditions.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 9,
    question: "Can it be combined with other treatments?",
    answer: "Yes—often paired with dermal fillers or skin boosters for a full rejuvenation plan.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 10,
    question: "Is it safe?",
    answer: "Yes, when performed by a qualified medical professional.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  // Anti-Wrinkle Treatments - Before & After FAQs
  {
    id: 11,
    question: "What should I avoid before treatment?",
    answer: "Avoid alcohol and blood-thinning medication 24 hours beforehand to reduce bruising.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 12,
    question: "Can I wear makeup to my appointment?",
    answer: "Arrive with clean skin; light makeup will be removed before treatment.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 13,
    question: "Should I stop using certain skincare products?",
    answer: "Pause retinol or strong acids 2–3 days before treatment.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 14,
    question: "Can I exercise after the injections?",
    answer: "Avoid vigorous exercise for 24 hours.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 15,
    question: "When can I touch or massage the area?",
    answer: "Do not massage or press on treated areas for at least 4 hours.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 16,
    question: "When can I have a facial?",
    answer: "Wait 2 weeks before any other facial treatments.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 17,
    question: "What if I get a headache afterwards?",
    answer: "Paracetamol is usually fine; avoid ibuprofen or aspirin unless advised.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 18,
    question: "How long until I see the final effect?",
    answer: "Full smoothing of lines is visible at about 2 weeks.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 19,
    question: "How should I sleep after treatment?",
    answer: "Sleep on your back the first night to avoid pressure on treated areas.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  {
    id: 20,
    question: "What if I notice uneven results?",
    answer: "Book a review appointment; small top-ups can correct any asymmetry.",
    category: "Anti-Wrinkle Treatments",
    isExpanded: false,
  },
  // Dermal Fillers - General FAQs
  {
    id: 21,
    question: "How long do dermal filler results last?",
    answer: "Depending on the product and area, typically 6–18 months.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 22,
    question: "When will I see results?",
    answer: "Volume and contour improvements are visible immediately, with subtle settling in 1–2 weeks.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 23,
    question: "What areas can be treated with fillers?",
    answer: "Lips, cheeks, chin, jawline, nasolabial folds and under-eye tear troughs.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 24,
    question: "Does the treatment hurt?",
    answer: "A topical numbing cream and lidocaine in the filler minimise discomfort; you may feel mild pressure.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 25,
    question: "Can fillers migrate?",
    answer: "Migration is rare when injected by a trained professional and aftercare instructions are followed.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 26,
    question: "Are there any risks of lumps?",
    answer: "Temporary swelling or small lumps can occur but usually settle or can be smoothed by your injector.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 27,
    question: "How long does the appointment take?",
    answer: "Generally 30–60 minutes including consultation.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 28,
    question: "Who should avoid dermal fillers?",
    answer: "Those who are pregnant, breastfeeding or have active skin infections in the treatment area.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 29,
    question: "Can fillers be combined with anti-wrinkle injections?",
    answer: "Yes, often done in the same session for a comprehensive rejuvenation.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 30,
    question: "Are the results natural?",
    answer: "Yes, when placed conservatively and in proportion to your facial features.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  // Dermal Fillers - Before & After FAQs
  {
    id: 31,
    question: "What should I avoid before my appointment?",
    answer: "Avoid alcohol and blood thinners for 48 hours to reduce bruising.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 32,
    question: "Do I need to stop skincare products before treatment?",
    answer: "Discontinue strong actives such as retinol or acids 2–3 days beforehand.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 33,
    question: "Can I wear lipstick after lip filler?",
    answer: "Wait at least 12 hours before applying lipstick or lip balm.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 34,
    question: "How long will swelling last?",
    answer: "Typically 24–48 hours; lips can remain puffy for up to a week.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 35,
    question: "When can I exercise again?",
    answer: "Avoid heavy exercise for 24–48 hours to minimise swelling and bruising.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 36,
    question: "Can I fly soon after filler?",
    answer: "Yes, but it's best to wait at least 24 hours to reduce the risk of swelling from cabin pressure.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 37,
    question: "How should I sleep the first night?",
    answer: "Sleep on your back with your head slightly elevated to limit swelling.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 38,
    question: "When can I have dental work?",
    answer: "Avoid dental procedures two weeks before or after lip filler to reduce infection risk.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 39,
    question: "What if I feel lumps under the skin?",
    answer: "Gently massage only if advised; otherwise contact your practitioner for assessment.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  {
    id: 40,
    question: "When is a top-up recommended?",
    answer: "Usually 6–12 months after treatment depending on the area and desired results.",
    category: "Dermal Fillers",
    isExpanded: false,
  },
  // HydraFacials - General FAQs
  {
    id: 41,
    question: "What is a HydraFacial?",
    answer: "A multi-step facial that cleanses, exfoliates, extracts impurities and infuses hydrating serums.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 42,
    question: "How long do the results last?",
    answer: "The fresh, hydrated glow typically lasts 4–6 weeks.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 43,
    question: "When will I see results?",
    answer: "Skin looks brighter and smoother immediately after treatment.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 44,
    question: "Does it hurt?",
    answer: "No—it feels like a gentle vacuum or light massage.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 45,
    question: "Who is suitable for this treatment?",
    answer: "All skin types, including sensitive, dry, oily and acne-prone skin.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 46,
    question: "Can it help with acne?",
    answer: "Yes, it unclogs pores and reduces blackheads and congestion.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 47,
    question: "Does it improve fine lines?",
    answer: "Regular treatments can soften fine lines and improve skin texture.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 48,
    question: "How long is a session?",
    answer: "Typically 30–45 minutes, up to 60 minutes for advanced protocols.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 49,
    question: "Can it be combined with other treatments?",
    answer: "Yes, it pairs well with LED therapy or mild chemical peels.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 50,
    question: "How often should I book a HydraFacial?",
    answer: "Every 4–6 weeks for best maintenance.",
    category: "HydraFacials",
    isExpanded: false,
  },
  // HydraFacials - Before & After FAQs
  {
    id: 51,
    question: "Should I stop certain skincare before treatment?",
    answer: "Discontinue retinol, AHAs or BHAs 2–3 days prior.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 52,
    question: "Can I wear makeup to my appointment?",
    answer: "Arrive with clean skin; any makeup will be removed.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 53,
    question: "Can I have waxing or laser just before or after?",
    answer: "Wait at least 48 hours before or after waxing or laser hair removal.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 54,
    question: "Do I need to shave my face beforehand?",
    answer: "No, shaving is not required.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 55,
    question: "What should I avoid immediately after treatment?",
    answer: "Skip hot saunas, steam rooms and vigorous exercise for 24 hours.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 56,
    question: "When can I restart retinol or acids?",
    answer: "Wait 48 hours after the facial.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 57,
    question: "Can I apply makeup straight after?",
    answer: "You can, but it's ideal to leave skin makeup-free for the rest of the day.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 58,
    question: "How should I care for my skin afterwards?",
    answer: "Use a gentle cleanser, hydrating serum and daily SPF 30+.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 59,
    question: "Is there any downtime or peeling?",
    answer: "Usually none; mild pinkness may last an hour or two.",
    category: "HydraFacials",
    isExpanded: false,
  },
  {
    id: 60,
    question: "When will I see the best results?",
    answer: "Hydration and radiance are immediate and continue to improve over the next few days.",
    category: "HydraFacials",
    isExpanded: false,
  },
  // Body Waxing - General FAQs
  {
    id: 61,
    question: "How long do body waxing results last?",
    answer: "Typically 3–6 weeks depending on your hair growth cycle and area treated.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 62,
    question: "Does waxing make hair grow back thicker?",
    answer:
      "No, waxing does not change the hair's thickness or colour; regrowth feels softer because the hair tapers to a fine point.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 63,
    question: "What areas can be waxed?",
    answer: "Legs, arms, underarms, bikini line, chest, back and face (eyebrows, upper lip, chin).",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 64,
    question: "Does waxing hurt?",
    answer: "You may feel a quick sting when the wax is removed; the sensation lessens with regular treatments.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 65,
    question: "Can people with sensitive skin have waxing?",
    answer: "Yes, but your therapist can use a gentle wax and soothing aftercare to reduce irritation.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 66,
    question: "How long should the hair be?",
    answer: "At least ¼ inch (about a grain of rice) so the wax can grip properly.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 67,
    question: "How often should I get waxed?",
    answer: "Every 4–6 weeks to keep hair cycles consistent and growth finer.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 68,
    question: "Is waxing safe during pregnancy?",
    answer: "Yes, but the skin may be more sensitive—tell your therapist so they can take extra care.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 69,
    question: "Can waxing be combined with other treatments?",
    answer: "Yes, but avoid chemical peels, laser or strong exfoliation for a few days before and after.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 70,
    question: "Will there be any downtime?",
    answer: "No, but the skin may be slightly red or tender for a few hours.",
    category: "Body Waxing",
    isExpanded: false,
  },
  // Body Waxing - Before & After FAQs
  {
    id: 71,
    question: "How should I prepare before waxing?",
    answer: "Exfoliate gently 24 hours beforehand and moisturise lightly; avoid heavy creams on the day.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 72,
    question: "Should I avoid certain medications?",
    answer: "Retinoids or acne medications can make skin fragile—check with your therapist first.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 73,
    question: "Can I tan before or after waxing?",
    answer: "Avoid sunbathing or tanning beds for 24–48 hours before and after treatment.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 74,
    question: "Is it okay to exercise straight after?",
    answer: "Wait at least 24 hours before vigorous exercise to prevent sweat-induced irritation.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 75,
    question: "What should I wear after waxing?",
    answer: "Loose, breathable clothing to reduce friction.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 76,
    question: "How can I prevent ingrown hairs?",
    answer: "Exfoliate gently 2–3 times per week starting 2–3 days after treatment and moisturise daily.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 77,
    question: "Can I shower straight after?",
    answer: "Take a lukewarm shower if needed but avoid very hot water for 24 hours.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 78,
    question: "When can I resume active skincare (like acids) on waxed areas?",
    answer: "Wait 2–3 days to prevent irritation.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 79,
    question: "Is redness normal after waxing?",
    answer: "Yes, mild redness or small bumps usually settle within a few hours.",
    category: "Body Waxing",
    isExpanded: false,
  },
  {
    id: 80,
    question: "What if I notice small pimples or irritation?",
    answer: "Keep the area clean and avoid touching; apply a soothing or antibacterial lotion if needed.",
    category: "Body Waxing",
    isExpanded: false,
  },
  // Dermaplaning - General FAQs
  {
    id: 81,
    question: "What is dermaplaning?",
    answer:
      'A non-invasive treatment that gently removes dead skin cells and vellus hair ("peach fuzz") using a sterile surgical blade.',
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 82,
    question: "How long do the results last?",
    answer: "The smooth, bright finish typically lasts 3–4 weeks.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 83,
    question: "Will my hair grow back thicker?",
    answer: "No, vellus hair grows back the same texture and colour.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 84,
    question: "Does it hurt?",
    answer: "No, you'll feel only a light scraping sensation.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 85,
    question: "What skin types can have dermaplaning?",
    answer: "Most skin types except those with active acne or severe rosacea.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 86,
    question: "Does it help with fine lines and uneven texture?",
    answer: "Yes, by removing dead skin cells it improves product absorption and softens the look of fine lines.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 87,
    question: "How long does the treatment take?",
    answer: "Around 30–45 minutes.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 88,
    question: "Can it be combined with other treatments?",
    answer: "Yes, it pairs well with hydrating masks, chemical peels or LED therapy.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 89,
    question: "Is there any downtime?",
    answer: "Minimal—skin may look slightly pink for a few hours.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 90,
    question: "How often should I have it done?",
    answer: "Every 4–6 weeks for best maintenance.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  // Dermaplaning - Before & After FAQs
  {
    id: 91,
    question: "Should I stop certain skincare before treatment?",
    answer: " ",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 92,
    question: "Can I wear makeup to my appointment?",
    answer: "Arrive with clean skin; makeup will be removed.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 93,
    question: "Can I have waxing or laser before or after?",
    answer: "Wait at least 48 hours before or after waxing or laser hair removal.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 94,
    question: "What should I avoid immediately after?",
    answer: "Skip hot saunas, steam rooms and vigorous exercise for 24 hours.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 95,
    question: "When can I resume retinol or strong acids?",
    answer: "Wait 3 days after treatment.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 96,
    question: "Can I apply makeup straight away?",
    answer: "It's best to wait until the next day to allow the skin to settle.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 97,
    question: "How should I care for my skin afterwards?",
    answer: "Use a gentle cleanser, hydrating serum and daily SPF 30+.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 98,
    question: "Is there any peeling?",
    answer: "Generally none; a small amount of flaking may occur in very dry skin.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 99,
    question: "How soon will I see results?",
    answer: "Instantly—skin feels smoother and makeup applies flawlessly.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  {
    id: 100,
    question: "When can I have another dermaplaning session?",
    answer: "After 4–6 weeks to maintain results.",
    category: "Dermaplaning",
    isExpanded: false,
  },
  // Microneedling - General FAQs
  {
    id: 101,
    question: "What is microneedling?",
    answer:
      "A skin treatment that uses tiny sterile needles to create micro-channels, stimulating collagen and elastin production.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 102,
    question: "What concerns does it treat?",
    answer: "Fine lines, enlarged pores, acne scars, uneven texture and mild pigmentation.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 103,
    question: "How long do results last?",
    answer: "Collagen stimulation continues for months; a course of 3–6 sessions gives best long-term results.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 104,
    question: "When will I see improvement?",
    answer: "A healthy glow appears within a week; visible texture improvements develop over 4–6 weeks.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 105,
    question: "Does it hurt?",
    answer: "A topical anaesthetic is applied; you may feel mild scratching or tingling.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 106,
    question: "How long does a session take?",
    answer: "About 45–60 minutes including numbing time.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 107,
    question: "Is there downtime?",
    answer: "Expect mild redness like sunburn for 24–48 hours; slight flaking or dryness may follow.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 108,
    question: "Can all skin types have microneedling?",
    answer: "Yes, except for those with active acne, eczema or certain skin infections.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 109,
    question: "Can it be combined with other treatments?",
    answer: "Yes, but avoid strong peels or laser within two weeks.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 110,
    question: "How many treatments will I need?",
    answer: "Usually 3–6 sessions spaced 4–6 weeks apart for optimal results.",
    category: "Microneedling",
    isExpanded: false,
  },
  // Microneedling - Before & After FAQs
  {
    id: 111,
    question: "Should I stop certain skincare before treatment?",
    answer: "Discontinue retinol, AHAs and BHAs 3–5 days before.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 112,
    question: "Can I wear makeup to the appointment?",
    answer: "Arrive with clean skin; makeup will be removed before numbing cream is applied.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 113,
    question: "Can I have waxing or laser close to the treatment?",
    answer: "Avoid for at least a week before and after.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 114,
    question: "What should I avoid immediately after?",
    answer: "Skip hot showers, saunas, swimming and heavy exercise for 24–48 hours.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 115,
    question: "When can I restart active skincare like retinol?",
    answer: "Wait 5–7 days until the skin has fully recovered.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 116,
    question: "Can I apply makeup after?",
    answer: "Wait at least 24 hours; use only mineral makeup if necessary.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 117,
    question: "How should I care for my skin afterwards?",
    answer: "Use gentle cleanser, hydrating serum and broad-spectrum SPF daily.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 118,
    question: "Is peeling or flaking normal?",
    answer: "Mild flaking or dryness can occur for a few days.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 119,
    question: "When will I notice results?",
    answer: "An initial glow appears within a week; collagen improvements continue for months.",
    category: "Microneedling",
    isExpanded: false,
  },
  {
    id: 120,
    question: "When can I have the next session?",
    answer: "After 4–6 weeks to allow full healing.",
    category: "Microneedling",
    isExpanded: false,
  },
  // Laser Hair Removal - General FAQs
  {
    id: 121,
    question: "What is laser hair removal?",
    answer: "A treatment that uses concentrated light to target and disable hair follicles, reducing hair growth.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 122,
    question: "How many sessions will I need?",
    answer: "Typically 6–8 sessions spaced 4–6 weeks apart for best long-term reduction.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 123,
    question: "When will I see results?",
    answer: "Noticeable hair reduction is usually seen after 2–3 sessions.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 124,
    question: "Does the treatment hurt?",
    answer: "It feels like quick elastic-band snaps; cooling technology reduces discomfort.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 125,
    question: "What hair and skin types respond best?",
    answer: "Dark hair and light skin respond fastest; newer lasers can treat a broader range of skin tones.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 126,
    question: "How long do results last?",
    answer: "Permanent hair reduction is achieved; occasional maintenance sessions may be needed.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 127,
    question: "How long is each session?",
    answer: "From 15 minutes for small areas to about 60 minutes for larger areas.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 128,
    question: "Is it safe?",
    answer: "Yes, when performed by a trained professional using medical-grade equipment.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 129,
    question: "Can it be combined with other treatments?",
    answer: "Yes, but avoid other skin treatments on the same area for at least 2 weeks.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 130,
    question: "Is there any downtime?",
    answer: "No; skin may be slightly red or feel warm for a few hours.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  // Laser Hair Removal - Before & After FAQs
  {
    id: 131,
    question: "How should I prepare before treatment?",
    answer: "Shave the treatment area 24 hours beforehand.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 132,
    question: "Can I wax or pluck before sessions?",
    answer: "No—avoid waxing, plucking or epilating for at least 4 weeks before treatment.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 133,
    question: "Can I use self-tan or sunbathe?",
    answer: "Avoid sunbeds and self-tan for 2 weeks before and after each session.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 134,
    question: "What skincare should I avoid before?",
    answer: "Stop using strong acids, retinol or exfoliating products 3–5 days prior.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 135,
    question: "Can I wear makeup on the day?",
    answer: "Remove makeup from the treatment area before the session.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 136,
    question: "What should I avoid after treatment?",
    answer: "Skip hot baths, saunas and vigorous exercise for 48 hours.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 137,
    question: "How should I care for my skin afterwards?",
    answer: "Apply aloe vera gel or a gentle moisturiser and use SPF 30+ daily.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 138,
    question: "Is redness or swelling normal?",
    answer: "Yes, mild redness or follicle swelling can occur and usually settles within 24 hours.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 139,
    question: "When can I resume hair removal methods?",
    answer: "Shaving is fine, but avoid waxing or plucking between sessions.",
    category: "Laser Hair Removal",
    isExpanded: false,
  },
  {
    id: 140,
    question: "When can I book the next session?",
    answer: "Typically 4–6 weeks later, depending on the hair growth cycle.",
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
     // Only open if not dismissed recently
    if (this.shouldOpenPromoDialog()) {
      this.openDialog();
    }
    this.typeWriterEffect(this.currentServiceName);
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    this.io?.disconnect();
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

  whatsappEnquiry(): void {
    const message = encodeURIComponent("Hi")
    const phone = "+447878350664"
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
    window.open(whatsappUrl, "_blank")
  }


  // video 
  @ViewChild('trackRef', { static: true }) trackRef!: ElementRef<HTMLElement>;
  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  items: VideoItem[] = [
    { src: 'assets/video/1.mp4', poster: 'assets/social/1.jpg', title: 'Did you know?' },
    { src: 'assets/video/2.mp4', poster: 'assets/social/2.jpg', title: 'Unboxing' },
    { src: 'assets/video/3.mp4', poster: 'assets/social/3.jpg', title: 'Travel BFF' },
    { src: 'assets/video/4.mp4', poster: 'assets/social/4.jpg', title: 'Personal BFF' },
    { src: 'assets/video/5.mp4', poster: 'assets/social/5.jpg', title: 'Minimal Desk' },
    { src: 'assets/video/6.mp4', poster: 'assets/social/6.jpg', title: 'Living Room' },
  ];

  private io?: IntersectionObserver;

  // drag-to-scroll
  private isDown = false;
  private startX = 0;
  private startLeft = 0;

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  private setupObserver() {
    const root = this.trackRef.nativeElement;
    this.io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            v.muted = true;
            v.play().catch(() => { });
          } else {
            v.pause();
          }
        });
      },
      { root, threshold: [0, 0.6, 1] }
    );
    setTimeout(() => this.videos.forEach(ref => this.io!.observe(ref.nativeElement)));
  }

  // arrow nudge
  scroll(dir: 'left' | 'right') {
    const el = this.trackRef.nativeElement;
    const by = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'left' ? -by : by, behavior: 'smooth' });
  }

  // translate vertical wheel to horizontal
  onWheel(e: WheelEvent) {
    const el = this.trackRef.nativeElement;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
  }

  // pointer drag
  onPointerDown(e: PointerEvent) {
    const el = this.trackRef.nativeElement;
    this.isDown = true;
    this.startX = e.clientX;
    this.startLeft = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.classList.add('grabbing');
  }
  onPointerMove(e: PointerEvent) {
    if (!this.isDown) return;
    const el = this.trackRef.nativeElement;
    el.scrollLeft = this.startLeft - (e.clientX - this.startX);
  }
  onPointerUp(e: any) {
    const el = this.trackRef.nativeElement;
    this.isDown = false;
    try { el.releasePointerCapture(e.pointerId); } catch { }
    el.classList.remove('grabbing');
  }



}
