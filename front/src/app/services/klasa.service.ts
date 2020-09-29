import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Klasa} from '../models/klasa';
@Injectable({
  providedIn: 'root'
})
export class KlasaService {

  private readonly API_URL = 'http://localhost:8081/api/Klasa/';

  dataChange: BehaviorSubject<Klasa[]> = new BehaviorSubject<Klasa[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllKlasa(): Observable<Klasa[]> {
    this.httpClient.get<Klasa[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addKlasa(klasa: Klasa): void {
    this.httpClient.post(this.API_URL, klasa).subscribe();
}

public updateKlasa(klasa: Klasa): void {
    this.httpClient.put(this.API_URL, klasa).subscribe();
}

public deleteKlasa(KlasaID: number): void {
    console.log(this.API_URL + KlasaID);
    this.httpClient.delete(this.API_URL + KlasaID).subscribe();
}
}
