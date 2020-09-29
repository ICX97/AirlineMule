import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { Avion } from 'src/app/models/avion';
import { AvionService } from 'src/app/services/avion.service';
import { AvionDialogComponent } from '../dialog/avion-dialog/avion-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-avion',
  templateUrl: './avion.component.html',
  styleUrls: ['./avion.component.css']
})
export class AvionComponent implements OnInit {

  displayedColumns = ['AvionID', 'Marka', 'Model', 'UkupnoBizKlasa','UkupnoEkoKlasa','actions'];
  dataSource: MatTableDataSource<Avion>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public avionService: AvionService) {
}
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.avionService.getAllAvion().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'AvionID': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, AvionID: number, Marka: string, Model: string, UkupnoBizKlasa: string, UkupnoEkoKlasa: string) {
    const dialogRef = this.dialog.open(AvionDialogComponent, { data: { AvionID: AvionID, Marka: Marka, Model: Model ,UkupnoBizKlasa:UkupnoBizKlasa,UkupnoEkoKlasa:UkupnoEkoKlasa} });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
