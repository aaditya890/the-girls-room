import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Service {
  name: string
  price: string
  duration: string
}

interface ServiceCategory {
  title: string
  services: Service[]
}

@Component({
  selector: "app-pricing",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./pricing.component.html",
  styleUrl: "./pricing.component.scss",
})
export class PricingComponent {
  activeTab = 0;
  heroUrl = 'assets/pricing/hero.jpg';

  importantInfo = [
    "All prices are subject to change.",
    "A patch test is required 24 hours before the first treatment.",
    "Please arrive 10 minutes before your appointment.",
    "Cancellations require 24 hours' notice.",
    "Deposits are non-refundable.",
  ]

  serviceCategories: ServiceCategory[] = [
    {
      title: "Waxing Services",
      services: [
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
        { name: "Ladies' Waxing - Hollywood (Hot Wax)", price: "£35.00", duration: "60" },
        { name: "Ladies' Waxing - Brazilian (Hot Wax)", price: "£30.00", duration: "50 min" },
        { name: "Ladies' Waxing - Bikini (Hot Wax)", price: "£10.00", duration: "10" },
        { name: "Ladies' Waxing - Extended Bikini (G-String) (Hot Wax)", price: "£15.00", duration: "15" },
        { name: "Ladies' Waxing - Leg Half", price: "£15.00", duration: "20" },
        { name: "Ladies' Waxing - Leg Full", price: "£20.00", duration: "40" },
        { name: "Ladies' Waxing - Half Arm", price: "£8.00", duration: "15" },
        { name: "Ladies' Waxing - Full Arm", price: "£16.00", duration: "20" },
        { name: "Ladies' Waxing - Full Body", price: "£120.00", duration: "120" },
        { name: "Ladies' Waxing - Buttocks", price: "£10.00", duration: "20" },
        { name: "Ladies' Waxing - Underarm", price: "£7.00", duration: "15" },
        { name: "Ladies' Waxing - Face Upper Lip", price: "£5.00", duration: "10" },
        { name: "Ladies' Waxing - Face Lower Lip", price: "£5.00", duration: "10" },
        { name: "Ladies' Waxing - Face Chin", price: "£7.00", duration: "10" },
        { name: "Ladies' Waxing - Face Sides", price: "£7.00", duration: "10" },
        { name: "Ladies' Waxing - Face Neck", price: "£8.00", duration: "10" },
        { name: "Ladies' Waxing - Face Eyebrows", price: "£10.00", duration: "10" },
        { name: "Ladies' Waxing - Face Lip & Chin", price: "£12.00", duration: "15" },
        { name: "Ladies' Waxing - Full Face", price: "£20.00", duration: "30" },
        { name: "Ladies' Waxing - Upper Body - Chest", price: "£10.00", duration: "30" },
        { name: "Ladies' Waxing - Upper Body - Stomach", price: "£10.00", duration: "30" },
        { name: "Ladies' Waxing - Upper Body - Back", price: "£15.00", duration: "35" },
      ],
    },
    {
      title: "Face and Neck Treatments",
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
      title: "Upper Body Treatments",
      services: [
        { name: "Underarms", price: "£10", duration: "10" },
        { name: "Half Arms", price: "£65", duration: "10" },
        { name: "Full Arms", price: "£99", duration: "15" },
        { name: "1/4 Arms", price: "£50", duration: "10" },
      ],
    },
    {
      title: "HydraFacial Treatments",
      services: [
        { name: "Platinum HydraFacial (LED + booster + lymph)", price: "£200", duration: "60 min" },
        { name: "Express HydraFacial (quick cleanse & hydrate)", price: "£90", duration: "30 min" },
        { name: "Glass Botox HydraFacial", price: "£250", duration: "60 min" },
        { name: "Face + Neck", price: "£230", duration: "60 min" },
        { name: "Face + Neck + Décolletage", price: "£300", duration: "75 min" },
        { name: "Lip Perk / Eye Perk (Add-On)", price: "£35", duration: "15 min" },
        { name: "LED Light Therapy (Add-On)", price: "£35", duration: "25 min" },
        { name: "Lymphatic Drainage (Add-On)", price: "£30", duration: "15 min" },
      ],
    },
    {
      title: "Injectable Treatments",
      services: [
        { name: "Fat Dissolving Injections - Chin", price: "£60", duration: "30 min" },
        { name: "Fat Dissolving Injections - Face", price: "£80", duration: "30 min" },
        { name: "Fat Dissolving Injections - Bra area", price: "£70", duration: "45 min" },
        { name: "Fat Dissolving Injections - Inner thighs", price: "£80", duration: "45 min" },
        { name: "Fat Dissolving Injections - Stomach and bra area", price: "£110", duration: "60 min" },
        { name: "Fat Dissolving Injections - Under arms", price: "£90", duration: "30 min" },
        { name: "Fat Dissolving Injections - Thighs/sides", price: "£100", duration: "30 min" },
        { name: "Fat Dissolving Injections - Stomach area top and bottom", price: "£150", duration: "45 min" },
        { name: "Anti-Wrinkle Injections - Bunny lines", price: "£100", duration: "20 min" },
        { name: "Anti-Wrinkle Injections - Eye brow lift", price: "£100", duration: "20 min" },
        { name: "Anti-Wrinkle Injections - Lip Flip", price: "£90", duration: "20 min" },
        { name: "Anti-Wrinkle Injections - Smokers lines", price: "£120", duration: "20 min" },
        { name: "Anti-Wrinkle Injections - Two areas", price: "£180", duration: "30 min" },
        { name: "Anti-Wrinkle Injections - Three areas", price: "£210", duration: "30 min" },
        { name: "Anti-Wrinkle Injections - Jawline slimmer", price: "£250", duration: "40 min each" },
        { name: "Anti-Wrinkle Injections - Neck lift", price: "£200", duration: "41 min each" },
        { name: "Anti-Wrinkle Injections - Arm pits", price: "£200", duration: "42 min each" },
        { name: "Vitamin Injections - B12 injections", price: "£30", duration: "30 min" },
        { name: "Vitamin Injections - B-complex inject", price: "£45", duration: "30 min" },
      ],
    },
    {
      title: "Additional Services",
      services: [
        { name: "Dermaplaning", price: "£50.00", duration: "30 mins - 45 mins" },
        { name: "Facial - Micro-Needling", price: "£80.00", duration: "20 mins 40 mins" },
        { name: "Girls glow", price: "£50.00", duration: "45 mins 1 hr 20 mins" },
        { name: "Semi-Permanent Makeup - Hydra Gloss Lip", price: "£80", duration: "30 mins" },
      ],
    },
  ]

  packages = [
    { name: "Course of 3", discount: "10% off" },
    { name: "Course of 6", discount: "15% off" },
  ]

  setActiveTab(index: number): void {
    this.activeTab = index
  }
}
