import { AuthGuard } from './../guard/auth.guard';
import { MoveToCreditComponent } from './move-to-credit/move-to-credit.component';
import { DealerDeliveryPgComponent } from './dealer-delivery-pg/dealer-delivery-pg.component';

import { DealerDashboadComponent } from './dealer-dashboad-component/dealer-dashboad-component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "dealer/dashboard",
    component: DealerDashboadComponent
  },
  {
    path: "dealer/delivery",
    component: DealerDeliveryPgComponent
  },
  {
    path: "dealer/moveToCredit",
    component: MoveToCreditComponent
  },
  {
    path: "/profile",
    loadChildren: ()=>import('../profile/profile.module').then(m=>m.ProfileModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerAppRoutingModule { }
