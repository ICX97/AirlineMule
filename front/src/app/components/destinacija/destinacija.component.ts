import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { Destinacija } from 'src/app/models/destinacija';
import { DestinacijaService } from 'src/app/services/destinacija.service';
import { DestinacijaDialogComponent } from '../dialog/destinacija-dialog/destinacija-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-destinacija',
  templateUrl: './destinacija.component.html',
  styleUrls: ['./destinacija.component.css']
})
export class DestinacijaComponent implements OnInit {

  displayedColumns = ['DestinacijaID', 'NazivAerodroma', 'Grad','actions'];
  dataSource: MatTableDataSource<Destinacija>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public destinacijaService: DestinacijaService) {
}
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.destinacijaService.getAllDestinacija().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
     /*  this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'DestinacijaID': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      }; */
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, DestinacijaID: number, NazivAerodroma: string, Grad: string) {
    const dialogRef = this.dialog.open(DestinacijaDialogComponent, { data: { DestinacijaID: DestinacijaID, NazivAerodroma: NazivAerodroma, Grad: Grad } });
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
