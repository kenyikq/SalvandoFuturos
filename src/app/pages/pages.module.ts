import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaComponent } from './cita/cita.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AccionCallejeraComponent } from './accion-callejera/accion-callejera.component';
import { CasosComponent } from './casos/casos.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { BrowserModule } from '@angular/platform-browser';
import { RegistroComponent } from './registro/registro.component';
import {  RouterModule } from '@angular/router';
import  {ReactiveFormsModule}  from '@angular/forms';








@NgModule({
  declarations: [CitaComponent,LoginComponent, HomeComponent,AccionCallejeraComponent,
RegistroComponent, CasosComponent, EstadisticaComponent],



  imports: [
    CommonModule, IonicModule, FormsModule, BrowserModule, RouterModule, ReactiveFormsModule
  ],


})
export class PagesModule { }

