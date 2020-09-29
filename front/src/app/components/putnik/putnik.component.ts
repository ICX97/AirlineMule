import { Component, OnInit, ViewChild } from '@angular/core';
import { Putnik } from 'src/app/models/putnik';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { PutnikService } from 'src/app/services/putnik.service';
import { PutnikDialogComponent } from '../dialog/putnik-dialog/putnik-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-putnik',
  templateUrl: './putnik.component.html',
  styleUrls: ['./putnik.component.css']
})
export class PutnikComponent implements OnInit {
  displayedColumns = ['PutnikID', 'ImePut','PrezimePut','JMBGPut','BrojPasosa','KontaktPut','AdresaPut','mailPut','actions'];
  dataSource: MatTableDataSource<Putnik>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public putnikService: PutnikService) {
}
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.putnikService.getAllPutnik().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'PutnikID': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, PutnikID: number, ImePut: string, PrezimePut: string, JMBGPut: number, BrojPasosa:string, KontaktPut: string, AdresaPut: string, mailPut: string) {
    const dialogRef = this.dialog.open(PutnikDialogComponent, { data: { PutnikID: PutnikID, ImePut: ImePut,PrezimePut:PrezimePut,JMBGPut:JMBGPut,BrojPasosa:BrojPasosa,KontaktPut:KontaktPut,AdresaPut:AdresaPut,mailPut:mailPut} });
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
