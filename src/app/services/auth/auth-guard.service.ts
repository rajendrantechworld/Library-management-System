import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationCheckService } from './authentication-check.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationCheckService, private router: Router,) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let authToken = this.auth.isAuthenticated();
    let pagePath = state.url;
    //
    if (authToken == true) localStorage.setItem('login', 'true')
    if (authToken == false) localStorage.setItem('login', 'false')

    if (authToken) {
      return true;
    } else if (authToken == false) {
      this.router.navigateByUrl('/signin', { replaceUrl: true });
    }

    return false;
  }
}
