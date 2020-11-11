import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPgComponent } from './report-pg/report-pg.component';

const routes: Routes = [
  {
    path: "report",
    component: ReportPgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
