import { Component, OnInit, Inject } from '@angular/core';

import { Avion } from 'src/app/models/avion';
import { AvionService } from 'src/app/services/avion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-avion-dialog',
  templateUrl: './avion-dialog.component.html',
  styleUrls: ['./avion-dialog.component.css']
})
export class AvionDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AvionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Avion,
    public avionService: AvionService) { }

  ngOnInit() {
  }
  public add(): void {
    this.data.AvionID = -1;
    this.avionService.addAvion(this.data);
    this.snackBar.open("Uspešno dodata liga: " + this.data.AvionID, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.avionService.updateAvion(this.data);
    this.snackBar.open("Uspešno modifikovana liga: " + this.data.AvionID, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.avionService.deleteAvion(this.data.AvionID);
    this.snackBar.open("Uspešno obrisana liga: " + this.data.AvionID, "U redu", {
      duration: 2000,
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
}
