import { Component, OnInit,OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { ShopPageService } from 'src/app/services/shop-page.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {

  summary=0;
  shipping=0;

  costShipping = 0;
  shopPageData!:{ shipping:Number, cost_shipping: Number}
  cartData!:{_id:String,list:{_id:String,idProduct:any, quantity:number}[]}
  constructor(
     private ShopPageService:ShopPageService,
     public CartService:CartService,
     private AuthServices:AuthServicesService,
     private OrderService:OrderService 
  ) { }

  ngOnInit(): void {
    this.getShipping();
    this.getCart();
  }

  //{ idUser: , list:{}[]}
  ngOnDestroy() {

  }

  getShipping(){
    this.ShopPageService.getShopPage().subscribe(
      data=>{
        // console.log(data.shipping);
        // this.costShipping = data.shipping
         this.shopPageData = { ...data }
        console.log(this.shopPageData);
      }
    )
  }

  getCart(){
    const id = this.AuthServices.idUser
    this.CartService.getCartByUser({idUser:id}).subscribe(
      data=>{
        console.log(data);
        this.summary = 0;
        this.cartData = data.data
        for (let index = 0; index < data.data.list.length; index++) {
          this.summary += (data.data.list[index].idProduct.price*data.data.list[index].quantity);
        }
        console.log(this.costShipping);
        
        if(this.summary < this.shopPageData.shipping && data.data.list.length > 0){
          this.shipping =  Number(this.shopPageData.cost_shipping);
        }else{
          this.shipping = 0 ;
        }

      },
      error =>{
      }
    )
  }

  subQuantityCart(index:number){
    this.CartService.updateCart({idUser:this.AuthServices.idUser,idProduct:this.cartData.list[index].idProduct._id,quantity: -1}).subscribe(
      data=>{
        this.getCart();
      }
    )
  }

  plusQuantityCart(index:number){

  if( this.cartData.list[index].quantity + 1 <= this.cartData.list[index].idProduct.number){

      this.CartService.updateCart({idUser:this.AuthServices.idUser,idProduct:this.cartData.list[index].idProduct._id,quantity: 1}).subscribe(
        data=>{
          this.getCart();
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        text: 'สินถึงจำนวนจำกัดเบื้องต้น',
      })
    }
  }

  checkOutCart(){
    console.log('check Out Cart');
    if(this.cartData.list.length == 0){
      alert('ไม่มีรายการสินค้า')
    }else{
      
      this.OrderService.addOrder({
        idCart: this.cartData._id,
        idUser: this.AuthServices.idUser,
        
      }).subscribe(
        data=>{
          // console.log(data);
          
          this.getCart();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'order has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    }

  
  }

  delete(index:any){
    console.log('Delete');
    this.CartService.updateCart({idUser:this.AuthServices.idUser,idProduct:this.cartData.list[index].idProduct._id,quantity: -1*this.cartData.list[index].quantity }).subscribe(
      data=>{
        this.getCart();
      }
    )
    
  }

}
