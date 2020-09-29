import { Component, OnInit, ViewChild } from '@angular/core';
import { Let } from 'src/app/models/let';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { LetService } from 'src/app/services/let.service';
import { Avion } from 'src/app/models/avion';
import { Destinacija } from 'src/app/models/destinacija';
import { Pilot } from 'src/app/models/pilot';
import { Aviokompanija } from 'src/app/models/aviokompanija';
import { LetDialogComponent } from '../dialog/let-dialog/let-dialog.component';

@Component({
  selector: 'app-let',
  templateUrl: './let.component.html',
  styleUrls: ['./let.component.css']
})
export class LetComponent implements OnInit {
  displayedColumns = ['LetID', 'DatumPolaska', 'VremePolaska', 'Status', 'Terminal', 'SlobodnoBizKlasa','SlobodnoEkoKlasa','AvionID','KompanijaID','DestinacijaID','PilotID','actions'];
  dataSource: MatTableDataSource<Let>;
  selektovanLet: Let;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public letService: LetService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.letService.getAllLet().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      //pretraga po nazivu ugnježdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'DestinacijaID' ? currentTerm + data.DestinacijaID.Grad : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       //sortiranje po nazivu ugnježdenog objekta
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'DestinacijaID': return data.DestinacijaID.Grad.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, LetID: number, DatumPolaska: Date, VremePolaska: string, Status: string, Terminal: string,SlobodnoBizKlasa:number,SlobodnoEkoKlasa:number,AvionID:Avion,KompanijaID:Aviokompanija,DestinacijaID:Destinacija,PilotID:Pilot) {
    const dialogRef = this.dialog.open(LetDialogComponent, { data: { LetID: LetID, DatumPolaska: DatumPolaska, VremePolaska: VremePolaska, Status: Status, Terminal: Terminal,SlobodnoBizKlasa:SlobodnoBizKlasa,SlobodnoEkoKlasa:SlobodnoEkoKlasa,AvionID:AvionID,KompanijaID:KompanijaID,DestinacijaID:DestinacijaID,PilotID:PilotID} });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1){
          this.loadData();
      }

    });
  }

  selectRow(row){
    this.selektovanLet = row;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
