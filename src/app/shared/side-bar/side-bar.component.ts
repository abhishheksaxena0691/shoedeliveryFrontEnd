import { AuthService } from './../../guard/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  userType: any = "";
  constructor(public authService: AuthService) {
    this.userType = this.authService.getUserType();
    console.log(this.userType);
  }

  ngOnInit() {
  }

}
