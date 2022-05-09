import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServicesService } from '../services/auth-services.service';
import { LocalStorageService } from 'angular-web-storage';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ShopPageService } from '../services/shop-page.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-login-components',
  templateUrl: './login-components.component.html',
  styleUrls: ['./login-components.component.css']
})
export class LoginComponentsComponent implements OnInit {

   decoded !: any;
   nameShop !: String;
  @Output() messageEvent = new EventEmitter<string>();

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private router: Router, 
    private auth:AuthServicesService,
    public localStorage:LocalStorageService,
    private ShopPageService:ShopPageService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.ShopPageService.getShopPage().subscribe(
      data=>{
        this.nameShop = data.nameShop
      }
    )
  }

  singUp(){
    this.router.navigate(['singup']);
   
  }

  home(){
    this.router.navigate(['home']);
  }

  login(){
    this.auth.loginServices(this.authForm.value).subscribe(
      data => { 
        
        const id_token = localStorage.getItem('id_token');
        if(id_token === null){
            alert("faile")
        }else{
             this.decoded = jwtDecode<JwtPayload>(id_token);
        }
        if(this.decoded.role === "admin"){
          this.router.navigate(['admin/stock']);
        }

        if(this.decoded.role === "customer"){
          this.router.navigate(['user/home']);
        }
        console.log("after login working");
      },
      err =>{
        console.log(err);
        
      }
    );
  }

  resetPassword(){
    const dialogRef = this.dialog.open(ResetPasswordDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout(){
    this.localStorage.clear();
  }
  
}


@Component({
  selector: 'dialog-reset-password',
  templateUrl: 'dialog-reset-password.html',
})
export class ResetPasswordDialog {
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}