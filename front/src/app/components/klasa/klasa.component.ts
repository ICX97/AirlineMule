import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { Klasa } from 'src/app/models/klasa';
import { KlasaService } from 'src/app/services/klasa.service';
import { KlasaDialogComponent } from '../dialog/klasa-dialog/klasa-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-klasa',
  templateUrl: './klasa.component.html',
  styleUrls: ['./klasa.component.css']
})
export class KlasaComponent implements OnInit {
  displayedColumns = ['klasaID', 'TipKlase','actions'];
  dataSource: MatTableDataSource<Klasa>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public klasaService: KlasaService) {
}
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.klasaService.getAllKlasa().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'klasaID': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, klasaID: number, TipKlase: string) {
    const dialogRef = this.dialog.open(KlasaDialogComponent, { data: { klasaID: klasaID, TipKlase: TipKlase} });
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
