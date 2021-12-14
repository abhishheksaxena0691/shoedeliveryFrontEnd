import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OwlModule } from 'ngx-owl-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ShoppingAppRoutingModule } from './shoping-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [AddproductComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwlModule,
    NgSelectModule,
    FormsModule,
    ShoppingAppRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    ModalModule.forRoot()
  ]
})
export class ShopingModule { }
