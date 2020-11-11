import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../guard/auth.service';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-login-pg',
  templateUrl: './login-pg.component.html',
  styleUrls: ['./login-pg.component.scss']
})
export class LoginPgComponent implements OnInit {

  logFrm: FormGroup;

  logSubmit: boolean = false;
  logBtm: boolean = false;
  logMsg: any;

  constructor(private formBuilder: FormBuilder, private route: Router, private auth: AuthService, private fetch: LandingService) { }

  ngOnInit() {
    this.logFrm = this.formBuilder.group({
      usrName: ['', Validators.required],
      yrPass: ['', Validators.required],
      userType: ['', Validators.required]
    });
    this.logFrm.patchValue({"userType": 2})
    const user = parseInt(localStorage.getItem("userType"));
    console.log(user);
    if (this.auth.isLoggedIn()) {

     if (user == 2) {
        this.route.navigate(['/dashboard']);
      } else {
        this.route.navigate(['/dealer/dashboard']);
      }
    }
  }

  get lgFrm() { return this.logFrm.controls; }

  logOn(): void {
    this.logSubmit = true;
    this.logBtm = true;
    if (this.logFrm.invalid) {
      this.logBtm = false;
      return;
    } else {
      let formObj = this.logFrm.getRawValue();

      this.fetch.logUsr(formObj).subscribe(
        res => {
          console.log(res);
          const data: any = res;
          this.auth.sendToken(data.token, data.usrName, this.logFrm.value.userType);
          this.logMsg = {msg: "Login successfully!", alert: 'alert-success'};

          this.logBtm = false;
          setTimeout(() => {
            if (parseInt(this.logFrm.value.userType) === 1) {
              this.route.navigate(["/dealer/dashboard"]);
              this.logFrm.reset();
            } else {
              this.route.navigate(["/dashboard"]);
              this.logFrm.reset();
            }
          },1500);
        },
        err => {
          this.logBtm = false;
          this.logMsg = {msg: err.error, alert: 'alert-danger'};
        }
      );
    }
    this.logSubmit = false;

    setTimeout(() => {
        this.logMsg = null;
    },3500);
  }

  setUser (type: any) {
    this.logFrm.patchValue({"userType": type});
  }

}

// css for the icoon to covert into triangle
