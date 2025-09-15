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
    { name: "Anti-Wrinkle", image: "assets/service-images/anti-wrinkle-treatment.webp" },
    { name: "Waxing", image: "assets/service-images/waxing.webp" },
    { name: "Hydra Facial", image: "assets/service-images/hydra-facial.webp" },
    { name: "Skin Care", image: "assets/service-images/skin-care.webp" }
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
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 2,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 3,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 4,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 5,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 6,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 7,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 8,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 9,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 10,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    // Anti-Wrinkle Treatments - Before & After FAQs
    {
      id: 11,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 12,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 13,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 14,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 15,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 16,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 17,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 18,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 19,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    {
      id: 20,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
      category: "Anti-Wrinkle Treatments",
      isExpanded: false,
    },
    // Dermal Fillers - General FAQs
    {
      id: 21,
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 22,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 23,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 24,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 25,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 26,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 27,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 28,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 29,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 30,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    // Dermal Fillers - Before & After FAQs
    {
      id: 31,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 32,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 33,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 34,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 35,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 36,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 37,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 38,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 39,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    {
      id: 40,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
      category: "Dermal Fillers",
      isExpanded: false,
    },
    // HydraFacials - General FAQs
    {
      id: 41,
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 42,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 43,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 44,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 45,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 46,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 47,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 48,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 49,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 50,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "HydraFacials",
      isExpanded: false,
    },
    // HydraFacials - Before & After FAQs
    {
      id: 51,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 52,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 53,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 54,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 55,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 56,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 57,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 58,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 59,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "HydraFacials",
      isExpanded: false,
    },
    {
      id: 60,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
      category: "HydraFacials",
      isExpanded: false,
    },
    // Body Waxing - General FAQs
    {
      id: 61,
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 62,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 63,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 64,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 65,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 66,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 67,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 68,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 69,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 70,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "Body Waxing",
      isExpanded: false,
    },
    // Body Waxing - Before & After FAQs
    {
      id: 71,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 72,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 73,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 74,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 75,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 76,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 77,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 78,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 79,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "Body Waxing",
      isExpanded: false,
    },
    {
      id: 80,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
      category: "Body Waxing",
      isExpanded: false,
    },
    // Dermaplaning - General FAQs
    {
      id: 81,
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 82,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 83,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 84,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 85,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 86,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 87,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 88,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 89,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 90,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    // Dermaplaning - Before & After FAQs
    {
      id: 91,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 92,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 93,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 94,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 95,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 96,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 97,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 98,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 99,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    {
      id: 100,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
      category: "Dermaplaning",
      isExpanded: false,
    },
    // Microneedling - General FAQs
    {
      id: 101,
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 102,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 103,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 104,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 105,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 106,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 107,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 108,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 109,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 110,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "Microneedling",
      isExpanded: false,
    },
    // Microneedling - Before & After FAQs
    {
      id: 111,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 112,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 113,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 114,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 115,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 116,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 117,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 118,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 119,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "Microneedling",
      isExpanded: false,
    },
    {
      id: 120,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
      category: "Microneedling",
      isExpanded: false,
    },
    // Laser Hair Removal - General FAQs
    {
      id: 121,
      question: "How long do results last?",
      answer: "Results vary depending on treatment type and lifestyle.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 122,
      question: "When will I see results?",
      answer: "Most treatments show results within days to weeks.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 123,
      question: "Is the treatment painful?",
      answer: "Mild discomfort may occur but is usually minimal.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 124,
      question: "Are there side effects?",
      answer: "Temporary redness, swelling, or bruising may occur.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 125,
      question: "How long does the treatment take?",
      answer: "Typically 30–60 minutes depending on the treatment.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 126,
      question: "Who is suitable for this treatment?",
      answer: "Most healthy adults; a consultation confirms suitability.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 127,
      question: "Can this treatment be combined with others?",
      answer: "Yes, many treatments complement each other.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 128,
      question: "Is there downtime?",
      answer: "Most treatments have little to no downtime.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 129,
      question: "Are the results natural?",
      answer: "Yes – treatments are designed to enhance your features.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 130,
      question: "Is the treatment safe?",
      answer: "Yes, when carried out by a qualified professional.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    // Laser Hair Removal - Before & After FAQs
    {
      id: 131,
      question: "What should I avoid before treatment?",
      answer: "Avoid alcohol, caffeine, sunbeds, and blood thinners where possible.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 132,
      question: "Should I stop skincare products before treatment?",
      answer: "Avoid strong actives like retinol or acids 2–3 days before.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 133,
      question: "Can I eat before my appointment?",
      answer: "Yes – a light meal is fine unless instructed otherwise.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 134,
      question: "Do I need to remove makeup?",
      answer: "Yes – arrive with clean skin if possible.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 135,
      question: "What can I expect immediately after treatment?",
      answer: "Mild redness or swelling may occur, which usually fades quickly.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 136,
      question: "Can I wear makeup afterwards?",
      answer: "Wait at least 4–24 hours, depending on the treatment.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 137,
      question: "When can I exercise again?",
      answer: "Avoid heavy exercise for 24–48 hours.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 138,
      question: "Can I go in the sun afterwards?",
      answer: "Avoid sun exposure for 24–48 hours and use SPF daily.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 139,
      question: "Are there any aftercare restrictions?",
      answer: "Avoid heat treatments, facials, and saunas for 1–2 days.",
      category: "Laser Hair Removal",
      isExpanded: false,
    },
    {
      id: 140,
      question: "What if I notice bruising or swelling?",
      answer: "Apply a cold compress and arnica cream; it should resolve in a few days.",
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
