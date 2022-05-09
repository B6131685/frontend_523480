import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import jwtDecode, { JwtPayload } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,public localStorage:LocalStorageService) { }


  
  EditUserByID(obj:{_id:String,email:String, location:{postcode:Number,area:'', address:String}[], name:String}){
    return  this.http.put<any>('http://localhost:3000/users/editProfile',obj)
    .pipe(map(data =>{
      return data;
    }));
  }

  changeEmail(obj:{email:String, userID:String}){
    return  this.http.put<any>('http://localhost:3000/users/changeEmail',obj)
    .pipe(map(data =>{
      return data;
    }));
  }

  changePassword(obj:{oldPassword:String,newPassword:String,userID:String}){
    return  this.http.put<any>('http://localhost:3000/users/changePassword',obj)
    .pipe(map(data =>{
      return data;
    }));
  }
}
