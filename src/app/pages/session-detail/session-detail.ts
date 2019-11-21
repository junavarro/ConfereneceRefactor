import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { take } from 'rxjs/operators';
import { ReserveComponent } from "./../../components/reserve/reserve.component";
import { ModalController } from '@ionic/angular';
import { LocalData } from '../../providers/localStorage';
@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage implements OnInit {
  session: any;
  isFavorite: any;
  defaultHref = '';
  sessionId: any;
  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public localData: LocalData
  ) {

  }
  sessionClick(item: string) {
    console.log('Clicked', item);
  }
  toggleFavorite() {
    // if (this.userProvider.hasFavorite(this.session.name)) {
    //   this.userProvider.removeFavorite(this.session.name);
    //   this.isFavorite = false;
    // } else {
    //   this.userProvider.addFavorite(this.session.name);
    //   this.isFavorite = true;
    // }
  }
  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.dataProvider.getEvent(this.sessionId).pipe(take(1)).toPromise().then(
      (data) => {
        console.log(data);
        this.session = data;
        this.isFavoriteValidator(this.session.id);
      }
    );
  }
  ionViewWillEnter() {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.dataProvider.getEvent(this.sessionId).pipe(take(1)).toPromise().then(
      (data) => {
        console.log(data);
        this.session = data;
        //this.isFavoriteValidator( this.session.id);
      }
    );
    // this.dataProvider.load().subscribe((data: any) => {
    //   if (
    //     data &&
    //     data.schedule &&
    //     data.schedule[0] &&
    //     data.schedule[0].groups
    //   ) {
    //     const sessionId = this.route.snapshot.paramMap.get('sessionId');
    //     for (const group of data.schedule[0].groups) {
    //       if (group && group.sessions) {
    //         for (const session of group.sessions) {
    //           if (session && session.id === sessionId) {
    //             this.session = session;
    //             this.isFavorite = this.userProvider.hasFavorite(
    //               this.session.name
    //             );
    //             break;
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
  }
  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ReserveComponent,
      componentProps: {
        'sessionId': this.session.id,
        'displayName': this.session.displayName
      }
    });
    return await modal.present();
  }

  addFavoriteEvent() {
    this.localData.addFavorite(this.session);
    this.localData.getFavorite(this.session);
    this.isFavorite = true;
  }
  removeFavoriteEvent() {
    this.localData.removeFavorite(this.session.id);
    this.isFavorite = false;
  }
  isFavoriteValidator(id: string) {
    this.localData.isFavorite(id).then((arr) => {
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id === id) {
            this.isFavorite = true;
          }
        }
      }
    });
    console.log("isFavorite", this.isFavorite);
  }

}
