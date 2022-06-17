import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopPageService } from 'src/app/services/shop-page.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { addresssDialog } from 'src/app/customer/profile/profile.component';
@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  @ViewChild("myInputImg") myInputImg !: ElementRef;

  shopPage = { 
    _id:String,
    nameShop:String,
    shipping:Number,
    cost_shipping:Number,
    img: [],
    mail:String,
    tel:String,
    address:'',
    logo:''
  };
  previewLoaded: boolean = false;
  addImg !: any;

  constructor(
    public dialog: MatDialog,
    private ShopPageService:ShopPageService,) { }

  ngOnInit(): void {
   this.getShopPage();
  }

  getShopPage(){
    this.ShopPageService.getShopPage().subscribe(
      data =>{
        console.log(data);
        this.shopPage = data;
      }
    )
  }


  delete(item:any){
    console.log(item);
    const pattern = new RegExp('http://localhost:3000/images/');
    const splittedArray = item.split(pattern);
    // console.log(splittedArray);
    let str = splittedArray[1]
    console.log(str);
    this.ShopPageService.deleteOneImg(str).subscribe(
      data=>{
        this.getShopPage();
      }
    )
  }

  editNameShop(){
    // console.log(typeof(this.shopPage.nameShop));
    
    this.ShopPageService.editNameShop({
      newName:this.shopPage.nameShop.toString(),
      shipping: Number(this.shopPage.shipping),
      cost_shipping: Number(this.shopPage.cost_shipping), 
      mail:this.shopPage.mail.toString(),
      tel:this.shopPage.tel.toString(),
      address:this.shopPage.address.toString(),
      logo:this.shopPage.logo
      }).subscribe(
      data=>{
       
        this.getShopPage();
        window.location.reload();
      }
    )
  }

  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded= true;
        this.addImg = reader.result
      }
    }
  }

  onChangeLogo(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.previewLoaded= true;
        if(reader.result != null){
          this.shopPage.logo = reader.result.toString()
        }
      }
    }
  }

  pushNewImg(){
    if(this.addImg != '' && this.addImg != null){
      // console.log(this.addImg);
      
      this.ShopPageService.pushImgToShopPage({img:this.addImg}).subscribe(
        data=>{
          this.previewLoaded = false;
          this.addImg = '';
          this.myInputImg.nativeElement.value = '';
          this.ShopPageService.getShopPage().subscribe(
            data =>{
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              });
              this.shopPage = data;
              
            }
          )
        }
      )
    }
  }

  editShipping(){

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(addresssDialog, {
      width: '500px',
    }); 

   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.newAddress = result;
      console.log(result);
      if(result != undefined){
        // this.user.location.push(result);
        this.shopPage.address = String(result.address.toString()+ ' ' + result.area.toString()+ ' ' + result.postcode.toString());
      }
      // console.log(this.newAddress);
      
    });
  }

}
