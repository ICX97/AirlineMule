import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Aviokompanija} from '../models/aviokompanija';

@Injectable({
  providedIn: 'root'
})
export class AviokompanijaService {

  private readonly API_URL = 'http://localhost:8081/api/AvioKompanija/';

  dataChange: BehaviorSubject<Aviokompanija[]> = new BehaviorSubject<Aviokompanija[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllAviokompanija(): Observable<Aviokompanija[]> {
    this.httpClient.get<Aviokompanija[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addAviokompanija(aviokompanija: Aviokompanija): void {
    this.httpClient.post(this.API_URL, aviokompanija).subscribe();
}

public updateAviokompanija(aviokompanija: Aviokompanija): void {
    this.httpClient.put(this.API_URL, aviokompanija).subscribe();
}

public deleteAviokompanija(KompanijaID: number): void {
    console.log(this.API_URL + KompanijaID);
    this.httpClient.delete(this.API_URL + KompanijaID).subscribe();
}
}
