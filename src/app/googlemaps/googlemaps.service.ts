import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';

declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  // AIzLSyCzwRcOLLgw9xfAaIt11HD523Q69g62J3Z

  apiKey = 'AIzaSyDuNe-QRmTD5gRCOtkQ5VvPlQSPuUfBXGc';
  mapsLoaded = false;


  constructor() {}

  init(renderer: any, document: any): Promise<any> {

    return new Promise((resolve) => {

      if (this.mapsLoaded) {
        console.log('google is preview loaded');
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      // eslint-disable-next-line @typescript-eslint/dot-notation
      window['mapInit'] = () => {
          this.mapsLoaded = true;
          if (google) {
             console.log('google is loaded');
          } else {
             console.log('google is not Defined');
          }
          resolve(true);
          return;
      };

      if(this.apiKey){
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      renderer.appendChild(document.body, script);

    });


  }


}












































