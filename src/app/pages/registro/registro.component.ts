import { Component, OnInit } from '@angular/core';
//import { ConsoleReporter } from 'jasmine';
import { Usuario } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Informante, Reporte } from 'src/app/models';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  usuario: Usuario = {
  uid: '',
  nombre: '',
  contacto: '',
  email: '',
  password: '',
  fecha:new Date(),
  };

  loading: any;
  path: '/usuarios';
  uid = '';
subinfo: Subscription;
confirmarPass ='';



  constructor(public log: FirebaseauthService,
              public firestoreService: FirestoreService,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertController: AlertController,
              public loadingController: LoadingController) {
               this.log.stateauth().subscribe( res=>{

                  if (res !== null){
                    this.uid= res.uid;

                    this.getUserInfo(this.uid);
                  }else {
                    this.uid='';
                    this.limpiarcampos();
                  }
                });
              }


 async ngOnInit() {
    //const uid = await this.log.getUid().catch(err=>{console.log('Aun no esta logueado')});
   // if (this.uid!==null||this.uid!==''){this.seleccionA();}
    

  }

  

  limpiarcampos(){
    this.usuario= {
      uid: '',
      nombre: '',
      contacto: '',
      email: '',
      password: '',
      fecha:new Date(),
      };
  }
  async  guardarDatos(){

   // this.presentLoading();
      const path = '/usuario';
  const name = this.usuario.nombre;

      this.firestoreService.createDoc(this.usuario, path, this.usuario.uid).then( ans =>{
        //this.loading.dismiss().then( respuesta => {

          this.presentToast('Registro exitoso');
         // this.navCtrl.navigateRoot('/home');
        }).catch(err =>{console.log('error de id:',err);});
     // });


  }

 async registro(){
    const credenciales ={
      email: this.usuario.email,
      password: this.usuario.password,
    };

  const res = await this.log.registrar(credenciales.email,credenciales.password).then(res=>{
    
    return true }).catch(err =>{
    
    return false
  });
  const uid = await this.log.getUid();
  this.usuario.uid = uid;
  

  }


  async registrar(){
   
  
  this.validacion();
  if(this.validacion())
  {this.registro().then(res => {
    if(this.usuario.uid!==null && this.usuario.uid!=='')
    {this.guardarDatos().then(res =>{this.goAnOtherPage();});}
    
    
    
  }).catch(err=>{console.log('Error de base de datos: '+err.Error);}); }


  }

 async salir(){
   // const uid = await this.log.getUid();
    //console.log(uid);
    this.log.logout();
    this.subinfo.unsubscribe();
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

  async alerta(msgAlerta: string){
  const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Alerta!',
    message: '<strong>'+msgAlerta +'</strong>',
    buttons: [
      {
        text: 'Ok',
        role: 'Pk',
        cssClass: 'secondary',
        handler: (blah) => {

        }
      }
    ]
  });

  await alert.present();
}

  validacion(){
    if (this.usuario.nombre=== ''|| this.usuario.contacto ==='' || this.usuario.password ===''
    || this.usuario.email===''){
      this.alerta('Todos los campos son queridos');
    return false;
    }

    else
    {
      if(this.usuario.password === this.confirmarPass){

      return true;
      }

      else{ this.alerta('Las contraseñas no coinciden');

    return false;}


  }
  }

  getUserInfo(uid: string){
        const path ='usuario';
   this. subinfo = this.firestoreService.getDoc<Usuario>(path,uid).subscribe(res=>{
      this.usuario = res;
    });
  }

  goAnOtherPage() {
    this.navCtrl.navigateRoot('/home');
    
    this.seleccionA();
  }

  seleccionA(){

    this.inactive('1');
    this.inactive('pri');
    this.inactive('3');
    this.inactive('4');
    this.inactive('2');
  }
  //para marcar como seleccionado la opcion dentro del menu


  active(id: string){
    const active = document.getElementById(id);
    active.classList.add('active');
  }

  inactive(id: string){
    const active = document.getElementById(id);

    active.classList.remove('active');
  }

}
