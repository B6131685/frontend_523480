import { Component, OnInit, Inject } from '@angular/core';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { AddressFreeAPIService } from 'src/app/services/address-free-api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
export interface DialogData { location:{postcode:Number,area:'', address:String}[] }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  newAddress!:DialogData;
  user:{_id:String,email:String, location:{postcode:Number,area:'', address:String}[], name:String} = {_id:'',email:'', location:[], name:''}
  constructor(
      private AuthServicesService:AuthServicesService,
      private AddressFreeAPIService:AddressFreeAPIService,
      public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.AuthServicesService.getDataUserByID().subscribe(
      data=>{
        this.user = data.data;
      }
    )
  }


  NewAddress(){
    this.user.location.push({postcode:0,area:'',address:''})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(addresssDialog, {
      width: '500px',
    }); 

   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.newAddress = result;
      console.log(result);
      if(result != undefined){
        this.user.location.push(result);
      }
      // console.log(this.newAddress);
      
    });
  }

  deleteSubLocation(index:number){
    console.log('delete location at index:'+index);
    console.log(this.user.location[index]);
    this.user.location.splice(index,1);
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-address.html',
  styleUrls: ['./profile.component.css']
})
export class addresssDialog {
  address:{postcode:Number, area:'', address:String} = {postcode:0, area:'', address:''}
  listArea!:any;
  constructor(
    private AddressFreeAPIService:AddressFreeAPIService,
    public dialogRef: MatDialogRef<addresssDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: { location:{postcode:Number, area:'', address:String}[] },
  ) {}

  form = new FormGroup({
    postcode: new FormControl(null, [Validators.required,Validators.maxLength(5)]),
    area: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  closeDialog() {
    if(this.validateAddress.invalid || this.validatePoseCode.invalid){
      console.log('cannot add');
    }else{
      console.log('add success');
      this.dialogRef.close(this.form.value);
    }
  }
  postcodeOnChange(postcode:String){
    console.log(': '+ postcode);
    this.AddressFreeAPIService.longDoMAP(postcode).subscribe(
      data => {
        
        console.log(data);
        this.listArea = data.data;
        if(data.data != null && data.data.length > 0){
          // console.log( this.listArea[0].name);
          // this.form.value.area = this.listArea[0].name ;
          this.form.get('area')?.patchValue(data.data[data.data.length-1].name)

          console.log(this.form.value.area);
          
        }
        
      },
      err=>{
        alert('cannot get Address Area Data!!!')
      }
    )
  }

  get validatePoseCode() { return this.form.get('postcode') as FormControl }
  get validateAddress() { return this.form.get('address') as FormControl }
}