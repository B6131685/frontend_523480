import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopPageService } from 'src/app/services/shop-page.service';
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
    img: []
  };
  previewLoaded: boolean = false;
  addImg !: any;
  constructor(private ShopPageService:ShopPageService) { }

  ngOnInit(): void {
   this.getShopPage();
  }

  getShopPage(){
    this.ShopPageService.getShopPage().subscribe(
      data =>{
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
              this.shopPage = data;
            }
          )
        }
      )
    }
  }

}
