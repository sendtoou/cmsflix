import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { apiUrl } from '../url.constant';
import { JwtHelperService } from '../../../node_modules/@auth0/angular-jwt';//'@auth0/angular-jwt';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    public jwtHelper: JwtHelperService) { }

  // isRealToken(): boolean {
  //   try {
  //     const token = localStorage.getItem('x-access-token');
  //     const decodeToken = decode(token);
  //     return true;
  //   } catch {
  //     console.log('Invalid token can not decode token');
  //     return false;
  //   }
  // }

  isAccessTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('x-access-token');
      const isExpired = this.jwtHelper.isTokenExpired(token);
      if (token && isExpired) {
        return true;
      } else {
        return false;
      }
    } catch {
      console.log('Invalid token can not decode TokenExpired');
      return false;
    }
  }

  isAuthenticated(): boolean {
    // no need to check fake token, check when call api to verify token
    return !localStorage.getItem('x-access-token'); // if has token in localstorage return true, if not return false
  }

  isRolesAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles if empty, authorize the user to access the page that not role
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    try {
      const token = localStorage.getItem('x-access-token');
      const decodeToken = decode(token);
      // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
      const userRole = this.getUserRole();
      const roleGuard = allowedRoles;
      const isInclude = userRole.some((hasRole: any) => roleGuard.includes(hasRole));
      return isInclude;
    } catch {
      console.log('Invalid token can not decode tokenRole');
      return null;
    }
  }

  login(loginValue: any) {
    return this.http.post<any>(apiUrl.login, loginValue, { observe: 'response' })
      .pipe(
        shareReplay(),
        tap(res => {
          this.setSessionToken(res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        })
      );
  }

  register(registerValue: any) {
    return this.http.post<any>(apiUrl.register, registerValue, { observe: 'response' })
      .pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          this.setSessionToken(res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        })
      );
  }

  logout() {
    this.removeSessionToken();
    this.router.navigate(['/login']);
  }

  clearSessionToken() {
    this.removeSessionToken();
  }

  getUserId() {
    try {
      const token = localStorage.getItem('x-access-token');
      const decodeToken = decode(token);
      const uid = 'uid';
      const userId = decodeToken[uid];
      return userId;
    } catch {
      console.log('Invalid token can not decode token userid');
      return null;
    }
  }

  getUserRole() {
    try {
      const token = localStorage.getItem('x-access-token');
      const decodeToken = decode(token);
      const role = 'role';
      const userRole = decodeToken[role];
      return userRole;
    } catch {
      console.log('Invalid token can not decode token user role');
      return null;
    }
  }

  getNewAccessToken() {
    return this.http.get<any>(apiUrl.token, {
      headers: { 'x-refresh-token': this.getRefreshToken() }, observe: 'response'
    })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      );
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('x-access-token', token);
  }

  private setSessionToken(token: string, refreshToken: string) {
    localStorage.setItem('x-access-token', token);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSessionToken() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
}
