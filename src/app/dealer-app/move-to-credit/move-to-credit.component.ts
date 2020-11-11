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
  selector: 'app-move-to-credit',
  templateUrl: './move-to-credit.component.html',
  styleUrls: ['./move-to-credit.component.scss']
})
export class MoveToCreditComponent {
  modalRef: BsModalRef;
  paid: boolean = true;
  deliveryFrm: FormGroup;
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
    this.deliveryFrm = this.formBuilder.group({
      billId: ['', Validators.required],
      address: ['', Validators.required],
      payMode: ['', Validators.required]
    })
    this.movetocredit =  this.formBuilder.group({
      billId: ['', Validators.required]
    });

    this.getMonthData();
    this.getProfileInfo();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDelivery(template: TemplateRef<any>, billId: any) {
    this.modalRef = this.modalService.show(template);
    console.log(this.profInfo);
    this.deliveryFrm.patchValue({
      billId: billId,
    });
    console.log(this.deliveryFrm);
  }

  openMoveTocredit(template: TemplateRef<any>, billId: any) {
    this.modalRef = this.modalService.show(template);
    console.log(this.profInfo);
    this.movetocredit.patchValue({
      billId: billId,
    });
  }

  openSponsor(template: TemplateRef<any>, billId: any) {
    this.modalRef = this.modalService.show(template);
    this.billId = billId;
  }

  toggleFilter(): void {
    this.filter = !this.filter;
  }

  sltArea(area: string): void {

    this.billDData = [];

    this.selectArea = area;
    this.selectWeek = null;
    this.selectSector = null;
    this.selectBrand = null;
    this.weekData = null;
    this.col3Data = [];
      this.col4Data = [];
      this.currentActiveTopTab = area;
      this.monthDataDh =[];
      console.log(this.filterSrv.monthFilter);

      this.filterSrv.monthFilter.forEach(mth => {
        this.monthDataDh.push(this.filterSrv.filterByDateCash(this.dataResult[area], new Date().getTime(), mth))
      });
      console.log(this.monthDataDh);
      this.monthData =[];
      this.monthData = this.monthDataDh;
      for (var i = 0; i < this.monthData.length; i++) {
        this.billDData =  this.billDData.concat(this.monthData[i].list);
        }
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
        console.log(data);
         this.allData = data.filter((d: any) => d.paymentMode !== "" && d.category === 'credit');
         this.billDData = this.allData;
        this.unpaid();

      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
  }

  unpaid() {
    this.paid = false;
    this.filter= true;
  //  this.billDData = [];

    // this.filterSrv.monthFilter.forEach(mth => {
    //   this.monthDataDh.push(this.filterSrv.filterByDateCash(this.allData, this.filterSrv.monthFilter[0], mth))
    // });
    console.log(this.allData);
    //this.allData = this.allData.filter((data: any) => data.payStatus === false);
    console.log(this.allData);
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
   // console.log(month);
    this.sltMonth(month);
    this.daysData = [];
    this.selectWeek = month -1;
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
    // console.log(this.weekData);

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



  get dFrm() { return this.deliveryFrm.controls; }



  searchProductName(event: any) {
    if (event.target.value.length > 2) {
      this.loadingProduct = true;
      this.productChange.next(event.target.value);
    }
  }

  NewDealerBill () {

    this.selectedProduct.forEach((data, index) => {
      if (this.selectedProduct[index].quantity == undefined) {
        this.selectedProduct[index]["quantity"] = 1;
      }
    });

    this.fetch.createNewInvoice({"selectedProducts": this.selectedProduct}).subscribe(
      res => {
        this.dMsg = {msg: res, alert: 'alert-success'};
        this.selectedProduct = [];
        this.dBtm = false;

        setTimeout(() => {
          console.log(res);
          this.deliveryService.generateImageNewInvoice(res).subscribe(() => {})
          this.modalRef.hide();
        }, 2800);
      },
      err => {
        this.dBtm = false;
        this.dMsg = {msg: err.error, alert: 'alert-danger'};
      }
    )
  }
  setQuantity(val: any, index: number) {
    this.selectedProduct[index]['quantity'] = parseInt(val);
    console.log(this.selectedProduct);
  }

  addDelivery () {
    this.dBtm = false;
      let requestData = this.deliveryFrm.value;
      requestData['category'] = 'delivery';
      console.log(requestData);

      this.deliveryService.moveToDelivery(requestData).subscribe(
        res => {
          this.dMsg = {msg: 'Updated Successfully', alert: 'alert-success'};

          this.dBtm = true;

          setTimeout(() => {
            this.dBtm = false;
            this.modalRef.hide();
          }, 2800);
        },
        err => {
          this.dBtm = true;
          this.dMsg = {msg: err.error, alert: 'alert-danger'};
        }
      )
  }

  moveToCredit1 () {

    this.dBtm = false;
    let requestData = this.movetocredit.value;
    requestData['category'] = 'credit';
    requestData['payStatus'] = false;
    console.log(requestData);
    this.fetch.updateCreditInvoice(requestData).subscribe(
      res => {
        this.dMsg = {msg: 'Updated Successfully', alert: 'alert-success'};

        this.dBtm = true;

        setTimeout(() => {
          this.dBtm = false;
          this.modalRef.hide();
        }, 2800);
      },
      err => {
        this.dBtm = true;
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
  updatePayment(): void {

    console.log("hello");
     this.deliveryService.updatepaymentMode(this.paymentForm.value)
    .subscribe((data) => {
      this.paymentForm.reset();
      this.dMsg = true;
      this.msg= "Payment approved successfully!"
      console.log(data);
      setTimeout(() => {
        this.dMsg = null;
        this.msg = "";
        this.modalRef.hide();
    },3500);
    },
    err => {
      console.log("hello");
    })

  }


}
