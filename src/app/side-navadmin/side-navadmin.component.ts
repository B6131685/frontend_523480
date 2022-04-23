import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { AuthServicesService } from '../services/auth-services.service';
@Component({
  selector: 'app-side-navadmin',
  templateUrl: './side-navadmin.component.html',
  styleUrls: ['./side-navadmin.component.css']
})
export class SideNavadminComponent implements OnInit {
  mode = new FormControl('push');
  panelOpenState = false;
  panelOrderOpenState = false;
  constructor(public localStorage:LocalStorageService,private router: Router,private AuthServicesService:AuthServicesService) { }

  user!:any;
  decoded !:any;
  ngOnInit(): void {
    this.decoded = this.AuthServicesService.result;
    console.log("decode get from AuthServices");
    console.log(this.decoded);
    // console.log(this.user);
    
  }

  logout(){
    this.localStorage.clear();
    this.router.navigate(['login']);
  }
}
