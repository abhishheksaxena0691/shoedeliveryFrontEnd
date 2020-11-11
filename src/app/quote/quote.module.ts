import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuotePgComponent } from './quote-pg/quote-pg.component';

import { OwlModule } from 'ngx-owl-carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NewQuoteComponent } from './new-quote/new-quote.component';

@NgModule({
  declarations: [QuotePgComponent, NewQuoteComponent],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    SharedModule,
    OwlModule,
    FormsModule, ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class QuoteModule { }
