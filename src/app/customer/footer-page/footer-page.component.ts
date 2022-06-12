import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.css']
})
export class FooterPageComponent implements OnInit {

  @Input() Footer!:{mail:string,tel:string,address:string} ;
  @Input() spec!:any ;
  constructor() { }

  ngOnInit(): void {
  }

}
