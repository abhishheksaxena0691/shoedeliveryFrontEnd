import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';

import { OwlModule } from 'ngx-owl-carousel';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    OwlModule,
    FormsModule, ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class DashboardModule { }
