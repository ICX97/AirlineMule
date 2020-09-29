import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PilotComponent } from './components/pilot/pilot.component';
import { PutnikComponent} from './components/putnik/putnik.component';
import { AvionComponent } from './components/avion/avion.component';
import { AviokompanijaComponent} from './components/aviokompanija/aviokompanija.component';
import { AvionskaKartaComponent } from './components/avionska-karta/avionska-karta.component';
import { DestinacijaComponent} from './components/destinacija/destinacija.component';
import { KlasaComponent} from './components/klasa/klasa.component';
import { LetComponent } from './components/let/let.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [

  {path: 'pilot', component:PilotComponent},
  {path: 'putnik', component:PutnikComponent},
  {path: 'aviokompanija', component:AviokompanijaComponent},
  {path: 'avion', component:AvionComponent},
  {path: 'avionskaKarta', component:AvionskaKartaComponent},
  {path: 'destinacija', component:DestinacijaComponent},
  {path: 'klasa', component:KlasaComponent},
  {path: 'let', component:LetComponent},
  {path: '', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
