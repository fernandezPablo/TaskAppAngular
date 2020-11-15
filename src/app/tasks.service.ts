import { Injectable } from '@angular/core';
import { Task } from './models/Task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];
  private url= "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get(this.url);
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.url,task);
  }

  deleteTask(id: number): Observable<{}>{
    return this.http.delete(`${this.url}/${id}`);
  }

  editTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.url}/${task.id}`,task);
  }

}
