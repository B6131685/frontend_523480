import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData!:{_id:String,list:{_id:String,idProduct:any, quantity:Number}[]}
  constructor(
     public CartService:CartService,
     private AuthServices:AuthServicesService 
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    const id = this.AuthServices.idUser
    this.CartService.getCart({idUser:id}).subscribe(
      data=>{
        console.log(data);
        this.cartData = data.data
      },
      error =>{
      }
    )
  }

}
