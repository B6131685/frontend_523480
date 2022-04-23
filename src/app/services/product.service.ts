import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2'; 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  addProduct(Data: any){
    return  this.http.post<any>('http://localhost:3000/product/addProduct',Data)
    .pipe(map(data =>{

      return data;
  }));
  }

  getAllProduct(){
    return  this.http.get<any>('http://localhost:3000/product/getallProduct')
    .pipe(map(data =>{
      if(data){
        console.log("getAllProduct working!!!");
        // console.log(data);
      
      }
      return data;
  }));
  }

  updateProductStock(data:any){
    return  this.http.put<any>('http://localhost:3000/product/updateProductStock',data)
    .pipe(map(data =>{
      if(data){
        console.log("updateProductStock working!!!");
        console.log(data);
      
      }
      return data;
  }));
  }

}
