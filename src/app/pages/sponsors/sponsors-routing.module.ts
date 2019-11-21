import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorsPage } from './sponsors';

const routes: Routes = [
    {
      path: '',
      component: SponsorsPage
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SponsorsPageRoutingModule { }