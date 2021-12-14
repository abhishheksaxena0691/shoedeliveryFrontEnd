import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  sendToken(token: string, usrFNm: string, companyName:string, domain:string, userType: string) {
    console.log(this.platformId);
    localStorage.removeItem("shoeRetailUsr");
    localStorage.removeItem("shoeRetailUsrNm");
        localStorage.setItem("shoeRetailUsr", token);
        localStorage.setItem("shoeRetailUsrNm", usrFNm);
        localStorage.setItem("userType", userType);
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('domain', domain);

    }

    getLogged() {

        return localStorage.getItem("shoeRetailUsr");

    }

    isLoggedIn() {
      return this.getLogged() !== null;
    }

    getLogName() {
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem("shoeRetailUsrNm");
      } else { return ""; }
    }

    getUserType () {
      return localStorage.getItem("userType");
    }

    getCompanyName () {
      return localStorage.getItem("companyName");
    }

    getDomainName () {
      return localStorage.getItem("domain");
    }

    logout() {

        localStorage.removeItem("shoeRetailUsr");
        localStorage.removeItem("shoeRetailUsrNm");
        console.log("hello");
      this.route.navigate(["/"]);
    }
}
