import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { GooglemapsService } from './googlemaps.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';




declare let google: any;


@Component({
  selector: 'app-google-maps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements OnInit {


      // coordenadas cuenca
      @Input() position = {
            lat: 19.451585768071457,
            lng: -70.70742306087506
 };

      @ViewChild('map') divMap: ElementRef;
      positionSet: any;
      label = {
            titulo:'Ubicación',
            subtitulo: 'Ubicación del caso reportado'
      };

      map: any;
      marker: any;
      infowindow: any;



      constructor(private renderer: Renderer2,
                  @Inject(DOCUMENT) private document,
                  private googlemapsService: GooglemapsService,
                  public modalController: ModalController,
                  public toastCtrl: ToastController) { }

      ngOnInit(): void {
            this.init();

            console.log('position ->', this.position);
      }

      async init() {

            this.googlemapsService.init(this.renderer, this.document).then( () => {
                  this.initMap();
            }).catch( (err) => {
                  console.log(err);
            });

      }




      initMap() {

            const position = this.position;

            const latLng = new google.maps.LatLng(position.lat, position.lng);

            const mapOptions = {
                  center: latLng,
                  zoom: 15,
                  disableDefaultUI: true,
                  clickableIcons: false,
            };

            this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
            this.marker = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  draggable: false,
            });
            this.clickHandleEvent();
            this.infowindow = new google.maps.InfoWindow();
            this.addMarker(position);
            this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);

      }

      clickHandleEvent() {

            this.map.addListener('click', (event: any) => {
                  const position = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                  };
                  this.addMarker(position);
            });

      }



      addMarker(position: any): void {

            const latLng = new google.maps.LatLng(position.lat, position.lng);

            this.marker.setPosition(latLng);
            this.map.panTo(position);
            this.positionSet = position;

      }


      setInfoWindow(marker: any, titulo: string, subtitulo: string) {

            const contentString  =  '<div id="contentInsideMap">' +
                                    '<div>' +
                                    '</div>' +
                                    '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                                    '<div id="bodyContent">' +
                                    '<p class"normal m-0">'
                                    + subtitulo + '</p>' +
                                    '</div>' +
                                    '</div>';
            this.infowindow.setContent(contentString);
            this.infowindow.open(this.map, marker);

      }

      async presentToast(msg: string) {
            const toast = await this.toastCtrl.create({
             message: msg,
             duration: 2000,
             position: 'bottom'});
                   toast.present();}

      async mylocation() {

      console.log('mylocation() click');

      Geolocation.getCurrentPosition().then((res) => {

            console.log('mylocation() -> get ', res);

            const position = {
                  lat: res.coords.latitude,
                  lng: res.coords.longitude,
            };
            this.addMarker(position);

      });

      }

      aceptar() {
           // console.log('click aceptar -> ', this.positionSet);
            this.modalController.dismiss({pos: this.positionSet});
            this.presentToast('La ubicación ha sido guardada con exito');
      }

}
