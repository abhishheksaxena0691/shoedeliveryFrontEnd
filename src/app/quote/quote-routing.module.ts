import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotePgComponent } from './quote-pg/quote-pg.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';


const routes: Routes = [
  {
    path: "quote",
    component: QuotePgComponent
  },
  {
    path: "quote/new",
    component: NewQuoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
