import { Injectable } from '@angular/core';
import { Task } from './models/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];
  private url= "http://localhost:3000/api/tasks";

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  getTasks(){
    return this.http.get(this.url).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.url,task);
  }

  deleteTask(id: string): Observable<{}>{
    return this.http.delete(`${this.url}/${id}`);
  }

  editTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.url}/${task._id}`,task);
  }

}
