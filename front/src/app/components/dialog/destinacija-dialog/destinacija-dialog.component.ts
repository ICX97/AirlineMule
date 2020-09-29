
import { Component, OnInit, Inject } from '@angular/core';
import { Destinacija } from 'src/app/models/destinacija';
import { DestinacijaService } from 'src/app/services/destinacija.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-destinacija-dialog',
  templateUrl: './destinacija-dialog.component.html',
  styleUrls: ['./destinacija-dialog.component.css']
})
export class DestinacijaDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DestinacijaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Destinacija,
    public destinacijaService: DestinacijaService) { }

  ngOnInit() {
  }
  public add(): void {
    this.data.DestinacijaID = -1;
    this.destinacijaService.addDestinacija(this.data);
    this.snackBar.open("Uspešno dodata liga: " + this.data.DestinacijaID, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.destinacijaService.updateDestinacija(this.data);
    this.snackBar.open("Uspešno modifikovana liga: " + this.data.DestinacijaID, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.destinacijaService.deleteDestinacija(this.data.DestinacijaID);
    this.snackBar.open("Uspešno obrisana liga: " + this.data.DestinacijaID, "U redu", {
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
