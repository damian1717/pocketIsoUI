import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, exhaustMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return this.authService.user.pipe(
          take(1),
          exhaustMap(user => {

              if (!user?.token) {
                  return next.handle(req); 
              }
              const headers = { Authorization: `Bearer ${user.token}` };
              const modifiedReq = req.clone({ setHeaders: headers })
              return next.handle(modifiedReq);
          })
      ); 
  }
}
