import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReportRoutingModule } from './report-routing.module';
import { ReportPgComponent } from './report-pg/report-pg.component';


@NgModule({
  declarations: [ReportPgComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
