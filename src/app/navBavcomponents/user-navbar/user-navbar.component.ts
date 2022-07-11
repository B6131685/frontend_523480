import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { ShopPageService } from 'src/app/services/shop-page.service';
import { CartService } from 'src/app/services/cart.service';
import { SpecModelService } from 'src/app/services/spec-model.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  mode = new FormControl('side');
  iconcart = true;
  panelOpenState = false;
  panelOrderOpenState = false;
  decoded !:any;
  state !: boolean;
  nameShop !: String;
  logo!:String;
  modeCart = false;
  modeHome = false;

  specModel!:any;
  FooterData = {mail:'',tel:'',address:''}

  constructor(
    public CartService:CartService,
     private ShopPageService:ShopPageService,
     public localStorage:LocalStorageService,
     private router: Router,
     private AuthServicesService:AuthServicesService,
     private CommonService:CommonService,
     private SpecModelService:SpecModelService) { }
  ngOnInit(): void {
    this.iconcart = true;
    this.decoded = this.AuthServicesService.result;
    this.state = this.AuthServicesService.checkLogin();
    this.ShopPageService.getShopPage().subscribe(
      data=>{
        this.nameShop = data.nameShop;
        this.logo = data.logo;
        this.FooterData.address = data.address;
        this.FooterData.mail = data.mail;
        this.FooterData.tel = data.tel;
      }
    )

    this.CommonService.name.subscribe(
      ()=>{
        this.decoded = this.AuthServicesService.result;
      }
    )

    this.CartService.getCartByUser({idUser:this.AuthServicesService.idUser}).subscribe()

    this.SpecModelService.getSpec().subscribe(
      data =>{
        this.specModel = data.data;
      }
    ) 
  }

  logout(){
    this.localStorage.clear();
    this.router.navigate(['login']);
  }
  home(){
    this.modeHome = true;
    this.modeCart = false;
    this.router.navigate(['user/home']);
  }

  profile(){
    this.modeHome = false;
    this.modeCart = false;
    this.router.navigate(['user/profile']);
  }

  cart(){
    this.modeHome = false;
    this.modeCart = true;
    this.router.navigate(['user/cart']);
  }

  order(){
    this.modeHome = false;
    this.modeCart = false;
    this.router.navigate(['user/order']);
  }
}
