import { DeliveryService } from './../../delivery/delivery.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterService } from '../../shared/filter.service';
import { DashboardService } from '../../dashboard/dashboard.service';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { from } from 'rxjs';

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
  selector: 'app-dealer-delivery-pg',
  templateUrl: './dealer-delivery-pg.component.html',
  styleUrls: ['./dealer-delivery-pg.component.scss']
})
export class DealerDeliveryPgComponent implements OnInit {
  modalRef: BsModalRef;
  paid: boolean = true;
  invoicStatus: FormGroup;
  dSubmit: boolean = false;
  dBtm: boolean = false;

  dMsg: any;

  popId: number;
  popBill: boolean = false;
  pgMsg: any;
  filter: boolean = true;
  billData: any;
  billDData: any;
  currentMonth: number = 0;
  twoMonth: number = 0;
  threeMonth: number = 0;
  sixMonth: number = 0;
  ninthMonth: number = 0;
  weekDataList: any;
  sectorDataList: any;

  profInfo: any;

  billId: any;
  spMsg: any;

  selectArea: string;
  selectMonth: number;
  selectWeek: number = 0;
  selectSector: string;
  selectBrand: string;

  monthData: any = [];
  weekData: any = [];

  listSponsor: col4Type[] = [];
  listPayee: col4Type[] = [];

  sponsor: any;
  payee: any;

  upBill: any;
  spBill: any;
  pyBill: any;

  monthDataDh: any = [];
  monthDataSp: any = [];
  monthDataPy: any = [];
  monthDataUp: any = [];

  spTotal: number = 0;
  pyTotal: number = 0;
  dashTotal: number = 0;
  upTotal: number = 0;

  col4Data: col4Type[] = [];
  col3Data: col3Type[] = [];
  productList = [];
  productChange = new Subject<string>();
  loadingProduct: boolean = false;
  selectedProduct:any = [];
  cash: any = 0;
  netBanking: any = 0;
  card: any = 0;
  upi: any = 0;
  other: any = 0;
  daysData: any[];
  public dataResult: any = [];
  public currentActiveTopTab: any = "";
  allData: any;
  paymentForm: FormGroup;
  msg: string;
  movetocredit: FormGroup;
  dMsg1: boolean;
  updateStatusValue: any = "";
  upiPaymmentArray: any = [];
  selectedDay: any;
  constructor(private formBuilder: FormBuilder, private fetch: DashboardService, private modalService: BsModalService, private filterSrv: FilterService, public deliveryService: DeliveryService) {
    this.productChange
    .pipe(debounceTime(900), distinctUntilChanged())
    .subscribe((value) => {
      console.log(value);
      this.productList = [];
      this.loadingProduct = true;
      this.fetch.getProductList({"name":value}).subscribe(
        (data: any) => {
          console.log(data);
          this.loadingProduct = false;
          this.productList = data;


        },
        (err) => {

        }
      );
    });
  }

  serverPath: string = this.fetch.serverPath;

