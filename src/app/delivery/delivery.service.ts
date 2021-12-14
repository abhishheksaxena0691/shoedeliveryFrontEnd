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
    const token = this.auth.getLogged();
    const dupheaders = new HttpHeaders({
                        'Content-Type': "application/json",
                        'Authorization': token
                      });
    return this.http.get(this.api.server+"delivery/all", {headers: dupheaders});
  }

  updatepaymentMode(data: any) {
    const token = this.auth.getLogged();
    const dupheaders = new HttpHeaders({
                          'Content-Type': "application/json",
                          'Authorization': token
                        });
    return this.http.post(this.api.server+"delivery/updatePaymentMode", data, {headers: dupheaders});
  }

  generateImageNewInvoice (data: any) {
    const token = this.auth.getLogged();
    const dupheaders = new HttpHeaders({
                                        'Content-Type': "application/json",
                                        'Authorization': token
                                      });
    return this.http.post(this.api.server+"bill/uploadGeneratedBills", data, {headers: dupheaders});
  }
  moveToDelivery (data) {
    const token = this.auth.getLogged();
    const dupheaders = new HttpHeaders({
                                        'Content-Type': "application/json",
                                        'Authorization': token
                                      });
    return this.http.post(this.api.server+"delivery/moveToDelivery", data,  {headers: dupheaders});
  }
}
