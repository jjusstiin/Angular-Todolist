import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../task';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  postTask( data: Task ){
    return this.http.post<Task>("http://localhost:3000/task/", data);
  }

  getTask(){
    return this.http.get<Task[]>("http://localhost:3000/task/");
  }

  putTask(id: number, data: Task){
    return this.http.put<Task>("http://localhost:3000/task/"+id, data)
  }

  deleteTask(id: number){
    return this.http.delete<Task>("http://localhost:3000/task/"+id)
  }
}
