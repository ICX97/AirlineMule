import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Aviokompanija } from 'src/app/models/aviokompanija';
import { AviokompanijaService } from 'src/app/services/aviokompanija.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-aviokompanija-dialog',
  templateUrl: './aviokompanija-dialog.component.html',
  styleUrls: ['./aviokompanija-dialog.component.css']
})
export class AviokompanijaDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AviokompanijaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Aviokompanija,
    public aviokompanijaService: AviokompanijaService) { }

  ngOnInit() {
  }
  public add(): void {
    this.data.KompanijaID = -1;
    this.aviokompanijaService.addAviokompanija(this.data);
    this.snackBar.open("Uspešno dodata aviokompanija: " + this.data.KompanijaID, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.aviokompanijaService.updateAviokompanija(this.data);
    this.snackBar.open("Uspešno modifikovana aviokompanija: " + this.data.KompanijaID, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.aviokompanijaService.deleteAviokompanija(this.data.KompanijaID);
    this.snackBar.open("Uspešno obrisana aviokompanija: " + this.data.KompanijaID, "U redu", {
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
