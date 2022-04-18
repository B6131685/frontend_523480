import { Component, OnInit, Input } from '@angular/core';
import { ProductData } from '../stock/stock.component';
import Swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

interface FormatForUpdate {
  id: String;
  mode: String;
  number: Number;
}

interface viewSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stock-button',
  templateUrl: './stock-button.component.html',
  styleUrls: ['./stock-button.component.css'],
})
export class StockButtonComponent implements OnInit {
  @Input() item!: ProductData;

  funcForupdate : viewSelect[] = [
    {value: 'Addition', viewValue: 'เพิ่มจำนวน'},
    {value: 'Subtraction', viewValue: 'ลดจำนวน'},
  ];

  number = 0;
  mode = new FormControl('');
  constructor(private ProductService:ProductService) {}

  ngOnInit(): void {}

  updateStock() {
    let data: FormatForUpdate = {
      id: "",
      mode: "",
      number: 0
    };
    
    if (this.mode.value !== '') {
      data.mode = this.mode.value;
      data.id = this.item.id;
      data.number = this.number;
      this.ProductService.updateProductStock(data).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: "success",
            
          })
        },
        err=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.error.message,
          })
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'โปรดเลือกฟังกืชันการจัดการสินค้า',
      })
    }
  }
}
