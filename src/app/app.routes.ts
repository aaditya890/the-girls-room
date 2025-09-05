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
   }
];
