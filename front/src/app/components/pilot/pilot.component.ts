import { Component, OnInit, ViewChild } from '@angular/core';
import { Pilot } from 'src/app/models/pilot';

import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { PilotService } from 'src/app/services/pilot.service';
import { PilotDialogComponent } from '../dialog/pilot-dialog/pilot-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  displayedColumns = ['PilotID', 'ImeP','PrezimeP','JMBGP','KontaktP','AdresaP','mail','action'];
  dataSource: MatTableDataSource<Pilot>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;


  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public pilotService: PilotService) {
}
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.pilotService.getAllPilot().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, PilotID: number, ImeP: string, PrezimeP: string, JMBGP: number, KontaktP: string, AdresaP: string, mail: string) {
    const dialogRef = this.dialog.open(PilotDialogComponent, { data: { PilotID: PilotID, ImeP: ImeP,PrezimeP:PrezimeP,JMBGP:JMBGP,KontaktP:KontaktP,AdresaP:AdresaP,mail:mail} });
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
