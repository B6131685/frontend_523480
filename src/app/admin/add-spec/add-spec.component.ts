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
    spec: new FormArray([
      
    ])
  });

  constructor(private SpecModelService:SpecModelService) { this.spec.push(new FormControl('Model')); }
  

  ngOnInit(): void {
  }

  get spec() {
    return this.model.get('spec') as FormArray;
  }

  addSpec(){
    this.spec.push(new FormControl(''));
  }

  deleteSubSpec(i : number){
    // this.model.value.spec.splice(i, 1); //เริ่มที่ i แล้วลบไป 1 ตัวคือ ---> เริ่มที่ i ลบตัวที่ i 
    this.spec.removeAt(i) // ??? why 
    console.log(this.model.value.spec);
  }

  submit(){
    this.SpecModelService.registerSpec(this.model.value).subscribe(
      data => {
        console.log(data);
        this.spec.clear(); // ทำให้ array ว่างเปล่า 
        
        // for (let index = 0; index < this.model.value.spec.length; index++) {
        //   this.deleteSubSpec(index);
        // }

        this.model.reset();

        this.spec.push(new FormControl('Model')); // 0
        this.spec.push(new FormControl('')); // 1

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

  }

}
