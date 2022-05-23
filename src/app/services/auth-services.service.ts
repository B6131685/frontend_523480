import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  loginMode = false;

  idUser!:string;
  roleAs!: string;
  result !: any;
  nameUser!:String;
  constructor(private http: HttpClient,public localStorage:LocalStorageService ) { }

  loginServices(authData: any){
    return  this.http.post<any>('http://localhost:3000/users/login',authData)
    .pipe(map(data =>{
      if(data){
        
        // console.log(data);
        const decoded = jwtDecode<JwtPayload>(data.access_token);
        // console.log("after decode");
        // console.log(decoded);
        this.result = decoded;
        this.roleAs = this.result.role;
        this.nameUser = this.result.name;
        // console.log(this.roleAs);
        
        localStorage.setItem('id_token', data.access_token);
        localStorage.setItem('STATE', 'true');
    
        this.loginMode = true;
        // this.getMe();
      }
      return data;
  }));
  }

  checkLogin(){
    const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true'){

          const idtoken = localStorage.getItem('id_token');
          if(idtoken!=null){
            const decoded = jwtDecode<JwtPayload>(idtoken);
              
            this.result = decoded;
            // console.log(this.result);
            this.idUser = this.result.id;
            this.roleAs = this.result.role;
          }
          // console.log("decode in checkLogin =");
          
          // console.log(decoded);
        
          return true;
        }
        else{
          
          return false;
          //alert('คุณยังไม่ได้ login');
        }
  }

  getDataUserByID(){
    const idtoken = localStorage.getItem('id_token');
    let id
    if(idtoken!=null){
      const decoded = jwtDecode<JwtPayload>(idtoken);
        
      this.result = decoded;
      // console.log(result);
      
      id = this.result.id;
    }
    return  this.http.get<any>('http://localhost:3000/users/me/'+id)
    .pipe(map(data =>{
      return data;
    }));
  }


}
