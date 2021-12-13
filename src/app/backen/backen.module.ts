import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './paciente/paciente.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule, IonicModule,FormsModule
  ]
})
export class BackenModule { }
