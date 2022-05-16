import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  @Output() newItemEvent = new EventEmitter<string>();
  constructor() { }

  waitVerify(){
    this.newItemEvent.emit();
  }

}
