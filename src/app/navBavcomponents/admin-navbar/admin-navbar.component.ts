import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
   loginbutton !: boolean;

  constructor(private router: Router, AuthServicesService:AuthServicesService, ) { 
    this.loginbutton = AuthServicesService.loginMode;
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['login']);
    
  }

  logout(){
    this.router.navigate(['']);
    // this.loginbutton = false;
  }

  receiveData($event: any){
    console.log("receivedata working");
    
    console.log($event);
    
    //this.loginbutton = $event;
    console.log(this.loginbutton);
    
  }

}
