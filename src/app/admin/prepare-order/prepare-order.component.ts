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
  Tracking='';
  expressCompany='';
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

  saveIdTracking(order:any){
    console.log(this.Tracking);
    console.log(this.expressCompany);
    
    if(this.Tracking != '' && this.expressCompany != ''){

      this.OrderService.updateIDTracking({idOrder:order._id,idTracking:this.Tracking, expressCompany:this.expressCompany }).subscribe(
        data=>{
          console.log(data);
          this.CommonService.adminVerifySlip();
        }
        )
    }else{
      alert('กรอก id trakcing')
    }
  }


}
