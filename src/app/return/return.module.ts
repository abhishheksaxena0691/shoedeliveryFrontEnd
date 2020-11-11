import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReturnRoutingModule } from './return-routing.module';
import { ReturnPgComponent } from './return-pg/return-pg.component';


@NgModule({
  declarations: [ReturnPgComponent],
  imports: [
    CommonModule,
    ReturnRoutingModule,
    SharedModule
  ]
})
export class ReturnModule { }
