import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  emailText = "support@thegirlsroomlondon.com"
  constructor(private viewportScroller: ViewportScroller) { }

  subscribeNewsletter(): void {
    // Newsletter subscription logic
    console.log("Newsletter subscription")
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0])
  }

    whatsappEnquiry(): void {
    const message = encodeURIComponent("Hi")
    const phone = "+447878350664"
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
    window.open(whatsappUrl, "_blank")
  }

}
