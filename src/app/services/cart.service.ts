import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { AuthServicesService } from './auth-services.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  AllQuantity=0;
  
  constructor(
    private http:HttpClient,
    private AuthServices:AuthServicesService) { }

  updateCart(data:{ idUser:String, idProduct:String, quantity:Number}){
    return  this.http.put<any>('http://localhost:3000/cart/updateCart',data)
    .pipe(map(data =>{
      if(data){
        this.getCart({idUser:this.AuthServices.idUser}).subscribe();
        console.log(data);
      }
      return data;
  }));
  }

  getCart(data:{idUser:String}){
    return  this.http.put<any>('http://localhost:3000/cart/getcart',data)
    .pipe(map(data =>{
      if(data){
        this.AllQuantity = data.data.list.length;
        // for (let index = 0; index < data.data.list.length; index++) {
        //   // this.AllQuantity += data.data.list[index];
        //   this.AllQuantity += (index+1);
        // }
      }
      return data;
  }));
  }

  //
  updateReplaceCart(data:{idUser:any,list:{idProduct:any, quantity:number, _id:String}[]}){
    return  this.http.put<any>('http://localhost:3000/cart/replaceCart',data)
    .pipe(map(data =>{
      if(data){
        console.log(data);
      }
      return data;
  }));
  }



}
