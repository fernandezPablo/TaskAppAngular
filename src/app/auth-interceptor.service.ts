import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    console.log('On the auth-interceptor...');
    const token = localStorage.getItem('Authorization');

    let request = req;

    if(token){
      console.log('Token find...');
      request = req.clone({
        setHeaders: {
          'authorization': `${token}`
        }
      });
    }

    return next.handle(request);

  }

}
