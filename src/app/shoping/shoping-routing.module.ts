import { AuthGuard } from './../guard/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';


const routes: Routes = [
  {
    path: "shoping/addshoping",
    component: AddproductComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingAppRoutingModule { }


