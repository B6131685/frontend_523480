import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SpecModelService } from 'src/app/services/spec-model.service';
import { ShopPageService } from 'src/app/services/shop-page.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product!:any;
  specModel!:any;
  filterdata !: any;
  shopPage : { _id:String ,nameShop:String, img:String[] }={ _id:'', nameShop:'', img:[]}
  showImg !: String;
  indexImg = 0;
  FooterData = {mail:'',tel:'',address:''}
  constructor(private router: Router,
              private ProductService:ProductService,
              public dialog: MatDialog,
              private SpecModelService:SpecModelService,
              private ShopPageService:ShopPageService) { }

  ngOnInit(): void {
    this.ShopPageService.getShopPage().subscribe(
      data =>{
        this.shopPage = data;
        console.log(this.shopPage);
        this.showImg = data.img[0]
        this.FooterData.address = data.address;
        this.FooterData.mail = data.mail;
        this.FooterData.tel = data.tel;
        console.log(this.FooterData);
        
      }
    )

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

  PreviousImg(){
    if(this.indexImg != 0){
      this.indexImg -= 1;
      this.showImg = this.shopPage.img[this.indexImg];
    }
  }

  NextImg(){
    if(this.indexImg != this.shopPage.img.length -1){
      this.indexImg += 1;
      this.showImg = this.shopPage.img[this.indexImg];
    }
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