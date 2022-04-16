import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-button',
  templateUrl: './stock-button.component.html',
  styleUrls: ['./stock-button.component.css']
})
export class StockButtonComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
