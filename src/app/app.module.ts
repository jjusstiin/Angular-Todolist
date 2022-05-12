import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { EditTaskListComponent } from './edit-task-list/edit-task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EditTaskComponent,
    TaskListComponent,
    EditTaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
