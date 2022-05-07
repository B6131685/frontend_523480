import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  number=0;
  
  constructor(private http:HttpClient) { }

  updateCart(data:{ idUser:String, idProduct:String, quantity:Number}){
    return  this.http.put<any>('http://localhost:3000/cart/updateCart',data)
    .pipe(map(data =>{
      if(data){
        console.log(data);
      }
      return data;
  }));
  }

  getCart(data:{idUser:String}){
    return  this.http.put<any>('http://localhost:3000/cart/getcart',data)
    .pipe(map(data =>{
      if(data){
        
      }
      return data;
  }));
  }

}
