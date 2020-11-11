import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-missing-pg',
  templateUrl: './missing-pg.component.html',
  styleUrls: ['./missing-pg.component.scss']
})
export class MissingPgComponent implements OnInit {

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
