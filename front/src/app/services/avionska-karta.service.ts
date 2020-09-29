import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { AvionskaKarta} from '../models/avionskakarta';
import { Avion } from '../models/avion';
import { AvionskaKartaDTO } from '../DTO/avionskakartaDTO';

@Injectable({
  providedIn: 'root'
})
export class AvionskaKartaService {

  private readonly API_URL = 'http://localhost:8081/api/AvionskaKarta';

  dataChange: BehaviorSubject<AvionskaKarta[]> = new BehaviorSubject<AvionskaKarta[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllAvionskaKarta(): Observable<AvionskaKarta[]> {
    this.httpClient.get<AvionskaKarta[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addAvionskaKarta(avionskaKarta: AvionskaKartaDTO): void {
    this.httpClient.post(this.API_URL, avionskaKarta).subscribe();
}

public updateAvionskaKarta(avionskaKarta: AvionskaKartaDTO): void {
    this.httpClient.put(this.API_URL + '/' + avionskaKarta.AvionskaKartaID, avionskaKarta).subscribe();
}

public deleteAvionskaKarta(AvionskaKartaID: number): void {
    console.log(this.API_URL + AvionskaKartaID);
    this.httpClient.delete(this.API_URL+ '/' + AvionskaKartaID).subscribe();
}
}
