import { Component, OnInit, TemplateRef } from '@angular/core';
import { FilterService } from 'src/app/shared/filter.service';
import { QuoteService } from '../quote.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.scss']
})
export class NewQuoteComponent implements OnInit {
  modalRef: BsModalRef;

  categories: any;
  products: any;
  pgMsg: any;
  aQMsg: any;
  total: number = 0;
  cartList: any = [];
  factory: string = "";

  constructor(private fetch: QuoteService, private modalService: BsModalService, private filterSrv: FilterService, private router: Router) { }

  menuOptions: any = this.filterSrv.menuOptions;
  cOptions: any = this.filterSrv.cOptions;

  ngOnInit() {
    this.menuOptions.margin = 20;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCategories(e) {
    this.categories = null;
    this.products = null;
    this.fetch.getCategory(e.target.value).subscribe(
      res => { this.categories = res; },
      err => { this.pgMsg = {msg: err.error, alert: "alter-danger"} }
    )
  }

  getProducts(type: string, category: string) {
    this.fetch.getProduct(type, category).subscribe(
      res => { this.products = res; },
      err => { this.pgMsg = {msg: err.error, alert: "alter-danger"} }
    )
  }

  setCart(data: any): void {
    let updateItem = this.cartList.find(x => x._id === data._id);
    if(updateItem == undefined)
      this.cartList.push({_id: data._id, description: data.description, category: data.category, name: data.name, price: data.price, type: data.type, qty: 1, url: data.url });
    else {
      let index = this.cartList.indexOf(updateItem);
      this.cartList[index].qty += 1;
    }

    this.countTotal();
  }

  rmvCart(index): void {
    this.cartList.splice(index, 1);
    this.countTotal();
  }

  countTotal(): void {
    this.total = 0;
    this.cartList.forEach(el => {
      this.total += (+el.price * el.qty);
    });
  }

  submitQuote(): void {
    this.fetch.addQuote({factory: this.factory, products: this.cartList, total: this.total}).subscribe(
      res => {
        this.aQMsg = {msg: res, alert: "alter-danger"}
        setTimeout(() => {
          this.router.navigate(['/quote']);
          this.modalRef.hide();
          this.cartList = [];
          this.aQMsg = null;
        },3500); 
      },
      err => { this.aQMsg = {msg: err.error, alert: "alter-danger"} }
    )
  }

}
