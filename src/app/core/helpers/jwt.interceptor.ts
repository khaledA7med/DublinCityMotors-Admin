import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUserToken = this.auth.userToken$;

    const isLoginRequest = request.url.includes('signin'); // Adjust this based on your API URL

    if (currentUserToken && !isLoginRequest) {
      // Clone the request and add the token in the headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
    }

    // Pass the request to the next handler
    return next.handle(request);
  }
}
