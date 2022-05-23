import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.component.html',
  styleUrls: ['./prepare-order.component.css']
})
export class PrepareOrderComponent implements OnInit {
  
  order!:any;
  constructor(
    private CommonService:CommonService,
    private OrderService:OrderService
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
    this.OrderService.getAllOrderHaveSlipAndVerifyTrue().subscribe(
      data=>{ 
        console.log(data);
        this.order = data.data
      }
    )
  }

}
