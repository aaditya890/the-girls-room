import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path:'',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
   },
   {
    path: 'contact',
    loadComponent: () => import('./components/contact-us/contact-us.component').then(c => c.ContactUsComponent)
   },
   {
    path:'about',
    loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent)
   },
   {
    path: 'pricing',
    loadComponent: () => import('./components/pricing/pricing.component').then(c => c.PricingComponent)
   },
   {
    path:'treatment',
    loadComponent: () => import('./components/treatment/treatment.component').then(c => c.TreatmentComponent)
   },
   {
      path: 'privacy-policy',
      loadComponent: () => import('./components/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent)
   },
   {
      path: 'terms-and-conditions',
      loadComponent: () => import('./components/terms-and-conditions/terms-and-conditions.component').then(c => c.TermsAndConditionsComponent)
   },
   {
      path:'gdpr',
      loadComponent: () => import('../app/components/gdpr/gdpr.component').then((m) => m.GdprComponent)
   },
   {
      path:'testimonials',
      loadComponent: () => import('./components/testimonials/testimonials.component').then(c => c.TestimonialsComponent)
   }
];
