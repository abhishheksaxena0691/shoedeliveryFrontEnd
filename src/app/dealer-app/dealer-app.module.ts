import { MoveToCreditComponent } from './move-to-credit/move-to-credit.component';
import { DealerDeliveryPgComponent } from './dealer-delivery-pg/dealer-delivery-pg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from './../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DealerAppRoutingModule } from './dealer-app-routing.module';
import { DealerDashboadComponent} from './dealer-dashboad-component/dealer-dashboad-component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ DealerDashboadComponent, DealerDeliveryPgComponent, MoveToCreditComponent],
  imports: [
    CommonModule,
    DealerAppRoutingModule,
    SharedModule,
    OwlModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,

    ModalModule.forRoot()
  ]
})
export class DealerAppModule { }
