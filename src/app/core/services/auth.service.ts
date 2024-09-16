import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { localStorageKeys } from '../models/localStorageKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly env: string = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router) {}

  Login(data: any): Observable<any> {
    return this.http.post<any>(this.env + '/login', data);
  }
  logOutUser(): Observable<any> {
    return this.http.post<any>(this.env + '/logout', {});
  }

  get currentUserToken(): string {
    return localStorage.getItem(localStorageKeys.token)!;
  }

  get isUserTokenAvailabe(): boolean {
    return !!localStorage.getItem(localStorageKeys.token);
  }

  get decodeUserToken() {
    return this.jwtHelper.decodeToken(
      localStorage.getItem(localStorageKeys.token)!
    )!;
  }

  getUser() {
    return this.decodeUserToken;
  }

  logout() {
    if (localStorageKeys.token) {
      localStorage.removeItem(localStorageKeys.token);
      this.router.navigate(['login']);
    }
  }
}
