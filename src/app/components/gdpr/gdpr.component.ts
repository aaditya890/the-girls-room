import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gdpr',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gdpr.component.html',
  styleUrl: './gdpr.component.scss'
})
export class GdprComponent {
  emailText:string = 'support@thegirlsroomlondon.com'
}
