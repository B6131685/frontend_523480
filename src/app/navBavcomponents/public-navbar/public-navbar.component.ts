import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {

  constructor(private router: Router, AuthServicesService:AuthServicesService,) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['login']);
    
  }

  logout(){
    this.router.navigate(['']);
    // this.loginbutton = false;
  }

  

}
