import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient,
  ) { }

  addOrder(Data: {idCart:String,idUser:String}){
    return  this.http.post<any>('http://localhost:3000/order/addOrder',Data)
    .pipe(map(
      data =>{

      return data;
      }
    ));
  }

  getOrderNotSlip(obj:{idUser:String}){
    return  this.http.post<any>('http://localhost:3000/order/getOrderNotslip',obj)
    .pipe(map(data =>{

      return data;
    }));
  }

}
