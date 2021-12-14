import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthService } from '../guard/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthService) { }

  serverPath: string = this.api.srvLink;

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getProfInfo(token) {
    console.log(token);
    const duplicateHeader = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': token
    });
    return this.http.get(this.api.server+"profile", {headers: duplicateHeader})
  }

  getAllBill(month: string, year: string) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.get(this.api.server+"bill/"+month+"/"+year, {headers: headers});
  }

  getSponsor() {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.get(this.api.server+"sponsor", {headers: headers});
  }

  addSponsor(data: any) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"sponsor/bill", data, {headers: headers});
  }

  getPayee() {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.get(this.api.server+"payee", {headers: headers});
  }

  addDelivery(data: any) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"delivery", data, {headers: headers});
  }

  getPayeeBill() {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.get(this.api.server+"payee/bill", {headers: headers});
  }

  getSponsorBill() {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.get(this.api.server+"sponsor/bill", {headers: headers});
  }

  getUploadBill() {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.get(this.api.server+"bill-info", {headers: headers});
  }
  getProductList (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"product/getProductList", data,  {headers: headers});
  }
  createNewInvoice (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"bill/generateDealerBill", data,  {headers: headers});
  }
  generateImageNewInvoice (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"bill/generateDealerBill", data,  {headers: headers});
  }
  updateDeleiveryInoice (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"delivery/updatedeliveryCredit", data,  {headers: headers});
  }
  updateCreditInvoice (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"delivery/updatedeliveryCredit", data,  {headers: headers});
  }
  updateInvoiceStatus (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"delivery/updateInvoiceStatus", data,  {headers: headers});
  }
  verifyRetailerMobileNumber(data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"verifyMobileNumber", data,  {headers: headers});
  }

  public profileInfo: any = {};
  setProfileInfo (data) {
    this.profileInfo = data;
  }

  getProfileInfo () {
    return this.profileInfo;
  }


}
