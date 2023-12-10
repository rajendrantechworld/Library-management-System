import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable as __Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationCheckService {


  authenticationState: boolean = false;

  constructor(
    private router: Router,
  ) {
    this.checkToken();
  }

  async checkToken() {
    let token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.authenticationState = true;
    }
  }
  getAuthToken() {

    // 
    // if(this.router.url == "/signin") localStorage.clear();
    return window.localStorage.getItem(TOKEN_KEY);
  }

  async saveAuth(token) {
    await localStorage.setItem(TOKEN_KEY, 'Bearer ' + token);
    this.authenticationState = true;
    return true;
  }

  logout() {
    localStorage.clear();
    this.authenticationState = false;
    return this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  isAuthenticated() {
    return this.authenticationState;
  }

}
