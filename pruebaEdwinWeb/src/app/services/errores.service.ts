import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {
  constructor() { }

  errores(formulario: FormGroup, nombreControl: string, ngForm?: any) {
    const errores = formulario.get(nombreControl).errors;
    return {
      hayErrores:
        (!!errores && formulario.get(nombreControl).dirty) || (isNullOrUndefined(ngForm) ? false : (!!errores && ngForm.submitted)),
      errores
    };
  }
}
