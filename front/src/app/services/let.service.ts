import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { LoginDTO } from '../DTO/loginDTO';
import { Let} from '../models/let';
import { LetDTO } from '../DTO/letDTO';
@Injectable({
  providedIn: 'root'
})
export class LetService {

  private readonly API_URL = 'http://localhost:8081/api/Let/';

  dataChange: BehaviorSubject<Let[]> = new BehaviorSubject<Let[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllLet(): Observable<Let[]> {
    this.httpClient.get<Let[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error:HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }
public addLet(lett: LetDTO): void {
    this.httpClient.post(this.API_URL, lett).subscribe();
}

public updateLet(lett: LetDTO): void {
    this.httpClient.put(this.API_URL, lett).subscribe();
}

public deleteLet(LetID: number): void {
    console.log(this.API_URL + LetID);
    this.httpClient.delete(this.API_URL + LetID).subscribe();
}
}
