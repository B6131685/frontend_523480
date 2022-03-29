import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray} from '@angular/forms'
@Component({
  selector: 'app-model-products',
  templateUrl: './model-products.component.html',
  styleUrls: ['./model-products.component.css']
})
export class ModelProductsComponent implements OnInit {

  modelProduct = new FormGroup({
    name: new FormControl(''),
    model: new FormArray([
      new FormControl('')
    ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get model(){
    return this.modelProduct.get('model') as FormArray;
  }

  deleteElemete(i:number){
    console.log(i);
    this.model.removeAt(i);
    console.log(this.modelProduct.value);
    
  }
  
  addProperty(){
    this.model.push(new FormControl(''));
  }

}
