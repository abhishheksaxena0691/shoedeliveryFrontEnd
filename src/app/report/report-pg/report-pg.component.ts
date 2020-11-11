import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-pg',
  templateUrl: './report-pg.component.html',
  styleUrls: ['./report-pg.component.scss']
})
export class ReportPgComponent implements OnInit {

  filter: boolean = true;
  lineSec: boolean = true;
  pieSec: boolean = false;
  purchaseSec: boolean = false;
  priceSec: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleFilter(): void {
    if(this.filter)
      this.filter = false;
    else
      this.filter = true;
  }


  toggleLine(): void {
    if(this.lineSec)
      this.lineSec = false;
    else
      this.lineSec = true;
  }


  togglePie(): void {
    if(this.pieSec)
      this.pieSec = false;
    else
      this.pieSec = true;
  }

  togglePurchase(): void {
    if(this.purchaseSec)
      this.purchaseSec = false;
    else
      this.purchaseSec = true;
  }

  togglePrice(): void {
    if(this.priceSec)
      this.priceSec = false;
    else
      this.priceSec = true;
  }

}
