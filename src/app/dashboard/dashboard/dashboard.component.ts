import { Component, OnInit,TemplateRef } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef;

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

  constructor(private formBuilder: FormBuilder, private fetch: DashboardService, private modalService: BsModalService, private filterSrv: FilterService) { }

  serverPath: string = this.fetch.serverPath;

  menuOptions: any = this.filterSrv.menuOptions;
  cOptions: any = this.filterSrv.cOptions;

  ngOnInit() {
    this.deliveryFrm = this.formBuilder.group({
      billId: ['', Validators.required],
      address: ['', Validators.required],
      payMode: ['Net Banking', Validators.required]
    })

    this.getMonthData();
    this.getSponsor();
    this.getPayee();
    this.getProfileInfo();
    this.getSpBill();
    this.getPyBill();
    this.getUpBill();
  }

  getUpBill() {
    return this.fetch.getUploadBill().subscribe(
      res => {
        this.upBill = res;
        if(this.upBill) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthDataUp.push(this.filterSrv.filterByDate(this.upBill, this.filterSrv.monthFilter[0], mth))
          });

          this.upBill.forEach(el => {
            this.upTotal += +el.total;
          });
          //this.upTotal = this.filterSrv.cleanPrice(this.upTotal.toString());
        }
       },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    )
  }

  getSpBill() {
    return this.fetch.getSponsorBill().subscribe(
      res => {
        this.spBill = res;
        if(this.spBill) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthDataSp.push(this.filterSrv.filterByBillDate(this.spBill, this.filterSrv.monthFilter[0], mth))
          });

          this.spBill.forEach(el => {
            this.spTotal += +this.filterSrv.cleanPrice(el.billDetails.total);
          });
        }
       },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    )
  }


  getPyBill() {
    return this.fetch.getPayeeBill().subscribe(
      res => {
        this.pyBill = res;
        if(this.pyBill) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthDataPy.push(this.filterSrv.filterByBillDate(this.pyBill, this.filterSrv.monthFilter[0], mth))
          });
          this.pyBill.forEach(el => {
            this.pyTotal += +this.filterSrv.cleanPrice(el.billDetails.total);
          });
        }
       },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDelivery(template: TemplateRef<any>, billId: any) {
    this.modalRef = this.modalService.show(template);
    this.deliveryFrm.patchValue({
      billId: billId,
      address: this.profInfo.address
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
    this.billData = null;
    this.billDData = null;
    this.selectArea = area;
    this.selectWeek = null;
    this.selectSector = null;
    this.selectBrand = null;
    this.weekData = null;
    this.col3Data = [];
    this.col4Data = [];
    if(this.selectArea === 'Dashboard')
      this.monthData = this.monthDataDh;
    if(this.selectArea === 'Payee')
      this.monthData = this.monthDataPy;
    if(this.selectArea === 'Sponsor')
      this.monthData = this.monthDataSp;
    if(this.selectArea === 'Uploaded')
      this.monthData = this.monthDataUp;
  }

  sltMonth(month: number): void {
    this.selectMonth = month;
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

  sltCustomer(customer: string): void {
    this.selectSector = customer;
    if(this.selectArea === 'Dashboard'  || this.selectArea === 'Uploaded') {
      this.billData = this.sectorDataList = this.weekDataList.filter(e => e.deportment.toLowerCase().includes(this.selectSector.toLowerCase()));
      this.generateBFilter(this.billData);
    } else {
      this.billDData = this.sectorDataList = this.weekDataList.filter(e => e.billDetails.deportment.toLowerCase().includes(this.selectSector.toLowerCase()));
      this.generateBFilter(this.billDData);
    }
  }

  sltBrand(brand: string): void {
    this.selectBrand = brand;
    if(this.selectArea === 'Dashboard'  || this.selectArea === 'Uploaded')
      this.billData = this.sectorDataList.filter(e => e.title.toLowerCase().includes(this.selectBrand.toLowerCase()));
    else
      this.billDData = this.sectorDataList.filter(e => e.billDetails.title.toLowerCase().includes(this.selectBrand.toLowerCase()));
  }

  getProfileInfo():void {
    this.fetch.getProfInfo().subscribe(
      res => { this.profInfo = res; },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    )
  }

  getMonthData(): void {
    this.fetch.getAllBill(this.filterSrv.lastNine.getMonth() + 1, this.filterSrv.lastNine.getFullYear()).subscribe(
      res => {
        let data: any =  res;
        console.log(data);
        //this.billList = this.billData.filter((bill: any) => new Date(bill.date).getTime() >= this.lastTwo.getTime() && new Date(bill.date).getTime() <= this.today.getTime());
        if(data) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthDataDh.push(this.filterSrv.filterByDate(data, this.filterSrv.monthFilter[0], mth))
          });
        }
        //this.generateBFilter(this.billData);
        //this.filterMonthsWeek(0, this.billData);
        //this.sltWeek(0);
        data.forEach(el => {
            this.dashTotal += +this.filterSrv.cleanPrice(el.total);
          });
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
  }



  filterMonthsWeek(month: number, data: any): void {
    this.sltMonth(month);
    this.weekData = [];
    let weekList = this.filterSrv.weekCalculator(month, this.filterSrv.today.getMonth());
    if(this.selectArea === 'Dashboard' || this.selectArea === 'Uploaded') {
      weekList.forEach(e => {
        this.weekData.push(this.filterSrv.filterByDate(data , e.end.getTime(), e.start.getTime()))
      });
      this.billData = this.monthData[month].list;

    } else {
      weekList.forEach(e => {
        this.weekData.push(this.filterSrv.filterByBillDate(data , e.end.getTime(), e.start.getTime()))
      });
      this.billDData = this.monthData[month].list;

    }



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

  getSponsor(): void {
    this.fetch.getSponsor().subscribe(
      res => {
        let data: any = this.sponsor = res;
        data.forEach(e => {
          this.listSponsor.push({brand: e.sponsorName, price: e.price,userType: 'payee'})
        });
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );

    setTimeout(() => {
      this.pgMsg = null;
    },3500);
  }

  getPayee(): void {
    this.fetch.getPayee().subscribe(
      res => {
        let data: any = this.payee = res;
        data.forEach(e => {
          this.listPayee.push({brand: e.payeeName, price: e.price,userType: 'payee'})
        });
      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
    setTimeout(() => {
      this.pgMsg = null;
    },3500);
  }


  generateFilter(data: any): void {
    this.selectSector = null;
    this.col3Data = [];
    this.selectBrand = null;
    this.col4Data = [];
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

  addSponsor(sp: any, bill: any): void {
    let data: any = {
      sponsor: sp.sponsor,
      sponsorName: sp.sponsorName,
      payee: sp.payee,
      payeeName: sp.payeeName,
      billDetails: bill,
      createdOn: new Date().toString(),
      updatedOn: new Date().toString()
    };

    this.fetch.addSponsor(data).subscribe(
      res => { this.spMsg = {msg: res, alert: 'alert-success'}; },
      err => { this.spMsg = {msg: err.error, alert: 'alert-danger'}; }
    )
  }

  get dFrm() { return this.deliveryFrm.controls; }

  addDelivery(): void {
    this.dSubmit = true;
    this.dBtm = true;
    if (this.deliveryFrm.invalid) {
      this.dBtm = false;
      return;
    } else {
      let formObj = this.deliveryFrm.getRawValue();

      this.fetch.addDelivery(formObj).subscribe(
        res => {
          this.dMsg = {msg: res, alert: 'alert-success'};
          this.deliveryFrm.reset();
          this.dBtm = false;
          setTimeout(() => {
            this.modalRef.hide();
          }, 2800);
        },
        err => {
          this.dBtm = false;
          this.dMsg = {msg: err.error, alert: 'alert-danger'};
        }
      );
    }

    this.dSubmit = false;
    setTimeout(() => {
        this.dMsg = null;
    },3500);
  }

}
