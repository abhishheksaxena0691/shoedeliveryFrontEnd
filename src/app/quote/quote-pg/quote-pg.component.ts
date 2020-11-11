import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';
import { FilterService } from 'src/app/shared/filter.service';

export interface col3Type {
  department: string;
  price: number;
  userType: string;
};

@Component({
  selector: 'app-quote-pg',
  templateUrl: './quote-pg.component.html',
  styleUrls: ['./quote-pg.component.scss']
})
export class QuotePgComponent implements OnInit {

  filter: boolean = true;
  q1: boolean = true;
  q2: boolean = false;
  pgMsg: any;
  qList: any;

  selectMonth: number;
  selectWeek: number = 0;
  selectSector: string;

  weekDataList: any;
  sectorDataList: any;

  monthData: any = [];
  weekData: any = [];

  col3Data: col3Type[] = [];

  constructor(private fetch: QuoteService, private filterSrv: FilterService) { }

  ngOnInit() {
    this.getQuotes();
  }

  toggleFilter(): void {
    this.filter = !this.filter;
  }

  toggleQ1(): void {
    if(this.q1)
      this.q1 = false;
    else
      this.q1 = true;
  }

  toggleQ2(): void {
    if(this.q2)
      this.q2 = false;
    else
      this.q2 = true;
  }

  getQuotes(): void {
    this.fetch.getQuote().subscribe(
      res => {
        this.qList = res; console.log(this.qList);
        if(this.qList) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthData.push(this.filterSrv.filterByDate(this.qList, this.filterSrv.monthFilter[0], mth))
          });
        }
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    )
  }

}
