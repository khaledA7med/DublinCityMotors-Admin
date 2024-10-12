import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { localStorageKeys } from '../models/localStorageKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly env: string = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  private userTokenSubject!: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(localStorageKeys.token);
    this.userTokenSubject = new BehaviorSubject<string | null>(token);
  }

  // Getter to expose the observable
  public get userToken$(): Observable<string | null> {
    return this.userTokenSubject.asObservable();
  }

  Login(data: any): Observable<any> {
    return this.http.post<any>(this.env + 'signin', data).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem(localStorageKeys.token, res.token);
          this.userTokenSubject.next(res.token); // Update the subject
        }
      })
    );
  }
  get currentUserToken(): string {
    return localStorage.getItem(localStorageKeys.token)!;
  }

  // Check if the user token is available
  get isUserTokenAvailable(): boolean {
    return !!this.userTokenSubject.value;
  }

  get decodeUserToken() {
    return this.jwtHelper.decodeToken(
      localStorage.getItem(localStorageKeys.token)!
    )!;
  }

  getUser() {
    return this.decodeUserToken;
  }

  // Log out method
  logout() {
    localStorage.removeItem(localStorageKeys.token);
    this.userTokenSubject.next(null); // Update the subject
  }
}
