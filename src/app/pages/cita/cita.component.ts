import { Component, OnInit,  } from '@angular/core';
import { LoadingController, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';
//import { Console } from 'console';
import { Informante, Reporte, Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})

export class CitaComponent implements OnInit {
  casos: Reporte[] = [];
  uid = '';
  casoNum= 1;
  subinfo: Subscription;
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
   iduser:this.uid,
    ubicacion: null,
  };
  usuario: Usuario = {
    uid: '',
    nombre: '',
    contacto: '',
    email: '',
    password: '',
    fecha:new Date(),
    };
  newInformante: Informante={
    nombre:'',
    cel:'',
    correo:'',
    id:this.firestoreService.getid(),
    fecha: new Date()};    isActive = false;
    loading: any;
    img = '';
    newFile='';
    nombreInformante= this.usuario.email;
private path='reporte/';



  constructor(public log: FirebaseauthService, public loadingController: LoadingController, public navCtrl: NavController,
    public menucontroler: MenuController,public firestoreService: FirestoreService,
    public toastCtrl: ToastController, public firestorage: FirestorageService,
    public firebaseauthService: FirebaseauthService, private modalController: ModalController) {
      this.log.stateauth().subscribe( res=>{
        //console.log(res);
        if (res !== null){
          this.uid= res.uid;
          this.newReporte.iduser=this.uid;
          this.getUserInfo(this.uid);
        }else {
          this.uid='Anonimo';

        }
      });

      this.firestoreService.getultimoCaso<Reporte>(this.path).subscribe(res=>{
        if (res !==null)
        {
          this.casos= res;
          const sum: number =res[0].caso + 1;
          this.newReporte.caso= sum;
          console.log('este es el resultado->'+ this.newReporte.caso);}

          ;});

}
 async ngOnInit() {

  const uid = await this.log.getUid();

   // console.log(uid);

  }

  ngOnend(){}

  openmenu(){
 this.menucontroler.toggle('principal');//funcion para abrir menu
  }
async  guardarDatos(){
  this.presentLoading();
    const path = '/reporte';
const name = this.newReporte.nombre;
const file = this.newFile;
const res = await this.firestorage.uploadImg(file, path, name);
this.newReporte.foto = res;

    this.firestoreService.createDoc(this.newReporte, this.path, this.newReporte.id).then( ans =>{
      this.loading.dismiss().then( respuesta => {
        this.presentToast('Reporte enviado');
        if(this.newReporte.id==='' || null){
          this.navCtrl.navigateRoot('/home');
        }
        else{this.navCtrl.navigateRoot('/casos');}
           });
    });

}
goAnOtherPage() {
  this.navCtrl.navigateRoot('/home');
}


getUserInfo(uid: string){
  const path ='usuario';
this. subinfo = this.firestoreService.getDoc<Usuario>(path,uid).subscribe(res=>{
this.usuario = res;
});
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

async newImg(event: any){

if (event.target.files && event.target.files[0]){
  const reader = new FileReader();
  this.newFile = event.target.files[0];;
  reader.onload = ((image) => {
    this.img = image.target.result as string;


  });
  reader.readAsDataURL(event.target.files[0]);
}



}

getuid(){
  this.firebaseauthService.stateauth().subscribe(res =>{
    if(res !== null){
      this.newReporte.iduser= res.uid;

    }

    else{ this.newReporte.iduser= '';}
  });


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
    mode: 'md',
    swipeToClose: true,
    componentProps: {position: positionInput}
  });
  await modalAdd.present();

  const {data} = await modalAdd.onWillDismiss();
  if (data) {
    //console.log('data -> ', data);
    this.newReporte.ubicacion = data.pos;
   //console.log('this.Reporte -> ', this.newReporte);
  }

}

}
