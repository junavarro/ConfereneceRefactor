import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(public toastController: ToastController,private router: Router) { }
  
  async presentToast(_message) {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(data) {
    const toast = await this.toastController.create({
      header: data.title,
      message: data.body,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Check',
          handler: () => {
            console.log('Check clicked');
            this.router.navigateByUrl(data.url);
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
