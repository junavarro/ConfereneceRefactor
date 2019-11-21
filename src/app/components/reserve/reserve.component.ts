import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { NgForm } from '@angular/forms';
import { ConferenceData } from '../../providers/conference-data';
import { take } from 'rxjs/operators';
import { element } from 'protractor';
import { LoginModule } from '../../pages/login/login.module';

@Component({
  selector: 'reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
  @Input() sessionId: string;
  @Input() displayName: string;
  //'conferencia.profesores@gmail.com'  'confprof12345'
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  session: any;
  isAlreadyRegistered = false;


  constructor(public modalController: ModalController, public userData: UserData,
    public router: Router,
    public afAuth: AngularFireAuth,
    public confData: ConferenceData,
    public toastController: ToastController) {


  }

  ngOnInit() {
    this.confData.getEvent(this.sessionId).subscribe((event) => {
      this.session = event;
      this.userData.getUsername().then((username) => {
        //check if registered
        this.login.username = username;
        this.isAlreadyRegisteredValidation();
      });

    });
   
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }




  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      //this.router.navigateByUrl('/app/tabs/schedule');
    }
  }


  loginUser(form: NgForm) {

    if (form.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(this.login.username, this.login.password).then(
        (user) => {
          console.log("user", user.user.email);
          this.userData.login(this.login.username);
          // if(user.user.email){
          //   this.router.navigateByUrl('/app/tabs/schedule');
          // }
          this.isAlreadyRegisteredValidation();
          

          if (this.session.eventType.objectKey == "workshop") {
            if (this.session.attendees.length < this.session.quota) {
              this.session.attendees.push(user.user.email);
              this.confData.saveEvent(this.session);
            } else {
              console.log("cuota exedida", this.session.attendees.length, this.session.quota, this.session);
            }
          }
          this.dismiss();

        },
        (error) => {
          console.log("user error", error);
         // this.dismiss();
         this.presentToast(error);
        }
      );
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  
  deleteReservation() {
    this.session.attendees = this.session.attendees.filter((value,index,arr)=>{
      return value != this.login.username;
    });
    this.confData.saveEvent(this.session);
    console.log( this.session.attendees);
    this.presentToast("Registration deleted");
    //setTimeout(()=>{ this.dismiss(); }, 2500);
  }

  isAlreadyRegisteredValidation(){
    this.isAlreadyRegistered = this.session.attendees.find((attendee) => {
      return attendee == this.login.username
    }) != null;
  }




}
