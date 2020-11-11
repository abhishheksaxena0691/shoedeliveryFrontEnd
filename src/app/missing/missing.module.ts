import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MissingRoutingModule } from './missing-routing.module';
import { MissingPgComponent } from './missing-pg/missing-pg.component';


@NgModule({
  declarations: [MissingPgComponent],
  imports: [
    CommonModule,
    MissingRoutingModule,
    SharedModule
  ]
})
export class MissingModule { }
