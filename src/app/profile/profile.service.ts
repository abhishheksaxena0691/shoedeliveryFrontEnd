import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthService } from '../guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthService) { }

  serverPath: string = this.api.srvLink;

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  upHeaders = new HttpHeaders({
    'Authorization': this.auth.getLogged()
  });

  uploadImg(data) {
    return this.http.post(this.api.server+"profile/bill", data, {headers: this.upHeaders, reportProgress: true, observe: 'events'})
  }

  uploadBill(data) {
    return this.http.post(this.api.server+"bill-info", data, {headers: this.headers});
  }

  getProfInfo() {
    return this.http.get(this.api.server+"profile", {headers: this.headers})
  }

  modUsr(data: any) {
    return this.http.put(this.api.server+"profile", data, {headers: this.headers})
  }

  modPass(data: any) {
    return this.http.put(this.api.server+"profile/password", data, {headers: this.headers})
  }

  getUser() {
    return this.http.get(this.api.server+"user/all", {headers: this.headers});
  }

  addPayee(data: any) {
    return this.http.post(this.api.server+"sponsor", data, {headers: this.headers});
  }

  getSponsor() {
    return this.http.get(this.api.server+"sponsor", {headers: this.headers});
  }

  getSponsorBill() {
    return this.http.get(this.api.server+"sponsor/bill", {headers: this.headers});
  }

  getPayee() {
    return this.http.get(this.api.server+"payee", {headers: this.headers});
  }

  getPayeeBill() {
    return this.http.get(this.api.server+"payee/bill", {headers: this.headers});
  }

  apvSponsor(spId: string) {
    return this.http.put(this.api.server+"sponsor/"+spId, {status: true}, {headers: this.headers});
  }

  delSponsor(spId: string) {
    return this.http.delete(this.api.server+"sponsor/"+spId, {headers: this.headers});
  }

  getAllBill(month: string, year: string) {
    return this.http.get(this.api.server+"bill/"+month+"/"+year, {headers: this.headers});
  }
}
