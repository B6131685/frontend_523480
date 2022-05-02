import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-dialog-show-product',
  templateUrl: './dialog-show-product.component.html',
  styleUrls: ['./dialog-show-product.component.css']
})
export class DialogShowProductComponent implements OnInit {

  @Input() item!: any; // get from component that call add product as modal
  loggedIn !: any;
  quntity = 0;
  constructor(public LocalStorageService:LocalStorageService) {
    this.loggedIn = localStorage.getItem('STATE');
    console.log(this.loggedIn);
    
   }

  ngOnInit(): void {
  }

  sub(){
    if(this.quntity>0){
      this.quntity -= 1
    }
  }

  plus(){
    this.quntity += 1
  }

  checkState(){
    if(this.loggedIn === null){
      alert('โปรดสมัคร')
    }

    if(this.loggedIn === 'true'){
      alert('ซิ้อ')
    }
  }

}
