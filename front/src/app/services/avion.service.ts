import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Avion} from '../models/avion';

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  private readonly API_URL = 'http://localhost:8081/api/Avion/';

  dataChange: BehaviorSubject<Avion[]> = new BehaviorSubject<Avion[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllAvion(): Observable<Avion[]> {
    this.httpClient.get<Avion[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addAvion(avion: Avion): void {
    this.httpClient.post(this.API_URL, avion).subscribe();
}

public updateAvion(avion: Avion): void {
    this.httpClient.put(this.API_URL, avion).subscribe();
}

public deleteAvion(AvionID: number): void {
    console.log(this.API_URL + AvionID);
    this.httpClient.delete(this.API_URL + AvionID).subscribe();
}
}
