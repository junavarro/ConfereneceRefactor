import { AfterViewInit, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { LocalData } from '../../providers/localStorage';


@Component({
  selector: 'page-favorite',
  templateUrl: 'favorites.html',
  styleUrls: ['./favorites.scss'],
})
export class FavoritesPage implements AfterViewInit, OnInit {
    favoriteSessions = [];
    constructor (private localData : LocalData){

    }
    ngOnInit(){
        this.localData.getFavorites().then( (favorites)=>{
            if(favorites){
                console.log("Favorites",favorites);
                this.favoriteSessions =favorites.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (b.id > a.id) {
                        return -1;
                    }
                    return 0;
                });
            }
        });
    }
    ngAfterViewInit(){
    }
}