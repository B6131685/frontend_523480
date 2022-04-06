import { HttpEvent,HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

  const idToken = localStorage.getItem("id_token");
  

  if (req.context.get(BYPASS_LOG) === true){
      return next.handle(req);
  }else{
    if (idToken) {
        const cloned = req.clone({
        headers: req.headers.set("Authorization",
        "Bearer " + idToken)
        });

        return next.handle(cloned); 
    }
    else {
        return next.handle(req);
    }
  } 
  
}}
