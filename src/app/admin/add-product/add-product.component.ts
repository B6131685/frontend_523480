import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild("myFormPriceMat") myFormPriceMat !: ElementRef;

  product = new FormGroup({
    price: new FormControl(''),
    spec: new FormArray([]),
    img: new FormControl(''),
  });


  constructor(
    private SpecModelService: SpecModelService,
    private ProductService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
    this.getSpecs();
  }

  getSpecs() {
    try {
      this.SpecModelService.getSpec().subscribe((data) => {
        this.specs = data.data;
        this.select = data.data[0].name;
        this.list = data.data[0].spec;

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
    this.myFormPriceMat.nativeElement.value = 0;
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
    console.log("Submit product working!!!");
    
    
    for (let index = 0; index < this.techSpec.length; index++) {
      this.product.value.spec.push(this.techSpec[index]);
    }

    this.ProductService.addProduct(this.product.value).subscribe(
      data => {
        console.log(data);
        this.product.reset();  
        this.getSpecs();
        this.myForm.nativeElement.reset();
        this.myFormPriceMat.nativeElement.value = 0;
        this.myFormPrice.nativeElement.value = 0;
        
        
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

  
}
