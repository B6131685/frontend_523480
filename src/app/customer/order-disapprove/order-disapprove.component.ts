import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
@Component({
  selector: 'app-order-disapprove',
  templateUrl: './order-disapprove.component.html',
  styleUrls: ['./order-disapprove.component.css']
})
export class OrderDisapproveComponent implements OnInit {

  order!:any;
  constructor(
    private OrderService:OrderService,
    private AuthServices:AuthServicesService,
    ) { 

  }

  ngOnInit(): void {
    this.OrderService.getAllOrderDisapprove(this.AuthServices.idUser).subscribe(
      data=>{
        console.log(data);
        this.order = data.data.reverse();
      },
      error =>{
        console.log(error);
      }
    )
  }

}
