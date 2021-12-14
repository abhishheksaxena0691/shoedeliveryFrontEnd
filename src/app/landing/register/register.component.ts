import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../guard/auth.service';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regFrm: FormGroup;

  regSubmit: boolean = false;
  regBtm: boolean = false;
  regMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private fetch: LandingService, private auth: AuthService) { }

  ngOnInit() {
    this.regFrm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fstName: ['', Validators.required],
      lstName: ['', Validators.required],
      yrPass: ['', Validators.required],
      userType: ['', Validators.required],
      companyName: ['', Validators.required],
      domain: ['', Validators.required]
    });
    this.regFrm.patchValue({"userType": 2})
    if(this.auth.isLoggedIn())
      this.route.navigate(['/dashboard']);
  }

  get autoFrm() { return this.regFrm.controls; }

  regOn(): void {
    this.regSubmit = true;
    this.regBtm = true;
    if (this.regFrm.invalid) {
      this.regBtm = false;
      return;
    } else {
      let formObj = this.regFrm.getRawValue();
      this.fetch.regUsr(formObj).subscribe(
        res => {
          this.regFrm.reset();
          this.regBtm = false;
          this.regMsg = {msg: res, alert: "alert-success"};
          setTimeout(() => {
            this.route.navigate(['/OTP/'+formObj.mobileNo]);
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
  setUser (type: any) {
    this.regFrm.patchValue({"userType": type});
  }
}
