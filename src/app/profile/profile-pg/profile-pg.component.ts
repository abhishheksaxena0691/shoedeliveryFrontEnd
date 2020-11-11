import { AuthService } from './../../guard/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  selector: 'app-profile-pg',
  templateUrl: './profile-pg.component.html',
  styleUrls: ['./profile-pg.component.scss']
})
export class ProfilePgComponent implements OnInit {
  bsDate: any = {
    isAnimated: true, adaptivePosition: true, containerClass: 'theme-blue'
  }

  modalRef: BsModalRef;

  infoFrm: FormGroup;
  passFrm: FormGroup;
  sponsorFrm: FormGroup;
  billFrm: FormGroup;

  payee: boolean = true;
  payer: boolean = false;
  password: boolean = false;
  info: boolean = false;
  profile: any;
  pgMsg: any;

  regSubmit: boolean = false;
  regBtn: boolean = false;
  regMsg: any;

  psSubmit: boolean = false;
  psBtn: boolean = false;
  psMsg: any;

  sponsorList: boolean = false;
  payeeList: boolean = false;

  usrList: any;

  spSorBtn: boolean = false;
  spSorMsg: any;

  spnBill: any;
  pyBill: any;

  listSponsor: any;
  listPayee: any;

  selectMonth: number;
  selectPyMonth: number;
  selectWeek: number = 0;
  selectPyWeek: number = 0;
  selectSector: string;
  selectBrand: string;
  selectPySector: string;
  selectPyBrand: string;

  weekDataList: any;
  weekDataPyList: any;
  sectorDataList: any;
  sectorPyDataList: any;

  popId: number;
  popBill: boolean = false;
  monthData: any = [];
  weekData: any = [];
  weekPyData: any = [];

  monthDataPy: any = [];
  weekDataPy: any = [];

  col4Data: col4Type[] = [];
  col3Data: col3Type[] = [];
  col4PyData: col4Type[] = [];
  col3PyData: col3Type[] = [];

  upBtm: boolean = false;
  uploading: boolean = false;
  upMsg: any;

  percent: number;
  selectedFile: string;
  fileName: string;

  department: any = [];

