export interface Task{
  split(arg0: string): any;
  id:number;
  showEdit: boolean;
  taskDone:boolean,
  title: string,
  star: boolean,
  date: string,
  time: string,
  file: string,
  comment: string,
}

// list 高度bug
// 學習
// ngOnDestroy(): void {
//   this.subscription1.unsubscribe()
//   this.subscription2.unsubscribe()
// }
