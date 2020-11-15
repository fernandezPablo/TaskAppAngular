import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from './models/Task';
import { TasksService } from './tasks.service';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'TaskManagerApp';
  tasks: Task[] = [];
  mode: string = 'ADD';
  editIndex: number = -1;
  errorDescription = false;
  errorDate = false;

  taskForm: FormGroup;
  
  @ViewChild("controlDescription") descriptionInput: ElementRef;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder, private tasksservice: TasksService){
    this.taskForm = this.formBuilder.group({
      id: new FormControl(''),
      description: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      date: new FormControl('',[Validators.required]),
      status: new FormControl(false)
    });
  }
  ngOnInit(): void {
    this.tasksservice.getTasks().subscribe( (tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  ngAfterViewInit(){
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
  }

  submitForm(description: string, date: string, status: boolean, mode: string, id?: number){
    if(mode ==='ADD') {
      this.addTask(description,date,status);
    }
    else if(mode === 'EDIT') {
      this.editTask(id,description,date,status);
    }
    else {
      console.log("wrong option please try again...");
    }
  }

  addTask(description: string, date: string, status: boolean){
      console.log('add task...');
      let task = new Task(description,date,status);
      this.tasksservice.addTask(task).subscribe( task => this.tasks.push(task));
      this.resetForm();
  }

  editTask(id: number, description: string, date: string, status: boolean){
    console.log('edit task...');
    let task = new Task(description,date,status,id);
    console.log(`id: ${task.id} on editTask AppComponent`);
    this.tasksservice.editTask(task).subscribe( task => {
      this.tasks[this.editIndex] = task;
      this.resetForm();
    })
  }

  resetForm(){
    this.taskForm.reset({'description': '', 'date': '', 'status': false});
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus();
    this.mode = 'ADD';
  }

  setAllValue(id: number,description: string, date: string, status: boolean){
    let formatedDate = new Date(date).toISOString().slice(0, -1).slice(0,10);
    console.log(formatedDate);
    this.taskForm.setValue({'id': id, 'description': description, 'date': formatedDate, 'status': status});
  }
 
  taskChangeHandler(index: number){
    this.editIndex = index
    console.log(`editIndex: ${this.editIndex}`);
    console.log(`id: ${this.tasks[index].id} on taskChangeHandler`);
    this.setAllValue(this.tasks[index].id,this.tasks[index].description,this.tasks[index].date,this.tasks[index].status);
    this.mode = 'EDIT'
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
    window.location.href = "#top"
  }

  highlight(event: any){
    console.log("highlight")
    this.renderer.addClass(event.target,"highlight")
  }

  blur(event: any){
    this.renderer.removeClass(event.target,"highlight")
  }

}

