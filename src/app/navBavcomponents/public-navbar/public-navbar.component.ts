import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {

  product!:any;
  constructor(private router: Router, AuthServicesService:AuthServicesService,private ProductService:ProductService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ProductService.getAllProduct().subscribe(
      data =>{
        this.product = data.data
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


  openDialog(item:any): void {
    const dialogRef = this.dialog.open(DialogHomeShowProduct, {
      width: '80%',
      height: '90%',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'dialog-show-detail-dialog',
  templateUrl: 'dialog-show-detail.html',
})
export class DialogHomeShowProduct {
  constructor(
    public dialogRef: MatDialogRef<DialogHomeShowProduct>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}