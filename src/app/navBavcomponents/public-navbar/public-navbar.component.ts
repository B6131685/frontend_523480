import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  login(){
    this.router.navigate(['addProduct']);
  }
}
