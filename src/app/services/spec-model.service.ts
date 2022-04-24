import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})
export class SpecModelService {

  constructor(private http:HttpClient) { }

  registerSpec(Data: any){
    return  this.http.post<any>('http://localhost:3000/specs/addSpec',Data)
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

  getSpec(){
    return  this.http.get<any>('http://localhost:3000/specs/getSpec')
    .pipe(map(data =>{
      return data;
  }));
  }

  delete(id:String){
    return  this.http.delete<any>('http://localhost:3000/specs/deleteSpec/'+id)
    .pipe(map(data =>{
      return data;
    }));
  }

  update(id_for_update:String,Data: any){
    return  this.http.put<any>('http://localhost:3000/specs/updateSpec/'+id_for_update,Data)
    .pipe(map(data =>{
      return data;
    }));
  }

}
