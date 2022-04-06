import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2'; // npm install sweetalert2

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

}
