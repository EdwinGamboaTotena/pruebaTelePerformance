import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { LoaderComponent } from './core/loader/loader.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { ConsumirServicioComponent } from './fixure/consumir-servicio/consumir-servicio.component';
import { RegistrosComponent } from './fixure/personal/registros/registros.component';
import { FormUsuarioComponent } from './fixure/personal/form-usuario/form-usuario.component';
import { FormTurnoComponent } from './fixure/personal/form-turno/form-turno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    FooterComponent,
    ConsumirServicioComponent,
    RegistrosComponent,
    FormUsuarioComponent,
    FormTurnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule,
    LoaderComponent,
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptorService,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
