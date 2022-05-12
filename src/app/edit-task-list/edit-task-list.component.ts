import { Task } from '../task';
import { CrossService } from './../service/cross.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-task-list',
  templateUrl: './edit-task-list.component.html',
  styleUrls: ['./edit-task-list.component.scss']
})
export class EditTaskListComponent implements OnInit {

  starStuation!:boolean;

  @Input() oneData!:Task;

  editListForm!: FormGroup;

  constructor(
    private api: ApiService,
    private render: CrossService
  ) { }

  ngOnInit(): void {
    this.initOneData();
  }

  initOneData(){
    console.log(this.oneData);


    this.starStuation = this.oneData.star;

    this.editListForm = new FormGroup({
      taskDone: new FormControl(this.oneData.taskDone),
      star: new FormControl(this.oneData.star),
      title: new FormControl(this.oneData.title),
      date: new FormControl(this.oneData.date),
      time: new FormControl(this.oneData.time),
      comment: new FormControl(this.oneData.comment)
    });
  }

  taskDoneToggle(){
    this.editListForm.value.taskDone = !this.oneData.taskDone;
  }

  starToggle(){
    this.starStuation = !this.starStuation;
    this.editListForm.value.star = !this.oneData.star;
  }

  submitEdit(){
    let taskPack = this.editListForm.value;
    if(taskPack.title.trim() === ''){
      alert('Title can not be empty')
    }else{
      this.api.putTask(this.oneData.id, taskPack)
        .subscribe({
          next: (res)=>{
            this.render.setMessage(res);
            this.render.setCloselist(false);
          },
          error: ()=>{
            alert('Error while adding the task')
          }
        })
    }
  }

  closeEdit(){
    this.render.setCloselist(false);
  }

}
