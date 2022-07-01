import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AddressFreeAPIService } from '../services/address-free-api.service';
import { SingUpService } from '../services/sing-up.service';
import { ShopPageService } from '../services/shop-page.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  postcode!: number;
  provinces: any;
  districts: any;
  subDistricts: any;

  nameShop !: String;
  logo!:String;

  fetchSuccess = false;
  checkOnCheang = false;

  confirmPassword!: String;

  profileForm = new FormGroup({
    name : new FormControl(''),
    password: new FormControl(''),
    email : new FormControl('',[Validators.required, Validators.email]),
    address: new FormArray([])
  });

  location = new FormGroup({
    postcode: new FormControl(''),
    address : new FormControl(''),
    subDistrict : new FormControl(''),
    district : new FormControl(''),
    province : new FormControl(''),
  })

  constructor(
    private addressFreeAPI:AddressFreeAPIService,
    private singUpService:SingUpService,
    private router: Router,
    private ShopPageService:ShopPageService) { 
    
    this.provinces = [];

    this.ShopPageService.getShopPage().subscribe(
      data=>{
        this.nameShop = data.nameShop;
        this.logo = data.logo;
      }
    )
  }
  
  ngOnInit(): void {
    
  }


  
  home(){
    this.router.navigate(['home']);
  }
  


  searchLongDomap(){
    
    
    this.addressFreeAPI.longDoMAP(this.postcode).subscribe(
      data => {
        
        this.fetchSuccess = true;
        
        this.provinces = data.data;
        this.location.value.province = this.provinces[0].name;
        
      },
      err=>{
        alert('Sign Up failure!!!')
      }
    )
  }

  onChangeImg(e: any){
    console.log("onchange working!");
    console.log(this.location.value);
    this.searchLongDomap();
  }


  addAddress(){
    console.log("addAddress working!");
    console.log(this.profileForm.value);

    if(this.fetchSuccess === true){
      console.log("in fetchSuccess");
      console.log(this.location.value.province);
      
      if(this.location.value.province === ""){
        this.location.value.province = this.provinces[0].name;
        
      }
    }

    this.profileForm.value.address.push(this.location.value);
    
  }


  save(){
    this.location.value.postcode = String(this.postcode);
    this.addAddress();
    console.log("save() working!");
    console.log(this.profileForm.value);
    this.singUpService.registerData(this.profileForm.value).subscribe(
      data => {
        // console.log(data);
        Swal.fire({
          icon: 'success',
          text: 'การสมัครเรียบร้อย \n โปรดตรวจสอบอีเมลเพื่อยืนยันที่อยู่อีเมล',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
        this.profileForm.value.address.length = 0;
        this.profileForm.reset();
      },
      err=>{
        console.log(err); 
        //data.splice(0, data.length)
        this.profileForm.value.address.length = 0;
        // alert('Sign Up failure!!!');
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: err.error.error.message,
        })
      }
    )
  }

  back(){
    this.router.navigate(['/login']);
  }

}
