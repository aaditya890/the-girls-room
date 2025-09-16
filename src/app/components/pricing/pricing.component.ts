import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ContactUsComponent } from "../contact-us/contact-us.component";

interface Service {
  name: string
  price: string
  duration: string
}

interface ServiceCategory {
  title: string
  services: Service[]
  icon?: string
}

interface PackageCategory {
  category: string
  packages: Package[]
}

interface Package {
  name: string
  price: string
  duration: string
}

@Component({
  selector: "app-pricing",
  standalone: true,
  imports: [CommonModule, ContactUsComponent],
  templateUrl: "./pricing.component.html",
  styleUrls: [], // Remove SCSS file reference
})
export class PricingComponent {
  activeCategory = -1 // Start with "All" selected
  expandedServices: { [key: string]: boolean } = {}

   serviceCategories: ServiceCategory[] = [
    {
      title: "Cosmetic Injectables",
      icon: "assets/Logo/pricing-page-icons/cosmetic-injectables-treatments.webp",
      services: [
        { name: "Fat Dissolving Injections", price: "£60.00", duration: "30-45 mins" },
        { name: "Anti-Wrinkle Injections", price: "£100.00", duration: "20-40 mins" },
        { name: "Dermal Fillers", price: "£90.00", duration: "45 mins - 1 hr 20 mins" },
        { name: "Vitamin Injections", price: "£30.00", duration: "30 mins" },
      ],
    },
    {
      title: "Fat Dissolving Injections",
      icon: "assets/Logo/pricing-page-icons/fat-dissolving.webp",
      services: [
        { name: "Chin", price: "£60", duration: "30 min" },
        { name: "Face", price: "£80", duration: "30 min" },
        { name: "Bra area", price: "£70", duration: "45 min" },
        { name: "Inner thighs", price: "£80", duration: "45 min" },
        { name: "Stomach and bra area", price: "£110", duration: "60 min" },
        { name: "Under arms", price: "£90", duration: "30 min" },
        { name: "Thighs/sides", price: "£100", duration: "30 min" },
        { name: "Stomach area top and bottom", price: "£150", duration: "45 min" },
      ],
    },
    {
      title: "Dermal Fillers",
      icon: "assets/Logo/pricing-page-icons/derma-fillers.webp",
      services: [
        { name: "Lip Filler 0.5ml", price: "£90", duration: "45 min" },
        { name: "Lip Filler 1ml", price: "£180", duration: "45 min" },
        { name: "Chin Filler 1ml", price: "£150", duration: "45 min" },
        { name: "Nasolabial Folds 1ml", price: "£150", duration: "45 min" },
        { name: "Smile Lines 1ml", price: "£150", duration: "45 min" },
        { name: "Tear Trough Filler", price: "£200", duration: "45 min" },
        { name: "Cheek Enhancement Filler", price: "£250", duration: "45 min" },
        { name: "Jaw Sculpting Filler", price: "£350", duration: "45 min" },
        { name: "Lips and Cheeks", price: "£450", duration: "55 min" },
        { name: "Jaw, Cheeks and Chin", price: "£750", duration: "1 Hour" },
        { name: "Lips, jaw, Cheeks and Chin", price: "£950", duration: "1 Hour" },
      ],
    },
    {
      title: "Facials",
      icon: "assets/Logo/pricing-page-icons/facials.webp",
      services: [
        { name: "Dermaplaning", price: "£50.00", duration: "120 min" },
        { name: "Facial - Micro-Needling", price: "£80.00", duration: "30-40 mins" },
        { name: "Girls glow", price: "£50.00", duration: "30 mins" },
        { name: "Semi-Permanent Makeup - Hydra Gloss Lip", price: "£80", duration: "120 min" },
      ],
    },
    {
      title: "Laser Hair Removal - Face & Neck",
      icon: "assets/Logo/pricing-page-icons/face-neck-laser-removal.webp",
      services: [
        { name: "Full Face", price: "£65", duration: "15 min" },
        { name: "Lip and Chin", price: "£45", duration: "10 min" },
        { name: "Half Face", price: "£45", duration: "10 min" },
        { name: "Lip", price: "£30", duration: "10 min" },
        { name: "Face and Neck", price: "£90", duration: "15 min" },
        { name: "Chin", price: "£30", duration: "10 min" },
        { name: "Neck (front or back)", price: "£50", duration: "10 min" },
        { name: "Beard Sculpting", price: "£80", duration: "10 min" },
        { name: "Ears", price: "£30", duration: "5 min" },
        { name: "Eyebrows", price: "£10", duration: "5 min" },
        { name: "Nose", price: "£30", duration: "5 min" },
        { name: "Jawline", price: "£40", duration: "10 min" },
        { name: "Sideburns", price: "£40", duration: "10 min" },
      ],
    },
    {
      title: "Laser Hair Removal - Body",
      icon: "assets/Logo/pricing-page-icons/body-laser-hair-removal.webp",
      services: [
        { name: "Underarms", price: "£10", duration: "10 min" },
        { name: "Half Arms", price: "£65", duration: "10 min" },
        { name: "Full Arms", price: "£99", duration: "15 min" },
        { name: "1/4 Arms", price: "£50", duration: "10 min" },
        { name: "Female Brazilian and Underarms", price: "£50", duration: "10 min" },
        { name: "Female Full Leg, Brazilian, and Underarms", price: "£165", duration: "30 min" },
        { name: "Female Hollywood Brazilian", price: "£55", duration: "10 min" },
        { name: "Female Hollywood Brazilian and Underarms", price: "£65", duration: "10 min" },
        { name: "Full Legs", price: "£110", duration: "20 min" },
        { name: "Female Brazilian", price: "£45", duration: "10 min" },
        { name: "Half Leg (Female)", price: "£99", duration: "15 min" },
        { name: "Half Leg (Male)", price: "£60", duration: "15 min" },
        { name: "Female Bikini", price: "£40", duration: "10 min" },
        { name: "Behind (peri-anal)", price: "£35", duration: "5 min" },
        { name: "Fingers and Toes", price: "£20", duration: "5 min" },
        { name: "Buttocks", price: "£40", duration: "10 min" },
        { name: "1/4 Leg", price: "£75", duration: "10 min" },
        { name: "Male Brazilian", price: "£50", duration: "10 min" },
        { name: "Female Full Body", price: "£320", duration: "80 min" },
        { name: "Male Full Body", price: "£320", duration: "80 min" },
        { name: "Female Full body excluding back & shoulders", price: "£260", duration: "60 min" },
      ],
    },
    {
      title: "Waxing Services",
      icon: "assets/Logo/pricing-page-icons/body-wax.webp",
      services: [
        { name: "Ladies' Waxing - Hollywood (Hot Wax)", price: "£35.00", duration: "60 min" },
        { name: "Ladies' Waxing - Brazilian (Hot Wax)", price: "£30.00", duration: "50 min" },
        { name: "Ladies' Waxing - Bikini (Hot Wax)", price: "£10.00", duration: "10 min" },
        { name: "Ladies' Waxing - Extended Bikini (G-String) (Hot Wax)", price: "£15.00", duration: "15 min" },
        { name: "Ladies' Waxing - Leg Half", price: "£15.00", duration: "20 min" },
        { name: "Ladies' Waxing - Leg Full", price: "£20.00", duration: "40 min" },
        { name: "Ladies' Waxing - Half Arm", price: "£8.00", duration: "15 min" },
        { name: "Ladies' Waxing - Full Arm", price: "£16.00", duration: "20 min" },
        { name: "Ladies' Waxing - Full Body", price: "£120.00", duration: "120 min" },
        { name: "Ladies' Waxing - Buttocks", price: "£10.00", duration: "20 min" },
        { name: "Ladies' Waxing - Underarm", price: "£7.00", duration: "15 min" },
        { name: "Ladies' Waxing - Face Upper Lip", price: "£5.00", duration: "10 min" },
        { name: "Ladies' Waxing - Face Lower Lip", price: "£5.00", duration: "10 min" },
        { name: "Ladies' Waxing - Face Chin", price: "£7.00", duration: "10 min" },
        { name: "Ladies' Waxing - Face Sides", price: "£7.00", duration: "10 min" },
        { name: "Ladies' Waxing - Face Neck", price: "£8.00", duration: "10 min" },
        { name: "Ladies' Waxing - Face Eyebrows", price: "£10.00", duration: "10 min" },
        { name: "Ladies' Waxing - Face Lip & Chin", price: "£12.00", duration: "15 min" },
        { name: "Ladies' Waxing - Full Face", price: "£20.00", duration: "30 min" },
        { name: "Ladies' Waxing - Upper Body - Chest", price: "£10.00", duration: "30 min" },
        { name: "Ladies' Waxing - Upper Body - Stomach", price: "£10.00", duration: "30 min" },
        { name: "Ladies' Waxing - Upper Body - Back", price: "£15.00", duration: "35 min" },
      ],
    },
  ]

