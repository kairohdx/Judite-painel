import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, { email, password }).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          document.cookie = `RefreshToken=${response.refresh_token}; path=/;`;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    document.cookie = `RefreshToken=; path=/;`;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}