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

  getProfInfo() {
    return this.http.get(this.api.server+"profile", {headers: this.headers})
  }

  getAllBill(month: string, year: string) {
    return this.http.get(this.api.server+"bill/"+month+"/"+year, {headers: this.headers});
  }

  getSponsor() {
    return this.http.get(this.api.server+"sponsor", {headers: this.headers});
  }

  addSponsor(data: any) {
    return this.http.post(this.api.server+"sponsor/bill", data, {headers: this.headers});
  }

  getPayee() {
    return this.http.get(this.api.server+"payee", {headers: this.headers});
  }

  addDelivery(data: any) {
    return this.http.post(this.api.server+"delivery", data, {headers: this.headers});
  }

  getPayeeBill() {
    return this.http.get(this.api.server+"payee/bill", {headers: this.headers});
  }

  getSponsorBill() {
    return this.http.get(this.api.server+"sponsor/bill", {headers: this.headers});
  }

  getUploadBill() {
    return this.http.get(this.api.server+"bill-info", {headers: this.headers});
  }
  getProductList (data) {
    return this.http.post(this.api.server+"product/getProductList", data,  {headers: this.headers});
  }
  createNewInvoice (data) {
    return this.http.post(this.api.server+"bill/generateDealerBill", data,  {headers: this.headers});
  }
  generateImageNewInvoice (data) {
    return this.http.post(this.api.server+"bill/generateDealerBill", data,  {headers: this.headers});
  }
  updateDeleiveryInoice (data) {
    return this.http.post(this.api.server+"delivery/updatedeliveryCredit", data,  {headers: this.headers});
  }
  updateCreditInvoice (data) {
    return this.http.post(this.api.server+"delivery/updatedeliveryCredit", data,  {headers: this.headers});
  }
  updateInvoiceStatus (data) {
    return this.http.post(this.api.server+"delivery/updateInvoiceStatus", data,  {headers: this.headers});
  }
}
