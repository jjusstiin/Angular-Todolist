import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class CrossService {

  msgContent = new Subject<Task>();
  closeContent = new Subject<boolean>();

  constructor() { }

  setMessage(value: Task) {
    this.msgContent.next(value);
  }
  getMessage() {
    return this.msgContent.asObservable();
  }

  setCloselist(value: boolean){
    this.closeContent.next(value)
  }
  getCloseList(){
    return this.closeContent.asObservable();
  }

}
