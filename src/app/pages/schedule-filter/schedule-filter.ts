import { AfterViewInit, Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
})
export class ScheduleFilterPage implements AfterViewInit {
  ios: boolean;

  

  public eventsTypes:{displayName: string,icon: string,objectKey: string,isChecked: boolean }[] = [
    {
      displayName: "Plenary",
      icon: "mic",
      objectKey: "plenary",
      isChecked: true
    },
    {
      displayName: "Food",
      icon: "cafe",
      objectKey: "food",
      isChecked: true
    },
    {
      displayName: "Worshop",
      icon: "build",
      objectKey: "worshop",
      isChecked: true
    },
    {
      displayName: "Other",
      icon: "build",
      objectKey: "other",
      isChecked: true
    }

  ];

  options={
    "plenary":{
      displayName: "Plenary",
      icon: "mic",     
      isChecked: true
    },
    "food":{
      displayName: "Food",
      icon: "cafe",      
      isChecked: true
    },
    "workshop":{
      displayName: "Workshop",
      icon: "build",      
      isChecked: true
    },
    "other": {
      displayName: "Other",
      icon: "build",
      isChecked: true
    }
  }
  constructor(
    public confData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;
  }

  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
    // passed in array of track names that should be excluded (unchecked)
    // const excludedTrackNames = this.navParams.get('excludedTracks');

    // this.confData.getTracks().subscribe((tracks: any[]) => {
    //   tracks.forEach(track => {
    //     this.tracks.push({
    //       name: track.name,
    //       icon: track.icon,
    //       isChecked: (excludedTrackNames.indexOf(track.name) === -1)
    //     });
    //   });
    // });
  }

  selectAll(check: boolean) {
    // // set all to checked or unchecked
    // this.tracks.forEach(track => {
    //   track.isChecked = check;
    // });
    // this.eventsTypes.forEach(eventType => {
    //   eventType.isChecked = check;
    // });
    this.options.plenary.isChecked = check;
    this.options.food.isChecked = check;
    this.options.workshop.isChecked = check;
    this.options.other.isChecked = check;

  }

  applyFilters() {
    // // Pass back a new array of track names to exclude
    // const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(this.options);
  }

  dismiss(data?: any) {
    // // using the injected ModalController this page
    // // can "dismiss" itself and pass back data
     this.modalCtrl.dismiss(data);
  }
}
