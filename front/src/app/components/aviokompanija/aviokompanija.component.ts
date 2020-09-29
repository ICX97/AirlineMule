import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'

import { Aviokompanija } from 'src/app/models/aviokompanija';
import { AviokompanijaService } from 'src/app/services/aviokompanija.service';
import { AviokompanijaDialogComponent } from '../dialog/aviokompanija-dialog/aviokompanija-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-aviokompanija',
  templateUrl: './aviokompanija.component.html',
  styleUrls: ['./aviokompanija.component.css']
})
export class AviokompanijaComponent implements OnInit {

  displayedColumns = ['KompanijaID', 'NazivAK','actions'];
  dataSource: MatTableDataSource<Aviokompanija>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public aviokompanijaService: AviokompanijaService) {
}
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.aviokompanijaService.getAllAviokompanija().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'KompanijaID': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, KompanijaID: number, NazivAK: string) {
    const dialogRef = this.dialog.open(AviokompanijaDialogComponent, { data: { KompanijaID: KompanijaID, NazivAK: NazivAK} });
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
