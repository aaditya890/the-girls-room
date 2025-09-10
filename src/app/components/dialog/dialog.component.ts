import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(private dialogRef: MatDialogRef<DialogComponent>,private matdialog:MatDialog) {}
  closeDialog(){
   this.matdialog.closeAll()
    // alert()
  }
}
