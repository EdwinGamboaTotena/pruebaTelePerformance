import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario';
import { apiUsuario } from '../config/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  consultarUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get(apiUsuario, httpOptions).pipe(
      map((response:any) => response.usuarios as Usuario[]));
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post(apiUsuario, usuario, httpOptions).pipe(
      map((response:any) => response.usuario as Usuario));
  }

}
