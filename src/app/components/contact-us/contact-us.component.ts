import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: "app-contact-us",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"], // Added SCSS file reference
})
export class ContactUsComponent {
  contactEmail = "support@thegirlsroomlondon.com"
  basedIn = "East London Anti-wrinkle and Dermal filler, lemon bottle "
  phone = "+44 7878 350 664"
  whatsappNumber = "447878350664" // WA: country code + number, no +
  para = "For any inquiries or assistance, reach us at the Girl's Room dedicated customer support. Email us using the form below, or call us directly."


  copiedEmail = false
  copiedPhone = false

  isSubmitting = false

  submitSuccess = false

  contactForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    subject: ["", [Validators.required, Validators.minLength(3)]],
    message: ["", [Validators.required, Validators.minLength(10)]],
  })

  constructor(private fb: FormBuilder) { }

  async submitToWhatsApp() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }

    this.isSubmitting = true

    const { name, email, subject, message } = this.contactForm.value
    const text =
      `New enquiry via website:%0A` +
      `Name: ${name}%0A` +
      `Email: ${email}%0A` +
      `Subject: ${subject}%0A` +
      `Message:%0A${message}`
    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`

    setTimeout(() => {
      window.open(url, "_blank")
      this.isSubmitting = false
      this.submitSuccess = true
      this.contactForm.reset()

      // Reset success state after 3 seconds
      setTimeout(() => {
        this.submitSuccess = false
      }, 3000)
    }, 500)
  }

  telHref() {
    const digits = this.phone.replace(/[^\d+]/g, "")
    return `tel:${digits}`
  }

  mailHref() {
    return `mailto:${this.contactEmail}`
  }

  async copy(text: string, type: "email" | "phone") {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "email") {
        this.copiedEmail = true
        setTimeout(() => (this.copiedEmail = false), 1500)
      } else {
        this.copiedPhone = true
        setTimeout(() => (this.copiedPhone = false), 1500)
      }
    } catch { }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName)
    if (field?.errors && field.touched) {
      if (field.errors["required"]) return `${fieldName} is required`
      if (field.errors["email"]) return "Please enter a valid email"
      if (field.errors["minlength"]) return `${fieldName} is too short`
    }
    return ""
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName)
    return !!(field?.errors && field.touched)
  }
}
