import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-express-form',
  templateUrl: './express-form.component.html',
  styleUrls: ['./express-form.component.css']
})
export class ExpressFormComponent implements OnInit {

  Tracking='';
  expressCompany='';
  @Input() order !: any;
  constructor(
    private CommonService:CommonService, 
    private OrderService:OrderService) { }

  ngOnInit(): void {
  }

  saveIdTracking(){
    console.log(this.Tracking);
    console.log(this.expressCompany);
    
    if(this.Tracking != '' && this.expressCompany != ''){

      this.OrderService.updateIDTracking({idOrder:this.order._id,idTracking:this.Tracking, expressCompany:this.expressCompany }).subscribe(
        data=>{
          console.log(data);
          this.CommonService.adminVerifySlip();
        }
        )
    }else{
      Swal.fire({
        icon: 'error',
        text: 'กรอกข้อมูลไม่ครบ',
      })
    }
  }


}
