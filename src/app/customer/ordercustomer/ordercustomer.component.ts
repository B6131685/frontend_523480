import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-ordercustomer',
  templateUrl: './ordercustomer.component.html',
  styleUrls: ['./ordercustomer.component.css']
})
export class OrdercustomerComponent implements OnInit {

  constructor(
      private  ActivatedRoute:ActivatedRoute, 
      private Router:Router
  ) { }

  ngOnInit(): void {
  }

  addItem(){
  
  }


}
