import { Component, OnInit,  Input, Inject,  Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShopPageService } from 'src/app/services/shop-page.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
selector: 'app-detail-for-slip',
  templateUrl: './detail-for-slip.component.html',
  styleUrls: ['./detail-for-slip.component.css']
})
export class DetailForSlipComponent implements OnInit {
  
  //send to refresh orfer after save slip
  @Output() newItemEvent = new EventEmitter<string>();

  userData!:any;
  slipImg!:any;
  previewLoaded!:Boolean
  cart!: any;
  sum = 0;
  shopPage!:any;
  cost_shipping = 0;
  roleas !:String;

  DBshipping = 0;

  selectAddress = '';
  address = '';
  @Input() idCart !: String;
  @Input() order !: any;
  constructor(
    private UserService:UserService,
    private OrderService:OrderService,
    private ShopPageService:ShopPageService,
    private AuthServices:AuthServicesService,
    private CartService:CartService,
    public dialog: MatDialog
  ) { 
    this.roleas = this.AuthServices.roleAs 
    // console.log(this.roleas);
    
  }

  ngOnInit(){
    this.getShopPage();
    this.getUser();
    
  }

  getUser(){
    this.AuthServices.getDataUserByID().subscribe(
      data=>{
        // console.log(data.data);
        this.userData =data.data
      }
    )
  }

  getShopPage(){
    //get shiipping
    this.ShopPageService.getShopPage().subscribe(
      data=>{
        console.log('get ShopPage');
        console.log(data);
        this.shopPage = data;
        this.DBshipping = data.shiipping;
        this.getCart();
      }
    )
  }

  getCart(){
   
    this.CartService.getCartByIDCart(this.order.idCart).subscribe(
      data=>{ 
        this.cart = data.data
        // console.log(this.cart);
        this.sum = 0;
        for (let index = 0; index < this.cart.list.length; index++) {
           this.sum += (this.cart.list[index].quantity * this.cart.list[index].idProduct.price);
        }
        console.log('before if condition'+this.cart);
        console.log(this.shopPage);
        // console.log(this.DBshipping );
        if(this.shopPage.shipping >= this.sum ){
          this.cost_shipping = this.shopPage.cost_shipping;
        }else{
          this.cost_shipping = 0
        }
        this.sum += this.cost_shipping;
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
        this.slipImg = reader.result
      }
    }
  }

  //
  refreshOrder() {
    this.newItemEvent.emit();
  }

  submit(){
    if(this.selectAddress == ''){
      alert('กรุณาเลือกที่อยู่')
    }else if(!this.slipImg){
      alert('กรุณาแนปหลักฐานการชำระเงิน')
    }else{

      console.log(this.selectAddress);
      for (let index = 0; index < this.userData.location.length; index++) {
        if(this.userData.location[index]._id == this.selectAddress){
          this.address = ' '+this.userData.location[index].address+' '+ this.userData.location[index].area+' '+this.userData.location[index].postcode.toString()
        }
      }
      console.log(this.address);

      // alert('โปรดรอแอดมินตรวจสอบหลักฐาน')
      this.OrderService.updateImgSlip({idOrder:this.order._id,img:this.slipImg, address: this.address}).subscribe(
        data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'โปรดรอแอดมินตรวจสอบหลักฐาน',
            showConfirmButton: false,
            timer: 1500
          });

          this.refreshOrder()

        },
        error=>{

        }
      )
    }
  }

  approve(){
    console.log('approve');
    console.log(this.order);
  }

  notApproved(){
    console.log('Not approve');
    console.log(this.order);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: this.slipImg,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: this.order.slipVerification,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}



@Component({
  selector: 'dialog-show-slipImg.css',
  templateUrl: 'dialog-show-slipImg.html',
  styleUrls: ['./detail-for-slip.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
