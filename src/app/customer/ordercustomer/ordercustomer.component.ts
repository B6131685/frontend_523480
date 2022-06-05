import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-ordercustomer',
  templateUrl: './ordercustomer.component.html',
  styleUrls: ['./ordercustomer.component.css']
})
export class OrdercustomerComponent implements OnInit {

  payment :{
    bankName:string,
    accountBank:string,
    owner:string
  } = {bankName:'', accountBank:'', owner:''}
  constructor(
      private  ActivatedRoute:ActivatedRoute, 
      private Router:Router,
      private PaymentService:PaymentService,
  ) { }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment(){
    this.PaymentService.getPaymentDB().subscribe(
      data=>{
        this.payment = data.data 
      }
    )
  }

  addItem(){
  
  }


}
