import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingRoutingModule } from './landing-routing.module';
import { LoginPgComponent } from './login-pg/login-pg.component';
import { RegisterComponent } from './register/register.component';
import { RegOTPComponent } from './reg-otp/reg-otp.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShopkeeperprofileComponent } from './shopkeeperprofile/shopkeeperprofile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginPgComponent, RegisterComponent, RegOTPComponent, ShopkeeperprofileComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule, ReactiveFormsModule,
    AngularEditorModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class LandingModule { }
