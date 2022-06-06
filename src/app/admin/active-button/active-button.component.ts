import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-active-button',
  templateUrl: './active-button.component.html',
  styleUrls: ['./active-button.component.css']
})
export class ActiveButtonComponent implements OnInit {

  isChecked = true;
  @Input() parent!:any; // row from stock component
  constructor(
    private ProductService:ProductService,
  ) { }

  ngOnInit(): void {
    // console.log(this.parent);
    this.isChecked = this.parent.activeStatus;
  }

  update(){
    console.log('update active status of '+ this.parent.id +' :'+ this.isChecked);
    let obj = { idProduct:this.parent.id, status:this.isChecked}
    this.ProductService.updateActiveStatus(obj).subscribe(
      data=>{
        console.log(data);
        
      }
    )
  }

}
