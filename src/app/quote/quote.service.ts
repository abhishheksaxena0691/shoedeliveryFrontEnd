import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';
import { AuthService } from '../guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient, private api: ApiLinkService, private auth: AuthService) { }

  serverPath: string = this.api.srvLink;

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': this.auth.getLogged()
  });

  getCategory(url: string) {
    return this.http.get(this.api.server+"category/product/"+url, {headers: this.headers});
  }

  getProduct(type: string, cate: string) {
    return this.http.get(this.api.server+"product/"+type+"/"+cate, {headers: this.headers});
  }

  addQuote(data: any) {
    return this.http.post(this.api.server+"quote", data, {headers: this.headers});
  }

  getQuote() {
    return this.http.get(this.api.server+"quotes", {headers: this.headers});
  }

}
