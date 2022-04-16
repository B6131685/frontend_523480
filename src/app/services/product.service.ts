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

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      
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

}
