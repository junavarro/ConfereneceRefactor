import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { LoadingController } from '@ionic/angular';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  loading : any;
  isLoading = false;
  queryText: string;
  @Output() changeslide = new EventEmitter<any>();
  /**
   * data :{
   *  displayDate: String,
   *  groups: [
   *    time: "",
   *    sessions: []  
   *  ]
   * }
   * 
   */
  @Input() data: any;
  @Input() dayKey: any;
  @Input() searchText: any;
  @Input() filters:any;
  constructor( public confData: ConferenceData,
    public loadingController: LoadingController) {  
     
   
  }

  /**
   * Left  : 0
   * Right : 1
   * @param slideSide 
   */
  changeSlide(slideSide: number) {
    this.changeslide.emit(slideSide);
    console.log('inside element');
  }

 
  ngOnInit() {
    this.queryText ="lorem";
    console.log(this.dayKey);
    this.present();
   
    this.data = {
      "date": this.dayKey,
      "groups": [
        {
          "time": "8:00 am",
          "sessions": []
        },
        {
          "time": "9:00 am",
          "sessions": []
        },
        {
          "time": "10:00 am",
          "sessions": []
        },
        {
          "time": "11:00 am",
          "sessions": []
        },
        {
          "time": "1:00 pm",
          "sessions": []
        },
        {
          "time": "2:00 pm",
          "sessions": []
        },
        {
          "time": "3:00 pm",
          "sessions": []
        },
        {
          "time": "4:00 pm",
          "sessions": []
        }
      ]
    };
    this.confData.getEvents(this.dayKey.objectKey).then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let sessions_group = this.data.groups.find((element) => {
            //console.log(` ${element.time}  ${doc.data().timeKey} ${element.time == doc.data().timeKey} `);
            return element.time == doc.data().timeKey;
          });
          sessions_group.sessions.push({ 'doc': doc.id, ...doc.data() });
        });
       this.dismiss();
      });
  }
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss() {
    this.isLoading = false;
    //return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  checkVisible(eventType:string) {
    if(this.filters){
      if(this.filters[eventType]){
        return this.filters[eventType].isChecked
      }
      return true;
    }else {
      return true;
    }
     

  }
}
