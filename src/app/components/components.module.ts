import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import { CollapsibleComponent} from './collapsible/collapsible.component';
import { EventQueryPipe } from '../pipes/event-query/event-query.pipe';
import { ReserveComponent } from './reserve/reserve.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        
    ],
    entryComponents: [ReserveComponent],
    declarations: [EventListComponent,CollapsibleComponent,EventQueryPipe,ReserveComponent],
    exports: [EventListComponent,CollapsibleComponent,ReserveComponent]
  })
  export class ComponentsModule {}