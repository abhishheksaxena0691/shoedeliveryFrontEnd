import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-reg-otp',
  templateUrl: './reg-otp.component.html',
  styleUrls: ['./reg-otp.component.scss']
})
export class RegOTPComponent implements OnInit {

  regFrm: FormGroup;

  frmSubmit: boolean = false;
  frmBtm: boolean = false;
  pgMsg: any;
  mobileNo: string;

  constructor(private formBuilder: FormBuilder, private route: Router, private aRoute: ActivatedRoute, private fetch: LandingService) { }

  ngOnInit() {
    this.regFrm = this.formBuilder.group({
      regMobile: ['', Validators.required],
      otp: ['', Validators.required]
    });

    this.aRoute.params.subscribe(
      param => {
        this.mobileNo = param['mobile'];
        this.regFrm.patchValue({
          regMobile: this.mobileNo,
        });
      }
    );
  }

  get autoFrm() { return this.regFrm.controls; }

  verifyOn(): void {
    this.frmSubmit = true;
    this.frmBtm = true;
    if (this.regFrm.invalid) {
      this.frmBtm = false;
      return;
    } else {
      let formObj = this.regFrm.getRawValue();
      this.fetch.usrVerify(formObj).subscribe(
        res => {
          this.regFrm.reset();
          this.pgMsg = {msg: res, alert: "alert-success"};
          setTimeout(() => {
            this.route.navigate(['/']);
          },3500);
        },
        err => { this.pgMsg = {msg: err.error, alert: "alert-danger"}; }
      );
      this.frmSubmit = false;
      this.frmBtm = false;
      setTimeout(() => {
          this.pgMsg = null;
      },3500);
    }
  }

}