  laserPackages: PackageCategory[] = [
    {
      category: "Face Packages",
      packages: [
        { name: "Smooth & Fresh (3 Areas)", price: "£75", duration: "25 min" },
        { name: "Full Face Glow (Face + Neck)", price: "£150", duration: "30 min" },
        { name: "Beard Perfection (Beard, Jawline, Neck)", price: "£140", duration: "30 min" },
      ],
    },
    {
      category: "Upper Body Packages",
      packages: [
        { name: "Arm Elegance (Full Arms + Underarms)", price: "£110", duration: "25 min" },
        { name: "Underarm & Bikini Duo", price: "£60", duration: "20 min" },
      ],
    },
    {
      category: "Lower Body Packages",
      packages: [
        { name: "Hollywood & Smooth Legs (Hollywood + Legs + Underarms)", price: "£220", duration: "45 min" },
        { name: "Brazilian Bliss (Brazilian + Bikini + Peri-anal + Buttocks)", price: "£120", duration: "40 min" },
        { name: "Leg Perfection (Full Legs + Toes + 1/4 Arm)", price: "£180", duration: "40 min" },
      ],
    },
    {
      category: "Full Body Packages",
      packages: [
        { name: "Female Full Body (6 Sessions)", price: "£1,650", duration: "" },
        { name: "Male Full Body (6 Sessions)", price: "£1,650", duration: "" },
        { name: "Mini Full Body (Excl. back & shoulders, 6 Sessions)", price: "£1,350", duration: "" },
      ],
    },
  ]

