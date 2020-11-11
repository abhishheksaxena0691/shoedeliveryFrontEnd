import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinkService } from '../shared/api-link.service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  headers = new HttpHeaders({
    'Content-Type': "application/json"
  });

  constructor(private http: HttpClient, private api: ApiLinkService) { }

  logUsr(data: any) {
    return this.http.post(this.api.server+"login", data, {headers: this.headers});
  }

  regUsr(data: any) {
    return this.http.post(this.api.server+"register", data, {headers: this.headers});
  }

  usrVerify(data: any) {
    return this.http.post(this.api.server+"verify", data, {headers: this.headers});
  }
}
