import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newVerifySlip = new EventEmitter<string>();
  @Output() name = new EventEmitter<string>();
  constructor() { }

  waitVerify(){
    this.newItemEvent.emit();
  }

  adminVerifySlip(){
    this.newVerifySlip.emit();
  }

  updateName(){
    this.name.emit();
  }

}
