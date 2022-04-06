import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { AdminNavbarComponent } from '../navBavcomponents/admin-navbar/admin-navbar.component';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  loginMode = false;
  roleAs!: string;
  result !: any;

  constructor(private http: HttpClient,public localStorage:LocalStorageService ) { }

  loginServices(authData: any){
    return  this.http.post<any>('http://localhost:3000/users/login',authData)
    .pipe(map(data =>{
      if(data){
        
        console.log(data);
        const decoded = jwtDecode<JwtPayload>(data.access_token);
        console.log("after decode");
        console.log(decoded);
        this.result = decoded;
        this.roleAs = this.result.role;
        console.log(this.roleAs);
        
        localStorage.setItem('id_token', data.access_token);
        localStorage.setItem('STATE', 'true');
        this.loginMode = true;
      }
      return data;
  }));
  }

  checkLogin(){
    const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true'){
          return true;
        }
        else{
          alert('คุณยังไม่ได้ login');
          return false;
          //alert('คุณยังไม่ได้ login');
        }
  }

  getMe(){
    return  this.http.get<any>('http://localhost:3000/users/me')
    .pipe(map(data =>{
      if(data){
        console.log("getMe working!!!");
        console.log(data);
      
      }
      return data;
  }));
  }

}
