import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SpecModelService } from 'src/app/services/spec-model.service';
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
              private SpecModelService:SpecModelService) { }

  ngOnInit(): void {
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

  FilterAll(){
    this.filterdata = this.product;
  }

  Filter(item:any){
    console.log('filter');
    console.log(item._id);

    this.filterdata = this.product.filter((element:any )=>{
      return element.type._id === item._id
    })
  }

  openDialog(item:any): void {
    const dialogRef = this.dialog.open(DialogHomeShowProduct, {
      width: '50%',
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