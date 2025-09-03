import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contactForm: FormGroup

  // Right-side info (matches the reference text)
  contactEmail = "hi@fashion.com"
  basedIn = "theUkBs"

  // Destination WhatsApp number (change to your target)
  whatsappNumber = "447911123456"

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.minLength(5)]],
    })
  }

  submitToWhatsApp() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }

    const v = this.contactForm.value
    const lines = ["New enquiry — Contact", `Name: ${v.name}`, `Email: ${v.email}`, `Message: ${v.message}`]
    const text = encodeURIComponent(lines.join("\n"))
    const url = `https://wa.me/${this.whatsappNumber}?text=${text}`
    window.open(url, "_blank")
  }
}
