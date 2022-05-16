import { Component, OnInit,  Input, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShopPageService } from 'src/app/services/shop-page.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
@Component({
selector: 'app-detail-for-slip',
  templateUrl: './detail-for-slip.component.html',
  styleUrls: ['./detail-for-slip.component.css']
})
export class DetailForSlipComponent implements OnInit {
  slipImg!:any;
  previewLoaded!:Boolean
  cart!: any;
  sum = 0;
  shopPage!:any;
  cost_shipping = 0;
  @Input() idCart !: String;
  @Input() order !: any;
  constructor(
    private OrderService:OrderService,
    private ShopPageService:ShopPageService,
    private AuthServices:AuthServicesService,
    private CartService:CartService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    
    this.getCart();
  }

  getShopPage(){
    //get shiipping
    this.ShopPageService.getShopPage().subscribe(
      data=>{
        console.log(data);
        this.shopPage = data
      }
    )
  }

  getCart(){
    this.getShopPage();
    this.CartService.getCartByIDCart(this.order.idCart).subscribe(
      data=>{ 
        this.cart = data.data
        // console.log(this.cart);
        this.sum = 0;
        for (let index = 0; index < this.cart.list.length; index++) {
           this.sum += (this.cart.list[index].quantity * this.cart.list[index].idProduct.price);
        }
        if(this.shopPage?.shipping >= this.sum ){
          this.cost_shipping = this.shopPage.cost_shipping;
        }else{
          this.cost_shipping = 0;
          this.sum += this.cost_shipping;
        }

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

  submit(){
    if(!this.slipImg){
      alert('กรุณาแนปหลักฐานการชำระเงิน')
    }else{
      // alert('โปรดรอแอดมินตรวจสอบหลักฐาน')
      this.OrderService.updateImgSlip({idOrder:this.order._id,img:this.slipImg}).subscribe(
        data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'order has been updated',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error=>{

        }
      )
    }
  }

  showImg(){
    alert('show Img')
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
