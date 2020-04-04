import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserExterno } from '../models/userServicioExterno';
import { apiExterno } from '../config/api';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConsumirServicioExternoService {

  constructor(private httpClient: HttpClient) { }

  consultarUsuarios(): Observable<UserExterno[]> {
    return this.httpClient.get(apiExterno, httpOptions).pipe(
      map((response: any) => response.users as UserExterno[]));
  }

}
