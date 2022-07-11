import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-show-product',
  templateUrl: './dialog-show-product.component.html',
  styleUrls: ['./dialog-show-product.component.css']
})
export class DialogShowProductComponent implements OnInit {

  product :{ idUser:String, idProduct:String, quantity:Number} = { idUser:'',idProduct:'',quantity:0}

  @Input() item!: any; // get from component that call add product as modal
  loggedIn !: any;
  quntity = 0;

  checkPlusButton = false;
  checkAddToCart = false; //check for disable add to cart button
  constructor(
      public CartService:CartService,
      public LocalStorageService:LocalStorageService,
      public AuthServices:AuthServicesService) {
    
        this.loggedIn = localStorage.getItem('STATE');
        console.log(this.loggedIn);
        
   }

  ngOnInit(): void {
    if(this.item.number === 0){ 
      this.checkAddToCart = true;
      this.checkPlusButton = true;
    } 
  }

  sub(){
    if(this.quntity>0){
      this.quntity -= 1;
      this.checkPlusButton = false;
    }
  }

  plus(){
    if(this.quntity !=this.item.number){
      this.quntity += 1;
    }else{
      this.checkPlusButton = true;
    }
  }

  checkState(){
    if(this.loggedIn === null){
      // alert('โปรดสมัคร')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'คุณยังไม่ได้ log in เข้าสู่ระบบ',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }

    if(this.loggedIn === 'true'){
      // alert('ซิ้อ')
      if(this.quntity == 0){
        alert('ระบุจำนวนสินค้า')
      }else{
        
        this.product.idUser = this.AuthServices.idUser;
        this.product.idProduct = this.item.id;
        this.product.quantity = this.quntity;

        this.CartService.updateCart(this.product).subscribe(
          data =>{
            console.log(data);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'order has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error =>{
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.error.message,
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
        )
        // console.log('before send');
        // console.log(this.product);
      }
    }
  }

}
