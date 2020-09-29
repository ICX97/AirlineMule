import { Component, OnInit, Inject } from '@angular/core';
import { Putnik } from 'src/app/models/putnik';
import { PutnikService } from 'src/app/services/putnik.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-putnik-dialog',
  templateUrl: './putnik-dialog.component.html',
  styleUrls: ['./putnik-dialog.component.css']
})
export class PutnikDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PutnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Putnik,
    public putnikService: PutnikService) { }

  ngOnInit() {
  }
  public add(): void {
    this.data.PutnikID = -1;
    this.putnikService.addPutnik(this.data);
    this.snackBar.open("Uspešno dodat putnik: " + this.data.PutnikID, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.putnikService.updatePutnik(this.data);
    this.snackBar.open("Uspešno modifikovan putnik: " + this.data.PutnikID, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.putnikService.deletePutnik(this.data.PutnikID);
    this.snackBar.open("Uspešno obrisan putnik: " + this.data.PutnikID, "U redu", {
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
