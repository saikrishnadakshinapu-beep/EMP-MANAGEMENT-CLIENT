import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (!token || !request.url.startsWith(environment.apiUrl)) {
      return next.handle(request);
    }

    return next.handle(request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })).pipe(catchError(error => {
      if (error.status === 401) {
        this.authService.logout();
        void this.router.navigate(['/login']);
      }
      return throwError(() => error);
    }));
  }
}
