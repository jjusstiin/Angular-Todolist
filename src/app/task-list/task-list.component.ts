import { CrossService } from './../service/cross.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() res!:Task[];
  oneData!:Task;
  @Input() showEditTaskArea!:boolean;
  @Output() initShowEditTask: EventEmitter<number> = new EventEmitter();
  @Output() InitTaskListEdit: EventEmitter<any> = new EventEmitter();

  constructor(
    private api : ApiService,
    private render: CrossService
  ) { }

  ngOnInit(): void {
    console.log('11')
  }

  // 開啟特定任務編輯元件
  showEditTask($event: any, idx:number){
    console.log('Task')
    let getClassName = $event.target.className
    if(getClassName === 'pi pi-star-fill' || getClassName === 'pi pi-star' || getClassName === 'task-head-checkmark'){
      return;
    }else{
      this.initShowEditTask.emit()
      this.InitTaskListEdit.emit();
      this.res[idx].showEdit = true;
      this.oneData = this.res[idx];
    }

  }

  // 已完成未完成編輯
  setCheckToggle(idx: number){
    this.res[idx].taskDone = !this.res[idx].taskDone
    this.api.putTask(this.res[idx].id , this.res[idx])
      .subscribe({
        next: (res)=>{
          this.render.setMessage(res);
        },
        error: (err)=>{
          alert('Error while updating the data')
        }
      })
  }

  // 重要任務編輯
  setStarToggle(idx:number){
    this.res[idx].star = !this.res[idx].star;
    this.api.putTask(this.res[idx].id , this.res[idx])
    .subscribe({
      next: (res)=>{
        this.render.setMessage(res);
      },
      error: (err)=>{
        alert('Error while updating the data')
      }
    })
  }

}
