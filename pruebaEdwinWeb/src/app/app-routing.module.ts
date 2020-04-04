import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumirServicioComponent } from './fixure/consumir-servicio/consumir-servicio.component';
import { RegistrosComponent } from './fixure/personal/registros/registros.component';
import { FormUsuarioComponent } from './fixure/personal/form-usuario/form-usuario.component';
import { FormTurnoComponent } from './fixure/personal/form-turno/form-turno.component';


const routes: Routes = [
  { path: 'dashboard', component: ConsumirServicioComponent },
  { path: 'registros', component: RegistrosComponent },
  { path: 'usuarios', component: FormUsuarioComponent },
  { path: 'turnos', component: FormTurnoComponent },
  { path: '', redirectTo: '/registros', pathMatch: 'full' },
  { path: '**', redirectTo: '/registros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
