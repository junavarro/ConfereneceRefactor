import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalData {
    constructor(private storage: Storage) {

    }
    removeFavorite(eventId:string){
        this.storage.get('favorites').then((arr) => {
            console.log("removing...");
            if (arr) {
                for( var i = 0; i < arr.length; i++){ 
                    if ( arr[i].id === eventId) {
                      arr.splice(i, 1); 
                    }
                 }
            }
            console.log('favorites updated deleted',arr);
            this.storage.set('favorites', arr);
        });
    }
    addFavorite(event: any) {
        this.storage.get('favorites').then((val) => {
            if (val) {
                val.push(event);
            } else {
                val = [event];
            }
            console.log('favorites updated add',val);
            this.storage.set('favorites', val);
        });
    };

    /**
     * 
     * @param eventId 
     */
     isFavorite(eventId:string) {
       return this.storage.get('favorites');
    }


    getFavorite(eventId) {
       
    };

    getFavorites(){
        return this.storage.get('favorites');
    }
}