import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServicesService } from '../services/auth-services.service';
import { LocalStorageService } from 'angular-web-storage';
import jwtDecode, { JwtPayload } from "jwt-decode";
@Component({
  selector: 'app-login-components',
  templateUrl: './login-components.component.html',
  styleUrls: ['./login-components.component.css']
})
export class LoginComponentsComponent implements OnInit {

   decoded !: any;
  @Output() messageEvent = new EventEmitter<string>();

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
        
        const id_token = localStorage.getItem('id_token');
        if(id_token === null){
            alert("faile")
        }else{
             this.decoded = jwtDecode<JwtPayload>(id_token);
        }
        if(this.decoded.role === "admin"){
          this.router.navigate(['admin']);
        }

        if(this.decoded.role === "customer"){
          this.router.navigate(['user']);
        }
        console.log("after login working");
      },
      err =>{
        console.log(err);
        
      }
    );
  }

  resetPassword(){
    alert("reset password Not alredy dev")
  }

  logout(){
    this.localStorage.clear();
  }
}
