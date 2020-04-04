import { Component, OnInit } from '@angular/core';
import { ConsumirServicioExternoService } from '../../services/consumir-servicio-externo.service';
import { UserExterno } from '../../models/userServicioExterno';

@Component({
  selector: 'app-consumir-servicio',
  templateUrl: './consumir-servicio.component.html',
  styles: []
})
export class ConsumirServicioComponent implements OnInit {

  usuariosExternos: UserExterno[] = [];

  constructor(private servicioExterno: ConsumirServicioExternoService) {
  }

  ngOnInit(): void {
    this.servicioExterno.consultarUsuarios().subscribe(Data =>
      this.usuariosExternos = Data);
  }

}
