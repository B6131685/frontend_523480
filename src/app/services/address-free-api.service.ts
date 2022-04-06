import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { BYPASS_LOG } from './auth-interceptor.service';
@Injectable({
  providedIn: 'root'
})
export class AddressFreeAPIService {
  dataFreeAPI:any;
  constructor(private http:HttpClient) { }

  getDataProvices(){
    return this.http.get<any>('https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces')
    .pipe(map(data => {
      if (data) {
        this.dataFreeAPI = data;
        //console.log(this.products);
      }
      return this.dataFreeAPI;
    }))
  }

  //
  getDataDistricts(data : any){
    return this.http.get<any>('https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/'+data)
    .pipe(map(data => {
      if (data) {
        this.dataFreeAPI = data;
        //console.log(this.products);
      }
      return this.dataFreeAPI;
    }))
  }


  getDataSubDistricts(province: any, district: any){
    return this.http.get<any>('https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/'+province+'/district/'+district)
    .pipe(map(data => {
      if (data) {
        this.dataFreeAPI = data;
        //console.log(this.products);
      }
      return this.dataFreeAPI;
    }))
  }

  //https://search.longdo.com/mapsearch/json/search?keyword=&area=10&span=100km&limit=20&key=[YOUR-KEY-API]
    longDoMAP(postcode: any){
    return this.http.get<any>('https://search.longdo.com/mapsearch/json/search?keyword='+postcode+'&tag=__POST'+postcode+'&key=f27ed4fd4ed5ef942bc088bd54f6c0ef', { context: new HttpContext().set(BYPASS_LOG, true) })
    .pipe(map(data => {
      if (data) {
        this.dataFreeAPI = data;
        //console.log(this.products);
      }
      return this.dataFreeAPI;
    }))
  }

}
