import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import {MaterialModule} from './material/material.module'

import { PilotComponent } from './components/pilot/pilot.component';
import { PutnikComponent } from './components/putnik/putnik.component';
import { AvionComponent } from './components/avion/avion.component';
import { AviokompanijaComponent } from './components/aviokompanija/aviokompanija.component';
import { AvionskaKartaComponent } from './components/avionska-karta/avionska-karta.component';
import { DestinacijaComponent } from './components/destinacija/destinacija.component';
import { KlasaComponent } from './components/klasa/klasa.component';
import { LetComponent } from './components/let/let.component';

import { PilotService } from './services/pilot.service';
import { PutnikService } from './services/putnik.service';
import { AviokompanijaService } from './services/aviokompanija.service';
import { AvionService } from './services/avion.service';
import { AvionskaKartaService } from './services/avionska-karta.service';
import { DestinacijaService } from './services/destinacija.service';
import { KlasaService } from './services/klasa.service';
import { LetService } from './services/let.service';
import { PilotDialogComponent } from './components/dialog/pilot-dialog/pilot-dialog.component';
import { AviokompanijaDialogComponent } from './components/dialog/aviokompanija-dialog/aviokompanija-dialog.component';
import { DestinacijaDialogComponent } from './components/dialog/destinacija-dialog/destinacija-dialog.component';
import { AvionDialogComponent } from './components/dialog/avion-dialog/avion-dialog.component';
import { LetDialogComponent } from './components/dialog/let-dialog/let-dialog.component';
import { KlasaDialogComponent } from './components/dialog/klasa-dialog/klasa-dialog.component';
import { AvionskaKartaDialogComponent } from './components/dialog/avionska-karta-dialog/avionska-karta-dialog.component';
import { PutnikDialogComponent } from './components/dialog/putnik-dialog/putnik-dialog.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PilotComponent,
    PutnikComponent,
    AvionComponent,
    AviokompanijaComponent,
    AvionskaKartaComponent,
    DestinacijaComponent,
    KlasaComponent,
    LetComponent,
    PilotDialogComponent,
    AviokompanijaDialogComponent,
    DestinacijaDialogComponent,
    AvionDialogComponent,
    LetDialogComponent,
    KlasaDialogComponent,
    AvionskaKartaDialogComponent,
    PutnikDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [PilotService,
    PutnikService,
    AviokompanijaService,
    AvionService,
    AvionskaKartaService,
    DestinacijaService,
    KlasaService,
    LetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
