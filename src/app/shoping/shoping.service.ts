import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthService } from '../guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopingService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthService) { }

  serverPath: string = this.api.srvLink;

  // headers = new HttpHeaders({
  //   'Content-Type': "application/json",
  //   'Authorization': this.auth.getLogged()
  // });

  upHeaders = new HttpHeaders({
    'Authorization': this.auth.getLogged()
  });
  upHeaders1 = new HttpHeaders({

  });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};

  uploadImg(data) {


    return this.http.post(this.api.delear+"api/comunication/image", data, {headers: this.upHeaders1, reportProgress: true, observe: 'events'})

  }

  uploadclassifiedImage (data) {
    return this.http.post(this.api.delear+"api/comunication/imageuploadclassified", data, {headers: this.upHeaders1, reportProgress: true, observe: 'events'})
  }

  uploadclassifiedImage1 (data) {
    return this.http.post(this.api.delear+"api/comunication/imageLogoUpload", data, {headers: this.upHeaders1, reportProgress: true, observe: 'events'})
  }


  addProduct (data, url, token) {
    const duplicateHeader = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': token
    });
    return this.http.post(this.api.server+url, data, {headers: duplicateHeader});
  }

  getAllProduct (data, token) {
    console.log(token);
    const duplicateHeader = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': token
    });
    return this.http.post(this.api.delear+"api/product/allProduct", data, {headers: duplicateHeader});
  }

  delProduct (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+'product/deleteProduct', data, {headers: headers});
  }

  myorder (token) {
    const duplicateHeader = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': token
    });
    return this.http.get(this.api.server+'product/myOrder', {headers:duplicateHeader});
  }

  acceptedInvoice (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });

    return this.http.post(this.api.server+'product/updateStatus', data, {headers: headers});
  }

  InvoiceSend (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+'product/InvoiceSend', data, {headers: headers});
  }

  getSopkeeperInfo(data) {

    return this.http.post(this.api.server+"profileInformation", data,  {headers: this.upHeaders1});
  }

  updateDiscount (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+'addDiscount', data, {headers: headers});
  }

  reviewMerchant (data) {
    const token =  this.auth.getLogged();
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization':token
    });
    return this.http.post(this.api.server+"product/writeMerchantReview", data,{headers: headers});
  }
}
