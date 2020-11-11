import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../delivery.service';
import { FilterService } from '../../shared/filter.service';

export interface col3Type {
  department: string;
  price: number;
  userType: string;
};

export interface col4Type {
  brand: string;
  price: number;
  userType: string;
};

@Component({
  selector: 'app-delivery-pg',
  templateUrl: './delivery-pg.component.html',
  styleUrls: ['./delivery-pg.component.scss']
})
export class DeliveryPgComponent implements OnInit {

  filter: boolean = true;

  deliveryList: any;
  pgMsg: any;

  selectMonth: number;
  selectWeek: number = 0;
  selectSector: string;
  selectBrand: string;

  weekDataList: any;
  sectorDataList: any;

  popId: number;
  popBill: boolean = false;
  monthData: any = [];
  weekData: any = [];

  col4Data: col4Type[] = [];
  col3Data: col3Type[] = [];


  constructor(private fetch: DeliveryService, private filterSrv: FilterService) { }

  serverPath: string = this.fetch.serverPath;
  menuOptions: any = this.filterSrv.menuOptions;
  cOptions: any = this.filterSrv.cOptions;

  ngOnInit() {
    this.getDelivery();
  }

  getDelivery(): void {
    this.fetch.getAllDelivery().subscribe(
      res => {
        this.deliveryList = res;
        
        if(this.deliveryList) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthData.push(this.filterSrv.filterByBillDate(this.deliveryList, this.filterSrv.monthFilter[0], mth))
          });
        }
       },
      err => { this.pgMsg = {msg: err.error, alert: "alert-danger"} }
    );
  }

  toggleFilter(): void {
    if(this.filter)
      this.filter = false;
    else
      this.filter = true;
  }

  sltMonth(month: number): void {
    this.selectMonth = month;
  }

  sltWeek(week: number): void {
    this.selectWeek = week;
    this.deliveryList = this.weekDataList = this.weekData[week].list;
    
    this.generateFilter(this.deliveryList);
  }

  sltCustomer(customer: string): void {
    this.selectSector = customer;
    // if(this.selectSector === 'Payee')
    //   this.col4Data = this.listPayee;
    // if(this.selectSector === 'Sponsor')
    //   this.col4Data = this.listSponsor;

    this.deliveryList = this.sectorDataList = this.weekDataList.filter(e => e.billDetails.deportment.toLowerCase().includes(this.selectSector.toLowerCase()));

    this.generateBFilter(this.deliveryList);
  }

  sltBrand(brand: string): void {
    this.selectBrand = brand;
    this.deliveryList = this.sectorDataList.filter(e => e.billDetails.title.toLowerCase().includes(this.selectBrand.toLowerCase()));
  }

  generateFilter(data: any): void {
    this.selectSector = null;
    this.col3Data = [];
    this.selectBrand = null;
    this.col4Data = [];

    data.forEach(e => {
      let updateItem = this.col3Data.find(x => x.department === e.billDetails.deportment);
      if(!updateItem)
        this.col3Data.push({department: e.billDetails.deportment,price: this.cleanPrice(e.billDetails.total),userType: "department"})
      else {
        let index = this.col3Data.indexOf(updateItem);
        this.col3Data[index].price = this.col3Data[index].price + this.cleanPrice(e.billDetails.total);
      }
    });
  }

  generateBFilter(data: any): void {
    this.selectBrand = null;
    this.col4Data = [];
    data.forEach(e => {
      let updateItem = this.col4Data.find(x => x.brand === e.billDetails.title);
      if(!updateItem)
        this.col4Data.push({brand: e.billDetails.title,price: this.cleanPrice(e.billDetails.total),userType: "brand"})
      else {
        let index = this.col4Data.indexOf(updateItem);
        this.col4Data[index].price = this.col4Data[index].price + this.cleanPrice(e.billDetails.total);
      }
    });
  }

  filterMonthsWeek(month: number, data: any): void {
    this.sltMonth(month);
    this.weekData = [];
    let weekList = this.filterSrv.weekCalculator(month, this.filterSrv.today.getMonth());
    weekList.forEach(e => {
      this.weekData.push(this.filterSrv.filterByBillDate(data , e.end.getTime(), e.start.getTime()))
    });
    
    this.deliveryList = this.monthData[month].list;
    
    
    this.selectWeek = null;
    this.selectSector = null;
    this.selectBrand = null;
    this.col3Data = [];
    this.col4Data = [];
    //console.log(this.weekData);
    
  }

  cleanPrice(amount: string) {
    return this.filterSrv.cleanPrice(amount);
  }

  showBill(index: number) {
    this.popBill = !this.popBill;
    this.popId = index;
  }

}
