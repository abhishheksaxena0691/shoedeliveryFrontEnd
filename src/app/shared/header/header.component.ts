import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../guard/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  popMenu: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  toggleMenu(): void {
    if(this.popMenu)
      this.popMenu = false;
    else
      this.popMenu = true;
  }

  logout(): void {
    this.auth.logout();
  }

}
