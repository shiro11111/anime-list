import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anime-crud';

  constructor(private dialog: MatDialog) {
  }

  public ngOnInit(): void {

  }

  onAdd(): void {
    let dialogRef = this.dialog.open(FormComponent);

    dialogRef.afterClosed().subscribe(() => {
      dialogRef = null;
    });
  }

}
