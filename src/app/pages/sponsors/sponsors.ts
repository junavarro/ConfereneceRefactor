import { AfterViewInit, Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { LocalData } from '../../providers/localStorage';
import { ConferenceData } from '../../providers/conference-data';
import { take } from 'rxjs/operators';


@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsors.html',
  styleUrls: ['./sponsors.scss'],
})
export class SponsorsPage implements AfterViewInit, OnInit {
  @ViewChild('slidesSponsor', {read: ElementRef,static: false}) sponsorSlides: ElementRef;
  sponsors = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop:true
  };
  constructor(public confData: ConferenceData) {

  }
  ngOnInit() {
    this.confData.getSponsors().pipe(take(1)).toPromise().then(
      (data) => {
        this.sponsors = data;
        this.sponsorSlides.nativeElement.startAutoplay();
      }
    );
  }
  ngAfterViewInit() {
  }
}