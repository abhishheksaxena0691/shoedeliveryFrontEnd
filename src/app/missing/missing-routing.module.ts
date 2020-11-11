import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissingPgComponent } from './missing-pg/missing-pg.component';

const routes: Routes = [
  {
    path: "missing",
    component: MissingPgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissingRoutingModule { }
