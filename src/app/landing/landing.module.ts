import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingRoutingModule } from './landing-routing.module';
import { LoginPgComponent } from './login-pg/login-pg.component';
import { RegisterComponent } from './register/register.component';
import { RegOTPComponent } from './reg-otp/reg-otp.component';


@NgModule({
  declarations: [LoginPgComponent, RegisterComponent, RegOTPComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LandingModule { }
