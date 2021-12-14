import { AuthService } from './../../guard/auth.service';

import { DeliveryService } from './../../delivery/delivery.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterService } from '../../shared/filter.service';
import { DashboardService } from '../../dashboard/dashboard.service';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  selector: 'app-dealer-dashboad',
  templateUrl: './dealer-dashboad-component.html',
  styleUrls: ['./dealer-dashboad-component.scss']
})

export class DealerDashboadComponent implements OnInit {
  @ViewChild('closeBtn', {static: false}) closeBtn :ElementRef;
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
  upiPaymmentArray: any = [];
  selectedDay:any = '';
  paymentModeForCredit: any;
  totalPrice: any = 0;
  newBill: boolean;
  setMobile: any;
  delearDetail: any;
  screenFirst = true;
  screenSecond = false;
  verificationDone: boolean = false;
  companyName: string;
  constructor(private formBuilder: FormBuilder, private fetch: DashboardService, private modalService: BsModalService, private filterSrv: FilterService, public deliveryService: DeliveryService, public authService: AuthService) {
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

    this.getMonthData(true);
    this.getProfileInfo();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.companyName = this.authService.getCompanyName();
    this.screenFirst = true;
    this.screenSecond = false;
    this.verificationDone = false;
  }

  openDelivery(template: TemplateRef<any>, billId: any, paymentType: any) {
    this.paymentModeForCredit = paymentType;
    this.modalRef = this.modalService.show(template);
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
    console.log(this.movetocredit.value);
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
    this.monthData = [];
    this.selectArea = area;
    this.selectSector = null;
    this.selectBrand = null;
    this.weekData = null;
    this.col3Data = [];
    this.col4Data = [];
    this.currentActiveTopTab = area;
    this.monthDataDh =[];

    if (this.dataResult[area] !== undefined) {
      this.filterSrv.monthFilter.forEach(mth => {
        this.monthDataDh.push(this.filterSrv.filterByDateCash(this.dataResult[area], new Date().getTime(), mth))
      });
    }
    this.monthData =[];
    this.weekData = [];
    this.daysData = [];
    this.upiPaymmentArray = [];
    this.monthData = this.monthDataDh;
    if (this.dataResult[area] !== undefined) {
      this.billDData =  this.monthData[0].list;
    }

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
    this.fetch.getProfInfo(this.authService.getLogged()).subscribe(
      res => { this.profInfo = res; },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    )
  }
  groupedData:any = [];
  getMonthData(sectionType): void {
    this.billDData = [];
    this.weekData = [];
    this.daysData = [];
    this.monthData = [];
    //this.fetch.getAllBill(this.filterSrv.lastNine.getMonth() + 1, this.filterSrv.lastNine.getFullYear())
    this.deliveryService.getAllDelivery()
    .subscribe(
      res => {
         let data: any =  res;
         this.paid = sectionType;
         this.allData = data;
         //this.billDData = this.allData;
         data = data.filter((d:any) => d.paymentMode !== "");
         this.billDData = data;
         console.log(data);
        const result = data.reduce(function (r, a) {

              r[a.paymentMode] = r[a.paymentMode] || [];
              r[a.paymentMode].push(a);
              return r;

      }, Object.create(null));
      this.dataResult = result;
      console.log(this.dataResult);
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
          console.log(this.paid);
          if (!this.paid) {
            setTimeout(() => {
              this.closeBtn.nativeElement.click();
            },2000);
          }
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
  }

  unpaid() {
    console.log(this.allData);
    this.monthData =[];
    this.filter= true;
    this.billDData = [];
    this.weekData = [];
    this.daysData = [];
    this.monthData = [];
    this.upiPaymmentArray = [];
    this.allData = this.allData.filter((data: any) => data.payStatus === false);
    this.billDData = this.allData;
    this.monthDataDh = [];
    this.filterSrv.monthFilter.map(mth => {
      this.monthDataDh.push(this.filterSrv.filterByDateCash(this.allData, new Date().getTime(), mth))
    });


    this.monthData = this.monthDataDh;
    console.log(this.monthData);
    // for (var i = 0; i < this.monthData.length; i++) {
    //   this.billDData =  this.billDData.concat(this.monthData[i].list);
    //   }
    console.log(this.billDData);
    this.paid = false;
  }

  filterMonthsWeek(month: number, index: any, data: any): void {

    this.sltMonth(month);
    this.weekData = [];
    this.billData = [];
    this.daysData = [];
    let weekList = this.filterSrv.getWeeksStartAndEndInMonth(month, this.filterSrv.today.getMonth());
    let filterData = []
    if (this.paid) {
      filterData = this.dataResult[this.currentActiveTopTab];
    } else {
      filterData = this.allData;
    }
    weekList.forEach(e => {
      this.weekData.push(this.filterSrv.filterByBillDatecash(filterData , e.end.getTime(),  e.start.getTime()))
    });

    this.billDData = this.monthData[index].list;

    this.selectSector = null;
    this.selectBrand = null;
    this.col3Data = [];
    this.col4Data = [];


  }


  filterDays(month: number,  data: any): void {

    this.daysData = [];

    let daysList = this.filterSrv.getDaysStartAndEndInMonth(month, this.filterSrv.today.getMonth());
    daysList.forEach(e => {
      this.daysData.push(this.filterSrv.filterByBillDatecash(data , e.end.getTime(), e.start.getTime()))
    });
     this.billDData = this.weekData[month -1].list;
     const setRange = [(month -1)*7, (((month -1)*7) + 7) ];
     let d = [];
     for (let i=0; i < this.daysData.length; i++) {
       if (i>= setRange[0] && i<= setRange[1]) {
         d.push(this.daysData[i])
       }
     }

    this.daysData = d;
    this.selectWeek = month -1;
    this.selectSector = null;
    this.selectBrand = null;
    this.col3Data = [];
    this.col4Data = [];
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
  setMobileNumber(val) {
    this.setMobile = val;
  }

  verifyMobile() {

      this.dMsg = {msg: "Please wait verifying mobile number.", alert: 'alert-success'};
      this.fetch.verifyRetailerMobileNumber({regMobile: this.setMobile}).subscribe((data: any) => {
        if (data ==null) {
          this.delearDetail = data;
        } else {
          this.delearDetail = data;
          // this.screenFirst = false;
          // this.screenSecond = true;
        }
        this.verificationDone = true;
        this.dMsg = {};
        console.log(data);
      })

  }
  moveToSecondScreen () {
      this.screenFirst = false;
      this.screenSecond = true;
  }
  NewDealerBill () {
    this.newBill = true;

    this.selectedProduct.forEach((data, index) => {
      if (this.selectedProduct[index].quantity == undefined) {
        this.selectedProduct[index]["quantity"] = 1;
      }
    });

    this.fetch.createNewInvoice({"selectedProducts": this.selectedProduct, "company": this.authService.getCompanyName(), "type": "dashboard"}).subscribe(
      res => {
        this.dMsg = {msg: "Bill created successfully.", alert: 'alert-success'};
        this.selectedProduct = [];
        this.dBtm = false;
        this.paid = false;
        res["mobilenumber"] = this.setMobile;
        res['domain'] = this.authService.getDomainName();
        res['companyName'] = this.authService.getCompanyName();
        res['type'] = 'shop';

        setTimeout(() => {
          this.dMsg = {};
          this.deliveryService.generateImageNewInvoice(res).subscribe(() => { this.getMonthData(false); })
          this.paid = false;

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
    this.totalPrice = 0
    if (this.selectedProduct[index] !== undefined) {
     this.selectedProduct[index]['quantity'] = parseInt(val);
    }

    this.selectedProduct.map((data) => {
      console.log(data.price);
      console.log(data.quantity);
      this.totalPrice += (parseInt(data.price) * parseInt(data.quantity !== undefined ? data.quantity : 1));
    })
  }

  addDelivery () {
    this.dBtm = false;
      let requestData = this.deliveryFrm.value;
      requestData['category'] = 'delivery';
      requestData['payStatus'] = false;
      if (this.paid) {
        requestData['payMode'] = this.paymentModeForCredit;
        requestData['payStatus'] = true;
      } else {
        requestData['payMode'] = this.deliveryFrm.value.payMode;
        if (this.deliveryFrm.value.payMode !== "") {

          requestData['payStatus'] = true;
        } else {
          requestData['payStatus'] = false;
        }
      }

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
  updatePayment1(): void {

    console.log("hello");
     this.deliveryService.updatepaymentMode(this.paymentForm.value)
    .subscribe((data) => {
      this.paymentForm.reset();
      this.dMsg = true;
      this.msg= "Payment approved successfully!"
      console.log(data);
      setTimeout(() => {
        this.getMonthData(true);
        this.dMsg = null;
        this.msg = "";
        this.modalRef.hide();
    },3500);
    },
    err => {
      console.log("hello");
    })
  }

  upiPaymentData (index, data: any) {
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
