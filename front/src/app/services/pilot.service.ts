import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Pilot} from '../models/pilot';

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  private readonly API_URL = 'http://localhost:8081/api/Pilot/';

  dataChange: BehaviorSubject<Pilot[]> = new BehaviorSubject<Pilot[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllPilot(): Observable<Pilot[]> {
    this.httpClient.get<Pilot[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addPilot(pilot: Pilot): void {
    this.httpClient.post(this.API_URL, pilot).subscribe();
}

public updatePilot(pilot: Pilot): void {
    this.httpClient.put(this.API_URL, pilot).subscribe();
}

public deletePilot(PilotID: number): void {
    this.httpClient.delete(this.API_URL + PilotID).subscribe();
}





  /* public login(username,password):any{
  var login=new LoginDTO();
  login.username=username;
  login.password=password;
   this.httpClient.post('http://localhost:8081/api/pilot/login',login).subscribe(data=>{
     localStorage.setItem('token',data.putnikID);
   });//select pilotID from pilot where usarname= $$$ and pasword= %%

  } */


}
