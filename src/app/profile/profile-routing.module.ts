import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePgComponent } from './profile-pg/profile-pg.component';

const routes: Routes = [
  {
    path: "profile",
    component: ProfilePgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