  upTypes: string[] = [ 'jpg', 'jpeg', 'png', 'pdf' ];
  userType: string;


  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private fetch: ProfileService, private filterSrv: FilterService, public authService: AuthService) {
    this.userType = this.authService.getUserType();
    console.log(this.userType);
   }

  serverPath: string = this.fetch.serverPath;
  menuOptions: any = this.filterSrv.menuOptions;
  cOptions: any = this.filterSrv.cOptions;

  ngOnInit() {
    this.infoFrm = this.formBuilder.group({
      fstName: ['', Validators.required],
      lstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });

    this.passFrm = this.formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confPass: ['', Validators.required]
    });

    this.sponsorFrm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      spName: ['', Validators.required]
    });

    this.billFrm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      factory: ['', Validators.required],
      fileName: ['', Validators.required]
    });

    this.getProfile();
    this.getSponsor();
    this.getPayee();
    this.getSpBill();
    this.getPyBill();
    this.getMonthData();
  }

  getSpBill() {
    return this.fetch.getSponsorBill().subscribe(
      res => {
        this.spnBill = res;
        if(this.spnBill) {
          this.filterSrv.monthFilter.forEach(mth => {
            this.monthData.push(this.filterSrv.filterByBillDate(this.spnBill, this.filterSrv.monthFilter[0], mth))
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
        }
       },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'} }
    )
  }

  getMonthData(): void {
    this.department = [];
    this.fetch.getAllBill(this.filterSrv.lastNine.getMonth() + 1, this.filterSrv.lastNine.getFullYear()).subscribe(
      res => {
        let data: any =  res;
        //this.billList = this.billData.filter((bill: any) => new Date(bill.date).getTime() >= this.lastTwo.getTime() && new Date(bill.date).getTime() <= this.today.getTime());
        // if(data) {
        //   this.filterSrv.monthFilter.forEach(mth => {
        //     this.monthDataDh.push(this.filterSrv.filterByDate(data, this.filterSrv.monthFilter[0], mth))
        //   });
        // }
        //this.generateBFilter(this.billData);
        //this.filterMonthsWeek(0, this.billData);
        //this.sltWeek(0);

        data.forEach(el => {
            let updateItem = this.department.find(x => x === el.deportment);
            if(!updateItem)
              this.department.push(el.deportment);
        });

      },
      err => { this.pgMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
  }

  selectUsr(e: any): void {
    let updateItem = this.usrList.find(x => x.mobileNo === e.target.value);
    if(updateItem) {
      let idx = this.usrList.indexOf(updateItem);
      this.sponsorFrm.patchValue({spName: this.usrList[idx].fstName+" "+this.usrList[idx].lstName});
    }
  }

  getProfile(): void {
    this.fetch.getProfInfo().subscribe(
      res => {
        this.profile = res;
        this.infoFrm.patchValue({
          fstName: this.profile.fstName,
          lstName: this.profile.lstName,
          email: this.profile.email,
          address: this.profile.address
        });
       },
      err => { this.pgMsg = err.error }
    )
  }

  togglePass(): void {
    this.password = !this.password;
    this.info = false;
  }

  toggleInfo(): void {
    this.info = !this.info;
    this.password = false;
  }

  togglePay(payType: string): void {
    if(payType === 'unpaid') {
      this.payee = true;
      this.payer = false;
    }
    else if(payType === 'paid') {
      this.payer = true;
      this.payee = false;
    }
  }

  toggleList(payType: string): void {
    if(payType === 'payee') {
      this.payeeList = !this.payeeList;
      this.sponsorList = false;
    }
    else if(payType === 'sponsor') {
      this.payeeList = false;
      this.sponsorList = !this.sponsorList;
    }
  }

  sltMonth(month: number): void {
    this.selectMonth = month;
  }

  sltPyMonth(month: number): void {
    this.selectPyMonth = month;
  }

  sltWeek(week: number): void {
    this.selectWeek = week;
    this.spnBill = this.weekDataList = this.weekData[week].list;

    this.generateFilter(this.spnBill);
  }

  sltPyWeek(week: number): void {
    console.log(this.weekPyData);

    this.selectPyWeek = week;
    this.pyBill = this.weekDataPyList = this.weekPyData[week].list;

    this.generatePyFilter(this.pyBill);
  }

  sltCustomer(customer: string): void {
    this.selectSector = customer;
    // if(this.selectSector === 'Payee')
    //   this.col4Data = this.listPayee;
    // if(this.selectSector === 'Sponsor')
    //   this.col4Data = this.listSponsor;

    this.spnBill = this.sectorDataList = this.weekDataList.filter(e => e.billDetails.deportment.toLowerCase().includes(this.selectSector.toLowerCase()));

    this.generateBFilter(this.spnBill);
  }

  sltBrand(brand: string): void {
    this.selectBrand = brand;
    this.spnBill = this.sectorDataList.filter(e => e.billDetails.title.toLowerCase().includes(this.selectBrand.toLowerCase()));
  }

  sltPyCustomer(customer: string): void {
    this.selectPySector = customer;
    // if(this.selectSector === 'Payee')
    //   this.col4Data = this.listPayee;
    // if(this.selectSector === 'Sponsor')
    //   this.col4Data = this.listSponsor;

    this.pyBill = this.sectorPyDataList = this.weekDataPyList.filter(e => e.billDetails.deportment.toLowerCase().includes(this.selectPySector.toLowerCase()));

    this.generatePyBFilter(this.pyBill);
  }

  sltPyBrand(brand: string): void {
    this.selectPyBrand = brand;
    this.pyBill = this.sectorPyDataList.filter(e => e.billDetails.title.toLowerCase().includes(this.selectPyBrand.toLowerCase()));
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

  generatePyBFilter(data: any): void {
    this.selectBrand = null;
    this.col4PyData = [];
    data.forEach(e => {
      let updateItem = this.col4PyData.find(x => x.brand === e.billDetails.title);
      if(!updateItem)
        this.col4PyData.push({brand: e.billDetails.title,price: this.cleanPrice(e.billDetails.total),userType: "brand"})
      else {
        let index = this.col4PyData.indexOf(updateItem);
        this.col4PyData[index].price = this.col4PyData[index].price + this.cleanPrice(e.billDetails.total);
      }
    });
  }

  generatePyFilter(data: any): void {
    this.selectPySector = null;
    this.col3PyData = [];
    this.selectPyBrand = null;
    this.col4PyData = [];

    data.forEach(e => {
      let updateItem = this.col3PyData.find(x => x.department === e.billDetails.deportment);
      if(!updateItem)
        this.col3PyData.push({department: e.billDetails.deportment,price: this.cleanPrice(e.billDetails.total),userType: "department"})
      else {
        let index = this.col3PyData.indexOf(updateItem);
        this.col3PyData[index].price = this.col3PyData[index].price + this.cleanPrice(e.billDetails.total);
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

    this.spnBill = this.monthData[month].list;


    this.selectWeek = null;
    this.selectSector = null;
    this.selectBrand = null;
    this.col3Data = [];
    this.col4Data = [];
    //console.log(this.weekData);

  }

  filterPyMonthsWeek(month: number, data: any): void {
    this.sltPyMonth(month);
    this.weekPyData = [];
    let weekList = this.filterSrv.weekCalculator(month, this.filterSrv.today.getMonth());
    weekList.forEach(e => {
      this.weekPyData.push(this.filterSrv.filterByBillDate(data , e.end.getTime(), e.start.getTime()))
    });

    this.pyBill = this.monthDataPy[month].list;


    this.selectPyWeek = null;
    this.selectPySector = null;
    this.selectPyBrand = null;
    this.col3PyData = [];
    this.col4PyData = [];
    //console.log(this.weekData);

  }

  cleanPrice(amount: string) {
    return this.filterSrv.cleanPrice(amount);
  }

  get autoFrm() { return this.infoFrm.controls; }

  updateInfo(): void {
    this.regSubmit = true;
    this.regBtn = true;
    if (this.infoFrm.invalid) {
      this.regBtn = false;
      return;
    } else {
      let formObj = this.infoFrm.getRawValue();
      this.fetch.modUsr(formObj).subscribe(
        res => {
          this.infoFrm.reset();
          this.regBtn = false;
          this.regMsg = {msg: res, alert: "alert-success"};
          setTimeout(() => {
            this.info = false;
            this.getProfile();
          },3500);
        },
        err => { this.regMsg = {msg: err.error, alert: "alert-danger"}; }
      );
      this.regSubmit = false;

      setTimeout(() => {
          this.regMsg = null;
      },3500);
    }
  }

  get pssFrm() { return this.passFrm.controls; }

  updatePass(): void {
    this.psSubmit = true;
    this.psBtn = true;
    if (this.passFrm.invalid || this.pssFrm.newPass.value !== this.pssFrm.confPass.value) {
      this.psBtn = false;
      return;
    } else {
      let formObj = this.passFrm.getRawValue();
      this.fetch.modPass(formObj).subscribe(
        res => {
          this.passFrm.reset();
          this.psBtn = false;
          this.psMsg = {msg: res, alert: "alert-success"};
          setTimeout(() => {
            this.password = false;
          },3500);
        },
        err => {
          this.psMsg = {msg: err.error, alert: "alert-danger"};
          this.psBtn = false;
        }
      );
      this.psSubmit = false;

      setTimeout(() => {
          this.psMsg = null;
      },3500);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addSponsor(): void {
    this.spSorBtn = true;
    if (this.sponsorFrm.invalid) {
      this.spSorBtn = false;
      return;
    } else {
      let formObj = this.sponsorFrm.getRawValue();
      this.fetch.addPayee(formObj).subscribe(
        res => {
          this.spSorMsg = {msg: res, alert: 'alert-success'};
          this.spSorBtn = false;
          this.getSponsor();
          setTimeout(() => {
              this.modalRef.hide();
          },2500);
        },
        err => {
          this.spSorMsg = {msg: err.error, alert: 'alert-danger'};
          this.spSorBtn = false;
        }
      );

      setTimeout(() => {
          this.spSorMsg = null;
      },3500);
    }
  }

  getSponsor(): void {
    this.fetch.getSponsor().subscribe(
      res => { this.listSponsor = res },
      err => { this.psMsg = {msg: err.error, alert: 'alert-danger'}; }
    );

    setTimeout(() => {
      this.psMsg = null;
    },3500);
  }

  getPayee(): void {
    this.fetch.getPayee().subscribe(
      res => { this.listPayee = res },
      err => { this.psMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
    setTimeout(() => {
      this.psMsg = null;
    },3500);
  }

  approvePay(spId: string, index: number): void {
    this.fetch.apvSponsor(spId).subscribe(
      res => {
        this.pgMsg = {msg: res, alert: 'alert-success'};
        this.listPayee[index].status = true;
      },
      err => { this.psMsg = {msg: err.error, alert: 'alert-danger'}; }
    );
    setTimeout(() => {
      this.psMsg = null;
    },3500);
  }

  delSpn(spId: string, index: number): void {
    if(confirm("Are you sure want to delete?")) {
      this.fetch.delSponsor(spId).subscribe (
        res => {
          this.psMsg = {msg: res, alert: 'alert-danger'};
          this.listSponsor.splice(index, 1);
        },
        err => { this.psMsg = {msg: err.error, alert: 'alert-danger'}; }
      );
      setTimeout(() => {
        this.psMsg = null;
      },3500);
    }
  }

  delPye(spId: string, index: number): void {
    if(confirm("Are you sure want to delete?")) {
      this.fetch.delSponsor(spId).subscribe (
        res => {
          this.psMsg = {msg: res, alert: 'alert-danger'};
          this.listPayee.splice(index, 1);
        },
        err => { this.psMsg = {msg: err.error, alert: 'alert-danger'}; }
      );
      setTimeout(() => {
        this.psMsg = null;
      },3500);
    }
  }

  selectFile(event) {
    const fileName = event.target.files[0].name.split('.');
    if(!this.upTypes.find(x => x === fileName[fileName.length - 1])) {
      this.pgMsg = "Invalid file... Please select only jpg/jpeg/png/pdf file";
      return false;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.upBtm = true;
    }

    const uFrm  =  new FormData();

    let fName = fileName[0].toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    this.selectedFile = fName+"-"+Date.now().toString()+'.'+fileName[fileName.length - 1];

    uFrm.append('bill', event.target.files[0], this.selectedFile);
    this.uploading = true;
    this.fetch.uploadImg(uFrm).subscribe(
        (event) => {
            if(event.type === HttpEventType.UploadProgress) {
              this.percent = Math.round(((event.loaded / event.total) * 100));
            } else if(event.type === HttpEventType.Response) {
              let res: any = event.body;
              this.fileName = res;
              this.billFrm.patchValue({
                fileName: this.fileName
              })
              this.uploading = false;
              this.upBtm = false;

            }
          },
          (error) => {
            this.uploading = false;
            this.upBtm = false;
            this.upMsg = {msg: error, alert: "alert-danger"};
          }
      );

  }

  upBill(): void {
    this.upBtm = true;
    if (this.billFrm.invalid) {
      this.upBtm = false;
      return;
    } else {
      let formObj = this.billFrm.getRawValue();
      this.fetch.uploadBill(formObj).subscribe(
        res => {
          this.upMsg = {msg: res, alert: 'alert-success'};
          this.upBtm = false;
          this.billFrm.reset();
          this.fileName = null;
          this.selectedFile = null;
        },
        err => {
          this.upMsg = {msg: err.error, alert: 'alert-danger'};
          this.upBtm = false;
        }
      );

      setTimeout(() => {
          this.upMsg = null;
      },3500);
    }
  }

}
