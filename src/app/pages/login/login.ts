import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';





@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: 'conferencia.profesores@gmail.com', password: 'confprof12345' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public afAuth: AngularFireAuth
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }


  loginUser(form: NgForm){

    if(form.valid){
      this.afAuth.auth.signInWithEmailAndPassword(this.login.username,this.login.password).then(
        (user)=>{
          console.log("user",user.user.email);
          if(user.user.email){
            this.router.navigateByUrl('/app/tabs/schedule');
          }
        },
        (error)=>{
          console.log("user error",error);
        }
      );
    }
   }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  ngOnInit(){
   
  }
}
