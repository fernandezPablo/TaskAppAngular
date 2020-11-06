import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../app.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input("data") tasks: any[]
  @Output() taskChanged: EventEmitter<number> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(index: number){
    if(confirm(`Esta seguro de eliminar la tarea ${this.tasks[index].description}`)){
      this.tasks.splice(index,1)
    }
  }

  editTask(index: number){
    this.taskChanged.emit(index)
  }

}