  menuOptions: any = this.filterSrv.menuOptions;
  cOptions: any = this.filterSrv.cOptions;

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      billId: ['', Validators.required],
      payMode: ['', Validators.required]
    })
    this.invoicStatus = this.formBuilder.group({
      billId: ['', Validators.required],
      status: ['', Validators.required]
    })


    this.getMonthData();
    this.getProfileInfo();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openInvoiceStatus(template: TemplateRef<any>, billId: any) {
    this.updateStatusValue = "";
    console.log(this.billDData);
    const f = this.billDData.filter((data: any) => data._id == billId);
    console.log(f);
        if (f.length) {
      this.updateStatusValue = f[0].invoiceStatus;
      console.log(this.updateStatusValue);
    }
    this.modalRef = this.modalService.show(template);
    console.log(this.profInfo);
    this.invoicStatus.patchValue({
      billId: billId,
    });

  }




  toggleFilter(): void {
    this.filter = !this.filter;
  }

  sltArea(area: string): void {

    this.billDData = [];
    this.weekData = [];
    this.monthData = [];
    this.daysData = [];
    this.selectArea = area;
    this.selectWeek = null;
    this.selectSector = null;
    this.selectBrand = null;
    this.weekData = null;
    this.col3Data = [];
      this.col4Data = [];
      this.currentActiveTopTab = area;
      this.monthDataDh =[];


      this.filterSrv.monthFilter.forEach(mth => {
        this.monthDataDh.push(this.filterSrv.filterByDateCash(this.dataResult[area], new Date().getTime(), mth))
      });

      this.monthData =[];
      this.monthData = this.monthDataDh;
      this.billDData =  this.monthData[0].list;
      // for (var i = 0; i < this.monthData.length; i++) {
      //   this.billDData =  this.billDData.concat(this.monthData[i].list);
      //   }
        console.log(this.billDData);
  }

  sltMonth(month: number): void {
    this.selectMonth = month - 1;
  }

  sltWeek(week: number): void {
    this.selectWeek = week;
    console.log(this.weekData[week].list);
    if(this.selectArea === 'Dashboard' || this.selectArea === 'Uploaded') {
      this.billData = this.weekDataList = this.weekData[week].list;
      this.generateFilter(this.billData);
    } else {
      this.billDData = this.weekDataList = this.weekData[week].list;
      this.generateFilter(this.billDData);
    }
  }


  getProfileInfo():void {
    this.fetch.getProfInfo().subscribe(
      res => { this.profInfo = res; },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    )
  }
  groupedData:any = [];
  getMonthData(): void {
    this.monthData = [];
    this.billDData = [];

    this.deliveryService.getAllDelivery()
    .subscribe(
      res => {
         let data: any =  res;
          this.paid = true;

         this.allData = data;
         this.billDData = this.allData;
         console.log(this.allData);
         data = data.filter((d:any) => d.paymentMode !== "" && d.category == "delivery");
         this.billDData = data;
        const result = data.reduce(function (r, a) {

              r[a.paymentMode] = r[a.paymentMode] || [];
              r[a.paymentMode].push(a);
              return r;

      }, Object.create(null));
      this.dataResult = result;
      console.log(this.dataResult);
      //this.billDData = this.dataResult.map((data: any))
      if (result !== undefined) {
            if (result['cash'] !== undefined) {
              this.cash = result['cash'].reduce((accumulator, currentValue) =>{
                const v: any = this.cleanPrice(currentValue.billDetails.total);

                return accumulator + parseInt(v);
            }, 0)
            }
            if (result['Net Banking'] !== undefined) {
            this.netBanking = result['Net Banking'].reduce((accumulator, currentValue) =>{
              const v: any = this.cleanPrice(currentValue.billDetails.total);

              return accumulator + parseInt(v);
            }, 0)
          }
            if (result['card'] !== undefined) {
                this.card = result['card'].reduce((accumulator, currentValue) =>{
                const v: any = this.cleanPrice(currentValue.billDetails.total);

                  return accumulator + parseInt(v);
                }, 0)
            }
            if (result['upi'] !== undefined) {
            this.upi = result['upi'].reduce((accumulator, currentValue) =>{
              const v: any = this.cleanPrice(currentValue.billDetails.total);

              return accumulator + parseInt(v);
            }, 0)
          }

            if (result['other'] !== undefined) {
              this.other = result['other'].reduce((accumulator, currentValue) =>{

                const v: any = this.cleanPrice(currentValue.billDetails.total);

                return accumulator + parseInt(v);
              }, 0)
            }
          }
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
  }

  unpaid() {
    this.paid = false;
    this.filter= true;
    this.billDData = [];
    this.weekData = [];
    this.daysData = [];
    this.upiPaymmentArray = [];
    // this.filterSrv.monthFilter.forEach(mth => {
    //   this.monthDataDh.push(this.filterSrv.filterByDateCash(this.allData, this.filterSrv.monthFilter[0], mth))
    // });
    console.log(this.allData);
    this.allData = this.allData.filter((data: any) => data.payStatus === false && data.category === 'delivery');
    console.log(this.allData);
    this.billDData = this.allData;
    this.monthDataDh = [];
    this.filterSrv.monthFilter.forEach(mth => {
      this.monthDataDh.push(this.filterSrv.filterByDateCash(this.allData, new Date().getTime(), mth))
    });
    console.log(this.monthDataDh);
    this.monthData =[];
    this.monthData = this.monthDataDh;
    // for (var i = 0; i < this.monthData.length; i++) {
    //   this.billDData =  this.billDData.concat(this.monthData[i].list);
    //   }
    console.log(this.billDData);
  }

  filterMonthsWeek(month: number, index: any, data: any): void {

    this.sltMonth(month);
    this.weekData = [];
    this.billData = [];
    let weekList = this.filterSrv.getWeeksStartAndEndInMonth(month, this.filterSrv.today.getMonth());
    console.log(weekList);
    // console.log(this.selectArea);
  //  console.log(this.monthDataDh);
  let filterData = []
    if (this.paid) {
      filterData = this.dataResult[this.currentActiveTopTab];
    } else {
      filterData = this.allData;
    }
      weekList.forEach(e => {
        this.weekData.push(this.filterSrv.filterByBillDatecash(filterData , e.end.getTime(),  e.start.getTime()))
      });
      console.log(this.weekData);
      this.billDData = this.monthData[index].list;
      // const setRange = [(month -1)*4, (((month -1)*4) + 4) ];

      // console.log(this.weekData);
      // let d = [];
      // for (let i=0; i < this.weekData.length; i++) {
      //   if (i>= setRange[0] && i<= setRange[1]) {
      //     d.push(this.weekData[i])
      //   }
      // }

      // this.weekData = d;


    console.log(this.billDData);

    this.selectWeek = null;
    this.selectSector = null;
    this.selectBrand = null;
    this.col3Data = [];
    this.col4Data = [];
    //console.log(this.weekData);

  }


  filterDays(month: number,  data: any): void {

    this.daysData = [];
    //console.log(data);
   // this.billDData = this.weekData[month].list;
    let daysList = this.filterSrv.getDaysStartAndEndInMonth(month, this.filterSrv.today.getMonth());
     console.log(daysList);
    // console.log(this.selectArea);

      daysList.forEach(e => {
        this.daysData.push(this.filterSrv.filterByBillDatecash(data , e.end.getTime(), e.start.getTime()))
      });
     this.billDData = this.weekData[month -1].list;


     const setRange = [(month -1)*7, (((month -1)*7) + 7) ];

     console.log(this.weekData);
     let d = [];
     for (let i=0; i < this.daysData.length; i++) {
       if (i>= setRange[0] && i<= setRange[1]) {
         d.push(this.daysData[i])
       }
     }

     this.daysData = d;
     console.log(this.daysData);
    this.selectWeek = month -1;
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


  generateFilter(data: any): void {
    this.selectSector = null;
    this.col3Data = [];
    this.selectBrand = null;
    this.col4Data = [];
    console.log(data);
    if(this.selectArea === 'Dashboard' || this.selectArea === 'Uploaded') {
      data.forEach(e => {
        let updateItem = this.col3Data.find(x => x.department === e.deportment);
        if(!updateItem)
          this.col3Data.push({department: e.deportment,price: this.cleanPrice(e.total),userType: "department"})
        else {
          let index = this.col3Data.indexOf(updateItem);
          this.col3Data[index].price = this.col3Data[index].price + this.cleanPrice(e.total);
        }
      });
    } else {
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
  }

  generateBFilter(data: any): void {
    this.selectBrand = null;
    this.col4Data = [];
    console.log(this.selectArea);
    if(this.selectArea === 'Dashboard' || this.selectArea === 'Uploaded') {
      data.forEach(e => {
        let updateItem = this.col4Data.find(x => x.brand === e.title);
        if(!updateItem)
          this.col4Data.push({brand: e.title,price: this.cleanPrice(e.total),userType: "brand"})
        else {
          let index = this.col4Data.indexOf(updateItem);
          this.col4Data[index].price = this.col4Data[index].price + this.cleanPrice(e.total);
        }
      });
    } else {
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
  }

  updateInvoiceStatus () {
    this.dBtm = true;
    this.fetch.updateInvoiceStatus(this.invoicStatus.value).subscribe(
      res => {
        this.dMsg1 = true;
        this.dMsg = {msg: res, alert: 'alert-success'};

        this.dBtm = false;
        for (let i=0; i < this.billDData.length; i++) {
          if (this.billDData[i]._id == this.invoicStatus.value.billId) {
            this.billDData[i].invoiceStatus = this.invoicStatus.value.status;
          }
        }

        setTimeout(() => {
          this.dMsg = null;
          this.msg = "";
          this.modalRef.hide();
      },2000);
      },
      err => {
        this.dBtm = false;
        this.dMsg = {msg: err.error, alert: 'alert-danger'};
      }
    )
  }




  openUpdatepayment(template: TemplateRef<any>, billId: any) {

    this.modalRef = this.modalService.show(template);
    this.paymentForm.patchValue({
      billId: billId,
    });
  }

  updatePayment1(): void {

    console.log("hello");
     this.deliveryService.updatepaymentMode(this.paymentForm.value)
    .subscribe((data) => {
      this.paymentForm.reset();
      this.dMsg = true;
      this.msg= "Payment approved successfully!";
      this.getMonthData();
      console.log(data);
      setTimeout(() => {
        this.dMsg = null;
        this.msg = "";
        this.getMonthData();
        this.modalRef.hide();
    },3500);
    },
    err => {
      console.log("hello");
    })

  }

  upiPaymentData (index,data: any) {
    console.log(data);
    this.billDData = this.daysData[index].list;
     this.selectedDay = index;
    const gpayData = data.list.filter((d: any) => d.upiType === 'gpay');
    const payTmData = data.list.filter((d: any) => d.upiType === 'payTm');
    const phonePay = data.list.filter((d: any) => d.upiType === 'phonePay');
    let gpay = 0;
     gpay = gpayData.reduce((accumulator, currentValue) =>{
      const v: any = this.cleanPrice(currentValue.billDetails.total);

      return accumulator + parseInt(v);
    }, 0);
    let ptpay = 0;
    ptpay = payTmData.reduce((accumulator, currentValue) =>{
      const v: any = this.cleanPrice(currentValue.billDetails.total);

      return accumulator + parseInt(v);
    }, 0)
    let phpay = 0;
    phpay = phonePay.reduce((accumulator, currentValue) =>{
      const v: any = this.cleanPrice(currentValue.billDetails.total);

      return accumulator + parseInt(v);
    }, 0)
    this.upiPaymmentArray.push(gpay);
    this.upiPaymmentArray.push(ptpay);
    this.upiPaymmentArray.push(phpay);
  }
}
