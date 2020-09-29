import { Component, OnInit, Inject } from '@angular/core';
import { Avion } from 'src/app/models/avion';
import { Destinacija } from 'src/app/models/destinacija';
import { Aviokompanija } from 'src/app/models/aviokompanija';
import { Pilot } from 'src/app/models/Pilot';
import { Let } from 'src/app/models/let';
import { LetService } from 'src/app/services/let.service';
import { AvionService } from 'src/app/services/avion.service';
import { DestinacijaService } from 'src/app/services/destinacija.service';
import { AviokompanijaService } from 'src/app/services/aviokompanija.service';
import { PilotService } from 'src/app/services/pilot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LetDTO } from '../../../DTO/letDTO';

@Component({
  selector: 'app-let-dialog',
  templateUrl: './let-dialog.component.html',
  styleUrls: ['./let-dialog.component.css']
})
export class LetDialogComponent implements OnInit {

  avion: Avion[];
  destinacija: Destinacija[];
  aviokompanija: Aviokompanija[];
  pilot: Pilot[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<LetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Let,
              public letService: LetService,
              public avionService: AvionService,
              public aviokompanijaService: AviokompanijaService,
              public pilotService: PilotService,
              public destinacijaService: DestinacijaService) { }

  ngOnInit() {
    this.avionService.getAllAvion().subscribe(avioni => 
      this.avion = avioni);
    this.aviokompanijaService.getAllAviokompanija().subscribe(aviokompanije => 
      this.aviokompanija = aviokompanije);
    this.destinacijaService.getAllDestinacija().subscribe(destinacije => 
      this.destinacija = destinacije);
    this.pilotService.getAllPilot().subscribe(piloti => 
      this.pilot = piloti);
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  onChange(avion,aviokompanija,pilot,destinacija) {
    this.data.AvionID = avion;
    this.data.KompanijaID = aviokompanija;
    this.data.PilotID = pilot;
    this.data.DestinacijaID = destinacija;
  }

  public add(): void {
    this.data.LetID = -1;
    this.letService.addLet(this.convert(this.data));
    this.snackBar.open("Uspešno dodat tim", "U redu", {
      duration: 2500
    });
  }

  public update(): void {
    this.letService.updateLet(this.convert(this.data));
    this.snackBar.open("Uspešno modifikovan tim", "U redu", {
      duration: 2500
    });
  }

  public delete(): void {
    this.letService.deleteLet(this.data.LetID);
    this.snackBar.open("Uspešno obrisan tim", "U redu", {
      duration: 2500
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000
    });
  }  

  public convert(lt:any):LetDTO{
    var leict=new LetDTO();
    leict.LetID=lt.LetID;
    leict.DatumPolaska=lt.DatumPolaska;
    leict.VremePolaska=lt.VremePolaska;
    leict.Status=lt.Status;
    leict.Terminal=lt.Terminal;
    leict.SlobodnoEkoKlasa=lt.SlobodnoEkoKlasa;
    leict.SlobodnoBizKlasa=lt.SlobodnoBizKlasa;
    leict.AvionID=lt.AvionID.AvionID;
    leict.KompanijaID=lt.KompanijaID.KompanijaID;
    leict.DestinacijaID=lt.DestinacijaID.DestinacijaID;
    leict.PilotID=lt.PilotID.PilotID;
    return leict;
  }
}
