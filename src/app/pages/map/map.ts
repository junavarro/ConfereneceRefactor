import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(public confData: ConferenceData, public platform: Platform) { }

  async ngAfterViewInit() {
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    const googleMaps = await getGoogleMaps('AIzaSyAWALjuMPSaM8nqX91VsxbpSMarWm8x0GE');
    this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      const map = new googleMaps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>
          <ion-card>
          <ion-item>
            <ion-icon name="pin" slot="start"></ion-icon>
            <ion-label>ion-item in a card, icon left, button right</ion-label>
            <ion-button fill="outline" slot="end">View</ion-button>
          </ion-item>

          <ion-card-content>
            This is content, without any paragraph or header tags,
            within an ion-card-content element.
          </ion-card-content>
        </ion-card>
                  `
        });
        
        const marker = new googleMaps.Marker({
          
          position: {lat: Number (markerData.lat), lng: Number(markerData.lng)},
          map,
          title: markerData.name,
          icon:markerData.icon
        });



        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          console.log('Marker clicked');
        });
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }

  showFoodPlaces(){
    console.log("food");
  }
  showWorkShopPlaces(){
    console.log("workshop");
  }
  showPlenaryPlaces(){
    console.log("plenary");
  }
  showTouristicPlaces(){
    console.log("tourist");
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
