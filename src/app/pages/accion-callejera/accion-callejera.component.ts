import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-accion-callejera',
  templateUrl: './accion-callejera.component.html',
  styleUrls: ['./accion-callejera.component.scss'],
})
export class AccionCallejeraComponent implements OnInit {

  llamar: any;
  constructor() { }

  ngOnInit() {}

  inactive(id: string){
    const active = document.getElementById(id);

    active.classList.remove('active');
  }

  seleccionA(){
    this.inactive('1');
    this.inactive('pri');
    this.inactive('3');
    this.inactive('4');
    this.inactive('2');
  }



}
