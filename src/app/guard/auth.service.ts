import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  sendToken(token: string, usrFNm: string, userType: string) {
    console.log(this.platformId);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("shoeRetailUsr", token);
        localStorage.setItem("shoeRetailUsrNm", usrFNm);
        localStorage.setItem("userType", userType);
      }
    }

    getLogged() {
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem("shoeRetailUsr");
      } else { return null; }
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

    logout() {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem("shoeRetailUsr");
        localStorage.removeItem("shoeRetailUsrNm");
      }
      this.route.navigate(["/"]);
    }
}
