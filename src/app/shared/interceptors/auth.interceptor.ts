import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401 &&
          error.error &&
          error.error.detail === 'expired'
        ) {
          const parsedUrl = new URL(req.url);
          const urlBase = parsedUrl.protocol + '//' + parsedUrl.host;
          // Lê o valor do cookie RefreshToken
          const refresh_token = getCookie('RefreshToken');
          console.log('Refresh Token:', refresh_token);
          if (!refresh_token) {
            return throwError(() => error);
          }
          // Envia o valor do refresh_token no body
          return this.http.post<{ access_token: string }>(
            urlBase + '/api/v1/auth/refresh',
            { refresh_token }, // body com o valor do cookie
            {}
          ).pipe(
            switchMap((data) => {
              localStorage.setItem('token', data.access_token);
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.access_token}`
                }
              });
              return next.handle(newReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}