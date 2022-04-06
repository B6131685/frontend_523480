import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from './services/auth-services.service'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServicesService, private router: Router) { } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }


  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.checkLogin()) {
      const userRole = this.authService.roleAs;
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        alert('คุณไม่มีสิทธิ์เข้าถึง')
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    alert('คุณยังไม่ได้login')
    //this.router.navigate(['/home2']);
    return false;
  }
  
}
