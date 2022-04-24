import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from './services/auth-services.service'
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServicesService, private router: Router,public localStorage:LocalStorageService) { } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }


  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.checkLogin()) {
      const userRole = this.authService.roleAs; 
      // console.log(userRole);
      // console.log(route.data.role);
      // console.log(localStorage.getItem('id_token'));
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        alert('คุณไม่มีสิทธิ์เข้าถึง')
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    // alert('คุณยังไม่ได้login')
    this.router.navigate(['login']);
    return false;
  }
  
}
