import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
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
  constructor(
      public CartService:CartService,
      public LocalStorageService:LocalStorageService,
      public AuthServices:AuthServicesService) {
    this.loggedIn = localStorage.getItem('STATE');
    console.log(this.loggedIn);
    
   }

  ngOnInit(): void {
  }

  sub(){
    if(this.quntity>0){
      this.quntity -= 1
    }
  }

  plus(){
    this.quntity += 1
  }

  checkState(){
    if(this.loggedIn === null){
      alert('โปรดสมัคร')
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
          },
          error =>{
            console.log(error);
          }
        )
        // console.log('before send');
        // console.log(this.product);
      }
    }
  }

}
