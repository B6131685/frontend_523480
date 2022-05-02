import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  mode = new FormControl('over');
  panelOpenState = false;
  panelOrderOpenState = false;
  constructor(public localStorage:LocalStorageService,private router: Router) { }
  ngOnInit(): void {
  }

  logout(){
    this.localStorage.clear();
    this.router.navigate(['login']);
  }

}
