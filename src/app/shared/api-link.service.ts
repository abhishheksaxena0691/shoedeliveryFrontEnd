import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLinkService {

  //srvLink: string = "http://localhost:8080/";

  //srvLink: string = "http://retail.mobinyx.com/";
   srvLink: string = "http://13.232.99.247:8080/";
  server: string = this.srvLink+"api/";

  constructor() { }
}

