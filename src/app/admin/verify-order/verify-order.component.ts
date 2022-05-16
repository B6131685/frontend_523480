import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-verify-order',
  templateUrl: './verify-order.component.html',
  styleUrls: ['./verify-order.component.css']
})
export class VerifyOrderComponent implements OnInit {

  order!:any;
  constructor(
    private OrderService:OrderService
  ) { }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(){
    this.OrderService.getAllOrderHaveSlip().subscribe(
      data=>{ this.order = data.data }
    )
  }

}
