import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServicesService } from '../services/auth-services.service';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-login-components',
  templateUrl: './login-components.component.html',
  styleUrls: ['./login-components.component.css']
})
export class LoginComponentsComponent implements OnInit {

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private auth:AuthServicesService,public localStorage:LocalStorageService,) { }

  ngOnInit(): void {
  }

  singUp(){
    this.router.navigate(['singup']);
   
  }

  login(){
    this.auth.loginServices(this.authForm.value).subscribe(
      data => {
  
      },
      err =>{
        console.log(err);
        
      }
    );
  }

  checkHeader(){
    this.auth.getMe().subscribe(
      data => {
        
      },
      err =>{
        console.log(err);
      }
    );
  }

  logout(){
    this.localStorage.clear();
  }
}
