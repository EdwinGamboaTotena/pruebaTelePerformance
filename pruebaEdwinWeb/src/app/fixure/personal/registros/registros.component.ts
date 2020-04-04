import { Component, OnInit } from '@angular/core';
import { Turno } from '../../../models/turno';
import { TurnoService } from '../../../services/turno.service';
import { SweetAlertsService } from '../../../services/sweet-alerts.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styles: []
})
export class RegistrosComponent implements OnInit {

  listaTurnos: Turno[] = [];

  constructor(
    private turnoService: TurnoService,
    private sweet: SweetAlertsService, ) {
  }

  ngOnInit(): void {
    this.consultarRegistros();
  }

  consultarRegistros() {
    this.turnoService.consultarTurnos().subscribe(Data =>
      this.listaTurnos = Data);
  }

  confirmarEliminarTurno(id: string) {
    this.sweet.confirm(
      'Eliminar Registro',
      'Esta seguro que desea eliminar este registro ? No podrá reversar esa acción',
      'warning',
      'Si, Eliminar',
      'Cancelar',
      { clickConfirm: () => this.eliminarTurno(id) }
    );
  }

  eliminarTurno(id: string) {
    this.turnoService.eliminarTurno(id).subscribe(() =>
      this.sweet.popUp('Exito', 'El registro a sido eliminado satisfactoriamente', 'success')
    );
    this.consultarRegistros();
  }

}
