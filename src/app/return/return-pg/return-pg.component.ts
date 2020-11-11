import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-pg',
  templateUrl: './return-pg.component.html',
  styleUrls: ['./return-pg.component.scss']
})
export class ReturnPgComponent implements OnInit {

  filter: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleFilter(): void {
    if(this.filter)
      this.filter = false;
    else
      this.filter = true;
  }

}
