import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Destinacija} from '../models/destinacija';
@Injectable({
  providedIn: 'root'
})
export class DestinacijaService {

  private readonly API_URL = 'http://localhost:8081/api/Destinacija/';

  dataChange: BehaviorSubject<Destinacija[]> = new BehaviorSubject<Destinacija[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllDestinacija(): Observable<Destinacija[]> {
    this.httpClient.get<Destinacija[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addDestinacija(destinacija: Destinacija): void {
    this.httpClient.post(this.API_URL, destinacija).subscribe();
}

public updateDestinacija(destinacija: Destinacija): void {
    this.httpClient.put(this.API_URL, destinacija).subscribe();
}

public deleteDestinacija(DestinacijaID: number): void {
    console.log(this.API_URL + DestinacijaID);
    this.httpClient.delete(this.API_URL + DestinacijaID).subscribe();
}
}
