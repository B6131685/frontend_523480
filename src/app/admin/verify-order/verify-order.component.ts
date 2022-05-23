import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-verify-order',
  templateUrl: './verify-order.component.html',
  styleUrls: ['./verify-order.component.css']
})
export class VerifyOrderComponent implements OnInit {

  order!:any;
  constructor(
    private OrderService:OrderService,
    private CommonService:CommonService
  ) { }

  ngOnInit(): void {
    this.getAllOrder();

    this.CommonService.newVerifySlip.subscribe(
      ()=>{
        this.getAllOrder();
      }
    )
  }

  getAllOrder(){
    this.OrderService.getAllOrderHaveSlip().subscribe(
      data=>{ this.order = data.data }
    )
  }

}
