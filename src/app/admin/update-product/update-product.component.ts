import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
export interface stucture {
  name: string
  value: string
}


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() item!: any; // get from component that call add product as modal
  select = "";
  productOne !:any;
  bufferspec !: stucture[];
  price !: Number;
  stock !: Number;
  img !:any;
  constructor(
    public dialog: MatDialog,
    private ProductService:ProductService, 
  ) 
  {}

  ngOnInit(): void {
    // this.select = this.item.type; 
    this.getProductByID();
  }

  getProductByID(){
    try {
      
      this.ProductService.getOneProduct(this.item.id).subscribe(
        data=>{
          // console.log(data);
          
          this.productOne = data;
          // for (let index = 0; index < this.productOne.spec.length; index++) {
          //   this.bufferspec.push(new FormControl());
          //   this.bufferspec.at(index).setValue(this.productOne.spec[index]);   
          // }\
          this.img = this.productOne.img;
          this.stock = this.productOne.number;
          this.price = this.productOne.price;
          this.select = this.productOne.type.name;
          this.bufferspec = this.productOne.spec;
          // console.log(this.bufferspec);
          
        },
        err =>{
          console.log(err);
          
        } 
      )

    } catch (error) {
      
    }
  }

  // get getbufferspec() { //for HTML can list spec Array
  //   return this.bufferspec
  // }

  onChangeSubSpec(item:any,Form:any,i:number){
    console.log(item);
    console.log(Form);
    console.log(i);
    this.bufferspec[i].value = Form;
  }

  // detect img
  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img = reader.result
      }
    }
  }

  updateProduct(){
    this.productOne.img        = this.img ;      
    this.productOne.number     = this.stock;     
    this.productOne.price      = this.price ;       
    this.productOne.spec       = this.bufferspec;
    // this.productOne.type       = this.productOne.type._id; 
    console.log('updateProduct');
    console.log(this.productOne);  

    this.ProductService.updateProductOne(this.productOne).subscribe(
      data=>{
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Update',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err =>{
        console.log(err);
        
      }
    )

  } 


  openDialogEditTypeProduct(){
    const dialogRef = this.dialog.open(DialogEditSpecAtUpdateProductComponent, {
      width: '80%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe( ()=> {
    
    });
  }

}// close


@Component({
  selector: 'dialog-edit-spec',
  templateUrl: 'dialog-edit-spec.html',
})
export class DialogEditSpecAtUpdateProductComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditSpecAtUpdateProductComponent>,
    // @Inject(MAT_DIALOG_DATA) public data:ProductData ,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}