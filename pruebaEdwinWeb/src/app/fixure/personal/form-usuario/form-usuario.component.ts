import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SweetAlertsService } from '../../../services/sweet-alerts.service';
import { ErroresService } from '../../../services/errores.service';
import { UserService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styles: []
})
export class FormUsuarioComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(
    private sweet: SweetAlertsService,
    public erroresService: ErroresService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.formUsuario = new FormGroup({
      documento: new FormControl('', [Validators.required, Validators.minLength(5)]),
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    });
  }

  limpiarForm() {
    this.formUsuario.reset();
  }

  registrarUsuario() {
    if (this.formUsuario.valid) {
      const usuario: Usuario = this.formUsuario.value;
      this.userService.registrarUsuario(usuario).subscribe(
        (Data: any) => {
          if (Data.documento != null) {
            this.sweet.popUp('Exito', 'La información a sido almacenada exitosamente', 'success');
          } else {
            this.limpiarForm();
            this.sweet.popUp('Error', 'Ocurrió un problema al guardar al usuario', 'error');
          }
        }
      );
    }
  }

}
