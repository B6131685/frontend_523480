import { Component, OnInit,  Input, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShopPageService } from 'src/app/services/shop-page.service';
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
  constructor(
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
    this.CartService.getCartByIDCart(this.idCart).subscribe(
      data=>{ 
        this.cart = data.data
        // console.log(this.cart);
        this.sum = 0;
        for (let index = 0; index < this.cart.list.length; index++) {
           this.sum += (this.cart.list[index].quantity * this.cart.list[index].idProduct.price);
        }
        if(this.shopPage?.shipping >= this.sum ){
          console.log('sum น้อยกว่า');
          
          this.cost_shipping = this.shopPage.cost_shipping;
        }else{
          console.log('sum มากกว่า');
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
      alert('โปรดรอแอดมินตรวจสอบหลักฐาน')
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