  courseDeals: any[] = [
    { name: "Buy 6 sessions", discount: "15% OFF" },
    { name: "Buy 8 sessions", discount: "1 FREE" },
  ]

  importantInfo = [
    "All prices are subject to change.",
    "A patch test is required 24 hours before the first treatment.",
    "Please arrive 10 minutes before your appointment.",
    "Cancellations require 24 hours' notice.",
    "Deposits are non-refundable.",
  ]

  setActiveCategory(index: number): void {
    this.activeCategory = index
  }

  toggleServiceExpansion(categoryTitle: string): void {
    this.expandedServices[categoryTitle] = !this.expandedServices[categoryTitle]
  }

  isServiceExpanded(categoryTitle: string): boolean {
    return this.expandedServices[categoryTitle] || false
  }

  getMinPrice(services: Service[]): string {
    const prices = services.map((s) => Number.parseFloat(s.price.replace("£", "")))
    return `£${Math.min(...prices)}`
  }

  getShortTitle(title: string): string {
    const shortTitles: { [key: string]: string } = {
      "HydraFacial Treatments": "HydraFacial",
      "Face and Neck Treatments": "Face & Neck",
      "Upper Body Treatments": "Upper Body",
      "Laser hair removal": "Laser Hair Removal",
      "Body Wax": "Body Wax",
      "Cosmetic Injectables & Treatments": "Injectables",
      "Dermal Fillers": "Fillers",
      Facials: "Facials",
    }
    return shortTitles[title] || title
  }

  get totalServices(): number {
    return this.serviceCategories ? this.serviceCategories.reduce((sum, cat) => sum + cat.services.length, 0) : 0
  }
}
