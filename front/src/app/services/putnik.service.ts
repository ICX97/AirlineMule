import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Putnik} from '../models/putnik';

@Injectable({
  providedIn: 'root'
})
export class PutnikService {

  private readonly API_URL = 'http://localhost:8081/api/Putnik';

  dataChange: BehaviorSubject<Putnik[]> = new BehaviorSubject<Putnik[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllPutnik(): Observable<Putnik[]> {
    this.httpClient.get<Putnik[]>(this.API_URL+'?search=').subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addPutnik(putnik: Putnik): void {
    this.httpClient.post(this.API_URL, putnik).subscribe();
}

public updatePutnik(putnik: Putnik): void {
  console.log(putnik);
    this.httpClient.put(this.API_URL+'/'+ putnik.PutnikID, putnik).subscribe();
}

public deletePutnik(PutnikID: number): void {
    this.httpClient.delete(this.API_URL+'/' + PutnikID).subscribe();
}
}
