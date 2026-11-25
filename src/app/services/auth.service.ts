import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenStorageKey = 'employee-api-token';
  private readonly authUrl = `${environment.apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, { email, password }).pipe(
      tap(response => this.storeToken(response.token))
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
  }
}
