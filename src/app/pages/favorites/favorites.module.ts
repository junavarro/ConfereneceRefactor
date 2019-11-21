import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritesPage } from './favorites';
import { FavoritesPageRoutingModule } from './favorites-rounting.module';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      FavoritesPageRoutingModule
    ],
    declarations: [
        FavoritesPage,
    ]
  })
  export class FavoritesModule { }