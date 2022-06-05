import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http:HttpClient,
  ) { }

  getPaymentDB(){
    return  this.http.get<any>('http://localhost:3000/payment/getPayment')
    .pipe(map(data =>{

      return data;
    }));
  }

  updatePayment(obj:{bankName:string,accountBank:string,owner:string}){
    return  this.http.put<any>('http://localhost:3000/payment/editPayment',obj)
    .pipe(map(data =>{
      return data;
    }));
  }
}
