import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShopPageService {


  constructor(private http:HttpClient) { }

  getShopPage(){
    return  this.http.get<any>('http://localhost:3000/shopPage/getShopPage')
    .pipe(map(data =>{
      // console.log(data);
      
      return data.data;
  }));
  }

  pushImgToShopPage(img2:any){
    console.log(img2);
    
    return  this.http.put<any>('http://localhost:3000/shopPage/pushImgToShopPage',img2)
    .pipe(map(data =>{
      return data.data;
  }));
  }

  deleteOneImg(name:String){
    return  this.http.put<any>('http://localhost:3000/shopPage/deleteImgFromShopPage',{'name':name})
    .pipe(map(data =>{
      return data;
    }));
  }

  editNameShop(obj:{newName:String,shipping:Number, cost_shipping: Number}){
    return  this.http.put<any>('http://localhost:3000/shopPage/editNameShop',obj)
    .pipe(map(data =>{
      return data;
    }));
  }

  editShipping(obj:{shipping:Number}){
    return  this.http.put<any>('http://localhost:3000/shopPage/editNameShop',obj)
    .pipe(map(data =>{
      return data;
    }));
  }
}
