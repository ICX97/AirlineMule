
import { Component, OnInit, Inject } from '@angular/core'
import { Klasa } from 'src/app/models/klasa';
import { KlasaService } from 'src/app/services/klasa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-klasa-dialog',
  templateUrl: './klasa-dialog.component.html',
  styleUrls: ['./klasa-dialog.component.css']
})
export class KlasaDialogComponent implements OnInit {

  public flag: number;
  
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KlasaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Klasa,
    public klasaService: KlasaService) { }

  ngOnInit() {
  }
  public add(): void {
    this.data.klasaID = -1;
    this.klasaService.addKlasa(this.data);
    this.snackBar.open("Uspešno dodata liga: " + this.data.klasaID, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.klasaService.updateKlasa(this.data);
    this.snackBar.open("Uspešno modifikovana liga: " + this.data.klasaID, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.klasaService.deleteKlasa(this.data.klasaID);
    this.snackBar.open("Uspešno obrisana liga: " + this.data.klasaID, "U redu", {
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
