import { CrossService } from './service/cross.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { Task } from './task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  res: Task[] = [];
  showEditTaskArea: boolean = false;
  renderTime!: number;
  subscription1!: Subscription;
  subscription2!: Subscription;
  navSwich: {title:string, classSet: boolean}[] = [
    {title: 'My Task', classSet: true},
    {title: 'In Progress', classSet: false},
    {title: 'Completed', classSet: false},
  ]
  taskCount: number = 0;
  isDoneText: string = 'tasks left';

  constructor(
    private api : ApiService,
    private render: CrossService
    ) {}

  ngOnInit(): void {
    this.getTaskData();

    this.subscription1 = this.render.getMessage()
      .subscribe(val => {
        this.getTaskData();
      });

    this.subscription2 = this.render.getCloseList()
      .subscribe(val =>{
        this.InitTaskListEdit()
      })

  }

 // 取得初始資料
 getTaskData(){
  this.api.getTask()
    .subscribe({
      next: (res)=>{
        let newRes: Task[] = []
        let starRes: Task[] = [];
        let nowRes: Task[] = [];
        let doneRes: Task[] = [];

        this.taskCount = 0;

        res.forEach(elm=>{
          if(elm.taskDone === true){
            if(this.navSwich[2].classSet === true){this.taskCount += 1;}
            doneRes.push(elm)
          }else if(elm.star === true){
            if(this.navSwich[0].classSet === true || this.navSwich[1].classSet === true)
            {this.taskCount += 1;}
            starRes.push(elm)
          }else{
            if(this.navSwich[0].classSet === true || this.navSwich[1].classSet === true)
            {this.taskCount += 1;}
            nowRes.push(elm)
          }
        })

        this.timeSort(starRes);
        this.timeSort(nowRes);
        this.timeSort(doneRes);

        if(this.navSwich[0].classSet === true){
          newRes = starRes.concat(nowRes).concat(doneRes);
        }else if(this.navSwich[1].classSet === true){
          newRes = starRes.concat(nowRes);
        }else{
          newRes = doneRes;
        }
        // newRes = this.timeSort(res);
        newRes.forEach((elm,idx)=>{
          elm['showEdit'] = false
        })
        this.res = newRes;

      },
      error:(err)=>{
        alert("Error while fatching the records")
      }
    })
  }

  // 時間排序
  timeSort(res:Task[]) :Task[]{
    return res.sort( function(a, b) {
    //   let ascore = (a.taskDone? 100 : 0) + (a.star? -10 : 0);
    //   let bscore = (b.taskDone? 100 : 0) + (b.star? -10 : 0);
    // if( ascore != bscore){
    //   return ascore - bscore;
    // } else {

        let aArrDate = a.date.split('-');
        let aArrTime = a.time.split(':')
        let aArr : any = aArrDate.concat(aArrTime);
        let bArrDate = b.date.split('-');
        let bArrTime = b.time.split(':')
        let bArr : any = bArrDate.concat(bArrTime);

        return new Date(aArr[0], Number(aArr[1])-1, aArr[2],  Number(aArr[3])-1, aArr[4]).getTime() - new Date(bArr[0], Number(bArr[1])-1, bArr[2],  Number(aArr[3])-1, aArr[4]).getTime()

       // }
    });
  }

  // 顯示增加任務元件
  showEditTask(){
    this.showEditTaskArea = !this.showEditTaskArea;
    this.InitTaskListEdit();
  }

  // 關閉增加任務元件
  initShowEditTask(){
    this.showEditTaskArea = false;
  }

  // 關閉所有編輯元件
  InitTaskListEdit(){
    this.res.forEach((elm, idx)=>{
      elm.showEdit = false
    })
  }

  changClass(idx:number){
    (idx === 2) ? (this.isDoneText = 'task completed') : this.isDoneText = 'tesks left'
    this.navSwich.forEach(elm=>{
      elm.classSet = false;
    })
    this.navSwich[idx].classSet = true;
    this.getTaskData();
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe()
    this.subscription2.unsubscribe()
  }
}
