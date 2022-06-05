import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  payment :{
    bankName:string,
    accountBank:string,
    owner:string
  } = {bankName:'', accountBank:'', owner:''}

  bankName!:string
  accountBank!:string
  owner!:string
  constructor(
    private PaymentService:PaymentService,
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.PaymentService.getPaymentDB().subscribe(
      data=>{
        this.payment = data.data 
      }
    )
  }

  updatePaymentDB(){
    this.PaymentService.updatePayment(this.payment).subscribe(
      data=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.initData();
      }
    )
  }

}
