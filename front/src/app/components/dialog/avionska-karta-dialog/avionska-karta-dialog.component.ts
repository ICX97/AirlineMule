import { Component, OnInit, Inject } from '@angular/core';
import { Putnik } from 'src/app/models/putnik';
import { Klasa } from 'src/app/models/klasa';
import { Let } from 'src/app/models/let';
import { AvionskaKarta } from 'src/app/models/avionskakarta';
import { AvionskaKartaService } from 'src/app/services/avionska-karta.service';
import { PutnikService } from 'src/app/services/putnik.service';
import { KlasaService } from 'src/app/services/klasa.service';
import { LetService } from 'src/app/services/let.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvionskaKartaDTO } from '../../../DTO/avionskakartaDTO';

@Component({
  selector: 'app-avionska-karta-dialog',
  templateUrl: './avionska-karta-dialog.component.html',
  styleUrls: ['./avionska-karta-dialog.component.css']
})
export class AvionskaKartaDialogComponent implements OnInit {

  putnik: Putnik[];
  klasa: Klasa[];
  let: Let[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AvionskaKartaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AvionskaKarta,
              public letService: LetService,
              public avionskakartaService: AvionskaKartaService,
              public klasaService: KlasaService,
              public putnikService: PutnikService) { }

  ngOnInit() {
    console.log(this.data)
    this.putnikService.getAllPutnik().subscribe(putnici => 
      this.putnik = putnici);
    this.klasaService.getAllKlasa().subscribe(klase => 
      this.klasa = klase);
    this.letService.getAllLet().subscribe(letovi => 
      this.let = letovi);
  }
  compareTo(a, b) {
    return a.id == b.id;
  }
  onChange(putnik,klasa,lett) {
    this.data.PutnikID = putnik;
    this.data.LetID = lett;
    this.data.KlasaID = klasa;
  }

  public add(): void {
    this.data.AvionskaKartaID = -1;
    console.log(this.data);
    this.avionskakartaService.addAvionskaKarta(this.convert(this.data));
    this.snackBar.open("Uspešno dodat tim", "U redu", {
      duration: 2500
    });
  }

  public update(): void {
    this.avionskakartaService.updateAvionskaKarta(this.convert(this.data));
    this.snackBar.open("Uspešno modifikovan tim", "U redu", {
      duration: 2500
    });
  }

  public delete(): void {
    this.avionskakartaService.deleteAvionskaKarta(this.data.AvionskaKartaID);
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

  public convert(avionsk:any):AvionskaKartaDTO{
    var avionskaKartaDTO= new AvionskaKartaDTO();
    avionskaKartaDTO.AvionskaKartaID=avionsk.AvionskaKartaID;
    avionskaKartaDTO.CenaKarte=avionsk.CenaKarte;
    avionskaKartaDTO.DatumKupovine=avionsk.DatumKupovine;
    avionskaKartaDTO.CheckIn=true;
    avionskaKartaDTO.BrojSedista=avionsk.BrojSedista;

    avionskaKartaDTO.LetID=avionsk.LetID;
    avionskaKartaDTO.KlasaID=avionsk.KlasaID;
    avionskaKartaDTO.PutnikID=avionsk.PutnikID;
    console.log(avionskaKartaDTO);
    return avionskaKartaDTO;
  }
}
