import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { ShopPageService } from 'src/app/services/shop-page.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  mode = new FormControl('over');
  iconcart = true;
  panelOpenState = false;
  panelOrderOpenState = false;
  decoded !:any;
  state !: boolean;
  nameShop !: String;
  logo!:String;
  constructor(public CartService:CartService, private ShopPageService:ShopPageService,public localStorage:LocalStorageService,private router: Router,private AuthServicesService:AuthServicesService) { }
  ngOnInit(): void {
    this.iconcart = true;
    this.decoded = this.AuthServicesService.result;
    this.state = this.AuthServicesService.checkLogin();
    this.ShopPageService.getShopPage().subscribe(
      data=>{
        this.nameShop = data.nameShop;
        this.logo = data.logo;
      }
    )
    this.CartService.getCartByUser({idUser:this.AuthServicesService.idUser}).subscribe()
  }

  logout(){
    this.localStorage.clear();
    this.router.navigate(['login']);
  }
  home(){
    this.router.navigate(['user/home']);
  }

  profile(){
    this.router.navigate(['user/profile']);
  }

  cart(){
    this.router.navigate(['user/cart']);
  }

  order(){
    this.router.navigate(['user/order']);
  }
}
