import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "./components/footer/footer.component";
import { NavComponent } from "./components/nav/nav.component";
import { RouterOutlet } from '@angular/router';
import {MatDialog, MatDialogModule,} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FooterComponent, NavComponent,RouterOutlet,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'The Girls Room'; 

  constructor(private MatDialog:MatDialog){} 

  ngOnInit(): void {
    console.log("The Girls Room ! Welcome to our website. We are delighted to have you here and look forward to assisting you on your journey to enhanced beauty and confidence.");
  }

  
}
