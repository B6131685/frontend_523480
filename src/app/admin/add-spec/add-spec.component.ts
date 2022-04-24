import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SpecModelService } from 'src/app/services/spec-model.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-spec',
  templateUrl: './add-spec.component.html',
  styleUrls: ['./add-spec.component.css']
})
export class AddSpecComponent implements OnInit {

  model = new FormGroup({
    name: new FormControl(''),
    spec: new FormArray([])
  });

  buttonmode !: boolean;
  id_for_update !:'';
  DBSpecs !: any;

  constructor(private SpecModelService:SpecModelService) {
    //ข้อกำหนดพื้นฐานของสินค้าที่ต้องมี 
    this.spec.push(new FormControl('Model')); 
    this.spec.push(new FormControl('Brand')); 
  }
  

  ngOnInit(): void {
    this.getSpec();
    this.buttonmode=true;
  }

  async getSpec(){
      await this.SpecModelService.getSpec().subscribe(
      data =>{  
        console.log(data);
        this.DBSpecs = data.data;
      },
      error =>{
        console.log(error);
      }
    )
  }

  selectEdit(item:any){
    console.log(item);
    this.buttonmode = false;
    this.id_for_update = item._id
    this.spec.clear();
    // this.model.setValue({name:item.name,spec:item.spec});
    this.model.patchValue({name:item.name});
    // this.model.patchValue({spec:item.spec});

    for (let index = 0; index < item.spec.length; index++) {
      this.spec.push(new FormControl(''));
      this.spec.at(index).setValue(item.spec[index]);   
    }

    // this.model.value.name = item.name;
    // this.model.valueChanges;
  }

  new(){

    this.buttonmode = true;
    console.log('new working!!');
    this.spec.clear();
    this.model.reset();

    this.spec.push(new FormControl('Model')); // 0
    this.spec.push(new FormControl('Brand')); // 1
  }

  get spec() { //for HTML can list spec Array
    return this.model.get('spec') as FormArray;
  }

  addSpec(){
    this.spec.push(new FormControl(''));
  }

  deleteSubSpec(i : number){
    // this.model.value.spec.splice(i, 1); //เริ่มที่ i แล้วลบไป 1 ตัวคือ ---> เริ่มที่ i ลบตัวที่ i 

    // console.log(i);
    this.spec.removeAt(i) // ??? why 
    // console.log(this.model.value.spec);
  }

  submit(){
    this.SpecModelService.registerSpec(this.model.value).subscribe(
      data => {
        // console.log(data);
        this.model.reset(); // ไม่สามารถ ลบ ข้อมูลใน array spec ได้ต้อง เลยต้องใช้ this.spec.clear();
        this.spec.clear(); // ทำให้ array ว่างเปล่า 
        this.spec.push(new FormControl('Model')); // 0
        this.spec.push(new FormControl('Brand')); // 1
        this.spec.push(new FormControl('')); // 2
        this.getSpec();
        this.new();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ประเภทสินค้าถุกเพิ่มเรียบร้อย',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err=>{
        console.log(err.error.error.message);
        alert(err.error.error.message) 
        //data.splice(0, data.length)
        // this.model.value.spec.length = 0;
        // this.model.reset();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' ไม่สามารถเพิ่มประเภทสินค้า',
        });

      }
    )
  } // close submit

  update(){

  if(this.id_for_update != '' && this.id_for_update != null){
    this.SpecModelService.update(this.id_for_update,this.model.value).subscribe(
      data =>{
        this.ngOnInit();
        this.new();
        console.log(data);  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'อัพเดรตสำเสร็จ',
          showConfirmButton: false,
          timer: 1500
        })      
      },
      error =>{
        console.log(error);
      }
    )
  }  
    
  }

  reset(){
    this.spec.clear();
    this.model.reset();
    this.spec.push(new FormControl('Model')); // 0
    this.spec.push(new FormControl('Brand')); // 1
  }

  DeleteSpec(item:any){
    console.log('delete this item');
    console.log(item);

    this.SpecModelService.delete(item._id).subscribe(
      data =>{
        this.ngOnInit();
        this.new();
        console.log(data);        
      },
      error =>{
        console.log(error);
      }
    )
  }

} // close coponent AddSpecComponent
