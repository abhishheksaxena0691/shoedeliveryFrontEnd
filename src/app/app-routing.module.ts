import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: "",
    loadChildren: ()=>import('./landing/landing.module').then(m=> m.LandingModule)
  },
  {
    path: "",
    loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./report/report.module').then(m=>m.ReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./return/return.module').then(m=>m.ReturnModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./delivery/delivery.module').then(m=>m.DeliveryModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./missing/missing.module').then(m=>m.MissingModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./profile/profile.module').then(m=>m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./quote/quote.module').then(m=>m.QuoteModule),
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: ()=>import('./dealer-app/dealer-app.module').then(m=>m.DealerAppModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
