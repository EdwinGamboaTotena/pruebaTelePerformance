import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Turno } from '../models/turno';
import { apiTurno } from '../config/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private httpClient: HttpClient) { }

  consultarTurnos(): Observable<Turno[]> {
    return this.httpClient.get(apiTurno, httpOptions).pipe(
      map((response: any) => response.turnos as Turno[]));
  }

  registrarTurno(turno: Turno): Observable<Turno> {
    return this.httpClient.post(apiTurno, turno, httpOptions).pipe(
      map((response: any) => response.turno as Turno));
  }

  eliminarTurno(id: string): Observable<Turno> {
    return this.httpClient.delete(`${apiTurno}/${id}`, httpOptions).pipe(
      map((response: any) => response.turno as Turno));
  }
}
