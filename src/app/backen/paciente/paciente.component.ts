import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {

  newPaciente: Paciente={
    nombre: '',
    apellidos:'',
    tipoDoc: '',
    docNum: '',
    contacto: '',
    clave: '',
    correo: '',
    id:this.firestoreService.getid(),
    fecha: new Date()

  };

  claveCon: string; //Para comprobar la contraseña
  private path='paciente/';


  constructor(public firestoreService: FirestoreService) { }


  ngOnInit() {}

  guardarDatos(){
      this.firestoreService.createDoc(this.newPaciente, this.path, this.newPaciente.id);
  }

}
