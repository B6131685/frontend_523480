import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SpecModelService } from 'src/app/services/spec-model.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { ShopPageService } from 'src/app/services/shop-page.service';
@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {
  
  logo!:String;
  product!:any;
  nameShop !: String;
  specModel!:any;
  filterdata !: any;
  constructor(private router: Router,
              private ProductService:ProductService,
              public dialog: MatDialog,
              private SpecModelService:SpecModelService,
              private AuthServicesService:AuthServicesService,
              private ShopPageService:ShopPageService) { }

  ngOnInit(): void {

    this.ShopPageService.getShopPage().subscribe(
      data =>{
        this.nameShop = data.nameShop;
        this.logo = data.logo;
      }
    )

    if(this.AuthServicesService.checkLogin()){
      this.router.navigate(['user/home']);
    }

    this.ProductService.getAllProduct().subscribe(
      data =>{
        this.product = data.data
        this.filterdata = data.data
      })

    this.SpecModelService.getSpec().subscribe(
      data =>{
        this.specModel = data.data;
      }
    )  
  }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
    this.router.navigate(['']);
    // this.loginbutton = false;
  }

  

}


