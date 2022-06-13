import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-wait-to-verify-payment',
  templateUrl: './wait-to-verify-payment.component.html',
  styleUrls: ['./wait-to-verify-payment.component.css']
})
export class WaitToVerifyPaymentComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  order!:any;
  constructor(
    private CommonService:CommonService,
    private OrderService:OrderService,
    private AuthServices:AuthServicesService,
    private CartService:CartService,
  ) { }

  ngOnInit(): void {
    this.getOrder();
    this.CommonService.newItemEvent.subscribe(
      ()=>{
        this.getOrder();
      }
    )
  }

  getOrder(){
    this.OrderService.getOrderHaveSlip({idUser:this.AuthServices.idUser}).subscribe(
      data=>{
        // console.log(data);
        this.order = data.data
      }
    )
  }

  addItem(){
    this.getOrder();
    this.newItemEvent.emit();
    this.CommonService.waitVerify();
  }

}
