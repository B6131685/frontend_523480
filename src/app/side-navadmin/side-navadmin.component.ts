import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-side-navadmin',
  templateUrl: './side-navadmin.component.html',
  styleUrls: ['./side-navadmin.component.css']
})
export class SideNavadminComponent implements OnInit {
  mode = new FormControl('push');
  panelOpenState = false;
  panelOrderOpenState = false;
  constructor(public localStorage:LocalStorageService,) { }

  ngOnInit(): void {
  }

  logout(){
    this.localStorage.clear();
  }
}
