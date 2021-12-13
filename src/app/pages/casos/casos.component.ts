import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Reporte } from 'src/app/models';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';


@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.scss'],
})
export class CasosComponent implements AfterViewInit, OnInit {
path='/reporte';
uid ='';
casos: Reporte[] = [];

newReporte: Reporte={
  tipoAbuso:'',
  nombre:'',
  edad:'',
  sexo:'',
  foto:'',
  id:this.firestoreService.getid(),
  fecha: new Date(),
  descripcion:'',
  estatus:'Recibido',
  direccion:'',
  caso:0,
  iduser: this.uid,
  ubicacion: null,

 };

 fecha= this.newReporte.fecha;
 actulizarCasos = false;
 loading: any;
 img = '';
    newFile='';

    admin= 'g5Z5gubaLbaEZLUjQFyOjykkQSE2';

  constructor(private modalController: ModalController,
    public firestoreService: FirestoreService,
    private navCtrl: NavController, public firestorage: FirestorageService,
    public alertController: AlertController, private toastCtrl: ToastController,
    public log: FirebaseauthService, public firebaseauthService: FirebaseauthService,
    private loadingController: LoadingController) {
      this.log.stateauth().subscribe( res=>{

      if (res !== null){
        this.uid= res.uid;
        this.newReporte.iduser=this.uid;
        this.getcasos();


      }else {
        this.uid='';

      }

      });
    }



 async ngOnInit() {
  const uid = await this.log.getUid();
    }
    async ngAfterViewInit() {const uid = await this.log.getUid();}

 async deleteCaso(caso: Reporte){

  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Confirmacion!',
    message: '<strong>Resuro que desea eliminar el Reporte</strong>?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.firestoreService.deleteDoc(this.path,caso.id);
          this.presentToast('Reporte eliminado');
        }
      }
    ]
  });

  await alert.present();
}




 async guardarDatos(){

  this.presentLoading();
  const path = '/reporte';
const name = this.newReporte.nombre;
const file = this.newFile;
const res = await this.firestorage.uploadImg(file, path, name);
this.newReporte.foto = res;

  this.firestoreService.createDoc(this.newReporte, this.path, this.newReporte.id).then( ans =>{
    this.loading.dismiss().then( respuesta => {
      this.actulizarCasos = false;
      this.presentToast('Los datos fueron actualizados correctamente');


    });
  });



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


getuid(){
  this.firebaseauthService.stateauth().subscribe(res =>{
    if(res !== null){
      this.uid= res.uid;
    }

    else{ this.uid= '';}
  });
}


mostrarDatos(caso){
  this.actulizarCasos = true;
  this.newReporte = caso;
}

getcasos(){

  if(this.uid === this.admin){
    this.firestoreService.getCollection<Reporte>(this.path).subscribe( res => {
      // console.log(res);
       this.casos= res;

     } );
  }
  else{
    this.firestoreService.getCollectionquery<Reporte>(this.path, 'iduser','==',this.uid).subscribe( res => {

       this.casos= res;

     } );
  }

}
async newImg(event: any){

  if (event.target.files && event.target.files[0]){
    const reader = new FileReader();
    this.newFile = event.target.files[0];;
    reader.onload = ((image) => {
      this.img = image.target.result as string;
      this.newReporte.foto= this.img;

    });
    reader.readAsDataURL(event.target.files[0]);
  }
}

async presentToast(msg: string) {
   const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'bottom'
  });

 toast.present();
}

async presentLoading(){
this.loading = await this.loadingController.create({
  cssClass: 'normal',
  message:'Guardando',
});
await this.loading.present();

}


async addDirection() {

  const ubicacion = this.newReporte.ubicacion;
  let positionInput = {
    lat: 19.451585768071457,
    lng: -70.70742306087506,
  };
  if (ubicacion !== null) {
      positionInput = ubicacion;
  }

  const modalAdd  = await this.modalController.create({
    component: GooglemapsComponent,
    mode: 'ios',
    swipeToClose: true,
    componentProps: {position: positionInput}
  });
  await modalAdd.present();

  const {data} = await modalAdd.onWillDismiss();
  if (data) {
    console.log('data -> ', data);
    this.newReporte.ubicacion = data.pos;

  }

}

}
