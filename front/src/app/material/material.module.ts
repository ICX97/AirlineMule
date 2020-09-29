import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import{MatDialogModule}from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatPaginatorModule}from '@angular/material/paginator';
import {MatSortModule}from '@angular/material/sort';
import {MatProgressBarModule}from '@angular/material/progress-bar';
import {MatInputModule}from '@angular/material/input';
import {MatCheckboxModule}from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

const MaterialComponents=[
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSnackBarModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule

  
]



@NgModule({
 
  imports: [
   MaterialComponents
  ],
  exports:[
    MaterialComponents

  ]
})
export class MaterialModule { }
