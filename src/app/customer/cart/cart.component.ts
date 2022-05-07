import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData!:any
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
        
      },
      error =>{

      }
    )
  }

}
