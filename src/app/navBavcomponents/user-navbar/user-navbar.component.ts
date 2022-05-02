import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  mode = new FormControl('over');
  panelOpenState = false;
  panelOrderOpenState = false;
  decoded !:any;
  state !: boolean;
  constructor(public localStorage:LocalStorageService,private router: Router,private AuthServicesService:AuthServicesService) { }
  ngOnInit(): void {
    this.decoded = this.AuthServicesService.result;
    this.state = this.AuthServicesService.checkLogin();
  }

  logout(){
    this.localStorage.clear();
    this.router.navigate(['login']);
  }
  home(){
    this.router.navigate(['user/home']);
  }

  profile(){
    this.router.navigate(['user/profile']);
  }
}
