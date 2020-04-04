import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TurnoService } from '../../../services/turno.service';
import { SweetAlertsService } from '../../../services/sweet-alerts.service';
import { ErroresService } from '../../../services/errores.service';
import { UserService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Turno } from '../../../models/turno';

@Component({
  selector: 'app-form-turno',
  templateUrl: './form-turno.component.html',
  styles: []
})
export class FormTurnoComponent implements OnInit {

  formTurno: FormGroup;
  usuarios: Usuario[] = [];

  constructor(
    private sweet: SweetAlertsService,
    public erroresService: ErroresService,
    private userService: UserService,
    private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.userService.consultarUsuarios().subscribe(Data =>
      this.usuarios = Data);

    this.formTurno = new FormGroup({
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      horarioInicioTurno: new FormControl('', Validators.required),
      horarioFinTurno: new FormControl('', Validators.required),
      horarioInicioHoraExtra: new FormControl('', Validators.required),
      horarioFinHoraExtra: new FormControl('', Validators.required),
      motivoHoraExtra: new FormControl('', Validators.required),
      usuario: new FormControl(null, Validators.required)
    });
  }

  limpiarForm() {
    this.formTurno.reset();
  }

  registrarTurno() {
    if (this.formTurno.valid) {
      const turno: Turno = this.formTurno.value;
      this.turnoService.registrarTurno(turno).subscribe(
        (Data: any) => {
          if (Data._id != null) {
            this.sweet.popUp('Exito', 'La información a sido almacenada exitosamente', 'success');
          } else {
            this.limpiarForm();
            this.sweet.popUp('Error', 'Ocurrió un problema al guardar al turno', 'error');
          }
        }
      );
    }
  }

}
