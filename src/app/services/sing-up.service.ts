import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class SingUpService {


  data:any;
  constructor(private http:HttpClient) { }

  registerData(Data: any){
    return  this.http.post<any>('http://localhost:3000/users/register',Data)
    .pipe(map(data =>{
      
      
      return data;
  }));
  }
}
