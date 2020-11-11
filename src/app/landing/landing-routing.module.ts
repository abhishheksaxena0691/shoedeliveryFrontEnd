import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPgComponent } from './login-pg/login-pg.component';
import { RegisterComponent } from './register/register.component';
import { RegOTPComponent } from './reg-otp/reg-otp.component';

const routes: Routes = [
  {
    path: "",
    component: LoginPgComponent,
    pathMatch: 'full'
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "OTP/:mobile",
    component: RegOTPComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
