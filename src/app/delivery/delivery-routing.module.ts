import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPgComponent } from './delivery-pg/delivery-pg.component';

const routes: Routes = [
  {
    path: "delivery",
    component: DeliveryPgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
