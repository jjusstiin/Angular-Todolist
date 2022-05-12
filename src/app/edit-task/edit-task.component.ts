import { ApiService } from './../service/api.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from "../task";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  @Output() newShowEditTaskArea = new EventEmitter<boolean>()
  @Output() getTaskData = new EventEmitter<void>()

  editTaskform!: FormGroup;
  taskDone: boolean = false;
  star: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ){}

  ngOnInit(): void {
    this. getFormBuilder();
  }

  //表單toggle事件
  showEditTask(){
    this.newShowEditTaskArea.emit();
  }

  starToggle(){
    this.star = !this.star
  }

  taskDoneToggle(){
    this.taskDone = !this.taskDone
  }

  getFormBuilder(){
    this.editTaskform = this.formBuilder.group({
      taskDone:this.taskDone,
      star:this.star,
      title:['', Validators.required],
      date:['', Validators.required],
      time:['', Validators.required],
      file:['', Validators.required],
      comment:['', Validators.required],
    })
  }

  submitTask(){
    let taskPack = this.editTaskform.value;
    if(taskPack.title.trim() === ''){
      alert('Enter "Title" at least')
    }else{
      this.api.postTask(taskPack)
        .subscribe({
          next: (res)=>{
            this.editTaskform.reset();
            this.showEditTask();
            this.getTaskData.emit();
          },
          error: (err)=>{
            alert('Error while adding the task')
          }
        })
    }
  }

}
