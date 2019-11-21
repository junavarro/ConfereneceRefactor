import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SponsorsPage } from './sponsors';
import { SponsorsPageRoutingModule } from './sponsors-routing.module';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      SponsorsPageRoutingModule
    ],
    declarations: [
        SponsorsPage,
    ]
  })
  export class SponsorsModule { }