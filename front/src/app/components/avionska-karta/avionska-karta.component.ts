import { Component, OnInit, ViewChild } from '@angular/core';
import { AvionskaKarta } from 'src/app/models/avionskakarta';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { AvionskaKartaService } from 'src/app/services/avionska-karta.service';
import { Let } from 'src/app/models/let';
import { Putnik } from 'src/app/models/putnik';
import { Klasa } from 'src/app/models/klasa';
import { AvionskaKartaDialogComponent } from '../dialog/avionska-karta-dialog/avionska-karta-dialog.component';

@Component({
  selector: 'app-avionska-karta',
  templateUrl: './avionska-karta.component.html',
  styleUrls: ['./avionska-karta.component.css']
})
export class AvionskaKartaComponent implements OnInit {

  displayedColumns = ['AvionskaKartaID', 'CenaKarte', 'DatumKupovine', 'CheckIn', 'BrojSedista', 'LetID','KlasaID','PutnikID','actions'];
  dataSource: MatTableDataSource<AvionskaKarta>;
  selektovanAvionskaKarta: AvionskaKarta;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public avionskaKartaService: AvionskaKartaService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.avionskaKartaService.getAllAvionskaKarta().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)

      //pretraga po nazivu ugnježdenog objekta
     /*  this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'LetID' ? currentTerm + data.LetID.Status : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       //sortiranje po nazivu ugnježdenog objekta
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'LetID': return data.LetID.Status.toLocaleLowerCase();
          default: return data[property];
        }
      }; */

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, AvionskaKartaID: number, CenaKarte: number, DatumKupovine, CheckIn: string, BrojSedista,LetID,KlasaID,PutnikID) {
    const dialogRef = this.dialog.open(AvionskaKartaDialogComponent, { data: { AvionskaKartaID: AvionskaKartaID, CenaKarte: CenaKarte, DatumKupovne: DatumKupovine, CheckIn: CheckIn, BrojSedista: BrojSedista,LetID:LetID,KlasaID:KlasaID,PutnikID:PutnikID} });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1){
          this.loadData();
      }

    });
  }

  selectRow(row){
    this.selektovanAvionskaKarta = row;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
