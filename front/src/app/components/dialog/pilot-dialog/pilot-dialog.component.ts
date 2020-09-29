import { Component, OnInit, Inject } from '@angular/core';
import { Pilot } from 'src/app/models/pilot';
import { PilotService } from 'src/app/services/pilot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-pilot-dialog',
  templateUrl: './pilot-dialog.component.html',
  styleUrls: ['./pilot-dialog.component.css']
})
export class PilotDialogComponent implements OnInit {

  public flag: number;
  
  constructor(public snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<PilotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pilot,
    public pilotService: PilotService) { }

  ngOnInit() {
  }
  public add(): void {
    this.data.PilotID = -1;
    this.pilotService.addPilot(this.data);
    this.snackBar.open("Uspešno dodata pilota: " + this.data.PilotID, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.pilotService.updatePilot(this.data);
    this.snackBar.open("Uspešno modifikovana pilot: " + this.data.PilotID, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.pilotService.deletePilot(this.data.PilotID);
    this.snackBar.open("Uspešno obrisana pilot: " + this.data.PilotID, "U redu", {
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
