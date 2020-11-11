import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthService } from '../guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthService) { }

  serverPath: string = this.api.srvLink;

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getAllDelivery() {
    return this.http.get(this.api.server+"delivery/all", {headers: this.headers});
  }

  updatepaymentMode(data: any) {
    return this.http.post(this.api.server+"delivery/updatePaymentMode", data, {headers: this.headers});
  }

  generateImageNewInvoice (data: any) {
    return this.http.post(this.api.server+"bill/uploadGeneratedBills", data, {headers: this.headers});
  }
  moveToDelivery (data) {
    return this.http.post(this.api.server+"delivery/moveToDelivery", data,  {headers: this.headers});

  }
}
