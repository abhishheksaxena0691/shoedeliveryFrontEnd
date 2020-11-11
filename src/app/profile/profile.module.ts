import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../shared/shared.module';
import { OwlModule } from 'ngx-owl-carousel';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePgComponent } from './profile-pg/profile-pg.component';


@NgModule({
  declarations: [ProfilePgComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    OwlModule,
    FormsModule, ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ]
})
export class ProfileModule { }
