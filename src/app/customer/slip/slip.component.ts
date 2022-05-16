import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-slip',
  templateUrl: './slip.component.html',
  styleUrls: ['./slip.component.css']
})
export class SlipComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  order!:any;
  constructor(
    private CommonService:CommonService,
    private OrderService:OrderService,
    private AuthServices:AuthServicesService,
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }
  
  getOrder(){
    this.OrderService.getOrderNotSlip({idUser:this.AuthServices.idUser}).subscribe(
      data=>{
        // console.log(data);
        this.order = data.data
      },
      error=>{
        this.order = [] 
      }
    )
  }

  addItem(){
    this.getOrder();
    this.newItemEvent.emit();
    this.CommonService.waitVerify();
  }

}
