import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SpecModelService } from 'src/app/services/spec-model.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {

  product!:any;
  specModel!:any;
  filterdata !: any;
  constructor(private router: Router,
              private ProductService:ProductService,
              public dialog: MatDialog,
              private SpecModelService:SpecModelService,
              private AuthServicesService:AuthServicesService) { }

  ngOnInit(): void {

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


