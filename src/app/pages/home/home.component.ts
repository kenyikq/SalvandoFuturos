import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  goAnOtherPage(pagina: string) {
    this.navCtrl.navigateRoot(pagina);
  }

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
