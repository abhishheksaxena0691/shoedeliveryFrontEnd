import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OwlModule } from 'ngx-owl-carousel';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryPgComponent } from './delivery-pg/delivery-pg.component';


@NgModule({
  declarations: [DeliveryPgComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule,
    OwlModule,
  ]
})
export class DeliveryModule { }
