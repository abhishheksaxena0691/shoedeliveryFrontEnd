import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isLoggedIn()) {
      const usertype = this.auth.getUserType();
      console.log(usertype);
      if (parseInt(usertype) === 1) {
        if (state.url.split('/')[1] === 'dealer') {
          return true;
        } else {
          if (state.url === '/profile') {
            return true;
          } else {
          return false;
          }
        }
      } else if(parseInt(usertype) === 2) {
        return true;
      } else {
        return false;
      }

    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }

}
