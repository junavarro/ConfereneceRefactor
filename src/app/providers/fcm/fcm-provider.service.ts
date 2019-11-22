import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { ConferenceData } from '../conference-data';
@Injectable({
  providedIn: 'root'
})
export class FcmProviderService  {

  constructor(private fcm: FCM, private confData: ConferenceData) { 
   
    this.fcm.onTokenRefresh().subscribe(token => {
      this.confData.registerToken(token,String(token).substring(3,11));
    });
  }
  getToken(){
    this.fcm.getToken().then(token => {
      this.confData.registerToken(token,String(token).substring(3,11));
      this.listenNotifications();
    });
  }
  listenNotifications(){
    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
  }
  subscribeToTopic(topic){
    this.fcm.subscribeToTopic(topic).then( (data)=>{
      console.log('Subscribed',topic);
    });
  }
  
}
