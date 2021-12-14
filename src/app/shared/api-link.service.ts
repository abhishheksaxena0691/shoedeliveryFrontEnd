import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLinkService {

  //srvLink: string = "http://localhost:8080/";
  //srvLink: string = "http://18.220.168.114:8080/"
  //srvLink: string = "https://34.219.112.19:8080/"
  srvLink: string = 'https://merchant.softdocket.com/';
  //srvLink: string = "http://retail.mobinyx.com/";

  //srvLink: string = "https://dealer.mobinyx.com/"
  //delear: string =  "http://localhost:3001/";
  delear: string = "https://personal.softdocket.com/"
  server: string = this.srvLink+"api/";


  constructor() { }
}

