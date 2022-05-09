import { Component, OnInit, Inject } from '@angular/core';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { AddressFreeAPIService } from 'src/app/services/address-free-api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
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
      private UserService:UserService,
      public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
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

  updateProfile(){
    this.UserService.EditUserByID(this.user).subscribe(
      data=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'edit success',
          showConfirmButton: false,
          timer: 1500
        });
        this.getUser();
      },
      error =>{

      }
    )
  }

  deleteSubLocation(index:number){
    console.log('delete location at index:'+index);
    console.log(this.user.location[index]);
    this.user.location.splice(index,1);
  }

  changeEmail(){
    
      const dialogRef = this.dialog.open(EmailDialog, {
        width: '600px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }

  changePassword(){
    const dialogRef = this.dialog.open(PasswordDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }  
}

@Component({
  selector: 'dialog-email',
  templateUrl: 'dialog-email.html',
})
export class EmailDialog {
  newEmail!:String;
  obj:{email:String,userID:String} = {email:'',userID:this.AuthServicesService.idUser}
  constructor(
    private AuthServicesService:AuthServicesService,
    private UserService:UserService,
    public dialogRef: MatDialogRef<EmailDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  changeEmail(): void {
    // console.log(this.newEmail);
    console.log(this.AuthServicesService.idUser);
    if(this.obj.email != ''){
      this.UserService.changeEmail(this.obj).subscribe()
      this.dialogRef.close();
    }else(
      alert('โปรดกรอกอีเมลใหม่')
    )
  }


}



@Component({
  selector: 'dialog-password',
  templateUrl: 'dialog-password.html',
})
export class PasswordDialog {
  constructor(
    public dialogRef: MatDialogRef<PasswordDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
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