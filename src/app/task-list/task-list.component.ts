import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/Task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input("data") tasks: any[]
  @Output() taskChanged: EventEmitter<number> = new EventEmitter()
  
  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
  }

  deleteTask(task: Task){
    if(confirm(`Esta seguro de eliminar la tarea ${task.Description}`)){
      this.taskService.deleteTask(task._id).subscribe( () => {
        this.tasks = this.tasks.filter( (element) => element._id != task._id )
      });
    }
  }

  editTask(index: number){
    this.taskChanged.emit(index)
  }

}
