import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-order-approve',
  templateUrl: './order-approve.component.html',
  styleUrls: ['./order-approve.component.css']
})
export class OrderApproveComponent implements OnInit {

  order!:any;
  constructor(
    private OrderService:OrderService,
    private CommonService:CommonService,
  ) { }

  ngOnInit(): void {
    this.getOrder();
    this.CommonService.newVerifySlip.subscribe(
      ()=>{
        this.getOrder();
      }
    )
  }

  
  getOrder(){
    this.OrderService.getAllOrderAlreadySend().subscribe(
      data=>{
        console.log(data);
        
        this.order = data.data;
      },
      error =>{
        console.log(error);
      }
    )
  }


}
