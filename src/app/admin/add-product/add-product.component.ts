import { Component, OnInit, Renderer2, ViewChild, ElementRef,Inject,Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { SpecModelService } from 'src/app/services/spec-model.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductData } from '../stock/stock.component';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  isLinear = true;
  
  previewLoaded: boolean = false; //for show image is added
  list !: any;
  specs!: any;
  reuse!: any;
  select ="";
  techSpec : {name:"",value:""}[] = [];

  @Input() item!: any; // get from component that call add product as modal

  testmodel = new FormGroup({
    testproduct: new FormArray([
      new FormControl({
        nameTechSpec: new FormControl(''),
        mention: new FormControl('')
      })
    ])
  });


  @ViewChild("myForm") myForm !: ElementRef;
  @ViewChild("myForm2") myForm2 !: ElementRef;
  @ViewChild("div") div !: ElementRef;
  @ViewChild("myFormPrice") myFormPrice !: ElementRef;
 

  product = new FormGroup({
    price: new FormControl(''),
    typespec: new FormControl(''), //เก็บไอดีแล้วทำ $lookup
    spec: new FormArray([]),
    img: new FormControl(''),
  });


  constructor(
    private SpecModelService: SpecModelService,
    private ProductService: ProductService,
    private router: Router,
    public dialog: MatDialog,
  ) {
   
    
  }

  ngOnInit(): void {
    
    this.getSpecs();
    console.log("item product you want to edit");
    console.log(this.item);
  }

  getSpecs() {
    try {
      this.SpecModelService.getSpec().subscribe((data) => {
        this.specs = data.data;
        this.select = data.data[0].name; // select เลือกตัวแรกให้แสดงไว้ก่อน
        this.list = data.data[0].spec; // นำข้อมูลของ สินค้าประเภทไปสร้าง form

        for (let index2 = 0; index2 < this.specs[0].spec.length; index2++) {
           this.techSpec.push({
              name: this.list[index2],
              value: ""   
           })
         }

        if (!data) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'cannot get Specs data',
          });
        }
      });
    } catch (error) {}
  }

  onChangeModel(){
    console.log("change working");
    this.techSpec = [];
    this.list = [];
    for (let index = 0; index < this.specs.length; index++) {
      if(this.specs[index].name === this.select){
         this.list = this.specs[index].spec
         console.log("in for loop");
         console.log(this.specs[index].spec);
         
         for (let index2 = 0; index2 < this.specs[index].spec.length; index2++) {

          this.myForm.nativeElement.value = "";

          this.testmodel.value.testproduct.push(new FormControl({
            nameTechSpec: new FormControl(this.list[index2]),
            mention: new FormControl('')
          }))

           this.techSpec.push({
              name: this.list[index2],
              value: ""   
           })
         }
      }
    }
    this.reuse = this.testmodel.value.testproduct.value;
    console.log(this.techSpec);
    
    //  await this.myForm.nativeElement;
    //  this.myForm.nativeElement.value = "";
    this.myForm.nativeElement.reset();
    
    this.myFormPrice.nativeElement.value = 0;
        
    // console.log(this.list);
  }

  onChangeSubSpec(item:any,Form:any,i:number){
    // console.log(item);
    // console.log(Form);
    // console.log(i);
    if(this.techSpec.length>0){
      this.techSpec[i].value=Form
    }
  }

  addSpec(){
    this.list.push(new FormControl(''));
  }

  submitProduct(){
    console.log(this.techSpec);
    
    
    for (let index = 0; index < this.techSpec.length; index++) {
      this.product.value.spec.push(this.techSpec[index]);
    }

    this.ProductService.addProduct(this.product.value).subscribe(
      data => {
        console.log(data);
        this.product.reset();  
        this.getSpecs();
        this.myForm.nativeElement.reset();
        this.myFormPrice.nativeElement.value = 0;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        
      },
      err=>{
        console.log(err.error.error.message);
        alert(err.error.error.message) 
        //data.splice(0, data.length)
        // this.model.value.spec.length = 0;
        // this.model.reset();
        this.product.reset();
      }
    )

  }

  get testproduct() {
    return this.testmodel.get('testproduct') as any;
  }

  get nameTechSpec() {
    return this.testmodel.value.testproduct.get('nameTechSpec') as FormControl;
  }


  // detect img
  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded= true;
        this.product.value.img = reader.result
      }
    }
  }

  openDialogEditTypeProduct(){
    const dialogRef = this.dialog.open(DialogEditSpecAtProductComponent, {
      width: '80%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSpecs();
    });
  }

}//close's class AddProductComponent


@Component({
  selector: 'dialog-edit-spec',
  templateUrl: 'dialog-edit-spec.html',
})
export class DialogEditSpecAtProductComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditSpecAtProductComponent>,
    // @Inject(MAT_DIALOG_DATA) public data:ProductData ,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}