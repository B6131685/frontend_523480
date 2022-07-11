import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-cancle-order',
  templateUrl: './cancle-order.component.html',
  styleUrls: ['./cancle-order.component.css']
})
export class CancleOrderComponent implements OnInit {


  order!:any;
  constructor(
    private AuthServices:AuthServicesService,
    private OrderService:OrderService,
    private CommonService:CommonService,
  ) { 
    
  } 

  ngOnInit(): void {
    this.getOrder();
    this.CommonService.newItemEvent.subscribe(
      ()=>{
        this.getOrder();
      }
    )
  }

  getOrder(){
    this.OrderService.getOrderNotActive(this.AuthServices.idUser).subscribe(
      data=>{
        this.order = data.data.reverse();
        console.log(data);
      }
    )
  }
}
