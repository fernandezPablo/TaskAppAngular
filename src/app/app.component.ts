import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'TaskManagerApp';
  tasks: Task[] = [];
  mode: string = 'ADD';
  editIndex: number = -1;
  errorDescription = false;
  errorDate = false;

  taskForm: FormGroup;
  
  @ViewChild("controlDescription") descriptionInput: ElementRef;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder){
    this.taskForm = this.formBuilder.group({
      description: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      date: new FormControl('',[Validators.required]),
      status: new FormControl(false)
    });
  }

  ngAfterViewInit(){
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
  }

  submitForm(description: string, date: string, status: boolean, mode: string){
    if(mode ==='ADD') {
      this.addTask(description,date,status);
    }
    else if(mode === 'EDIT') {
      this.editTask(description,date,status);
    }
    else {
      console.log("wrong option please try again...");
    }
  }

  addTask(description: string, date: string, status: boolean){
      console.log('add task...');
      let task = new Task(description,date,status);
      this.tasks.push(task);
      this.resetForm();
  }

  editTask(description: string, date: string, status: boolean){
    console.log('edit task...');
    let task = new Task(description,date,status);
    this.tasks[this.editIndex] = task;
    this.resetForm();
  }

  resetForm(){
    this.taskForm.reset({'description': '', 'date': '', 'status': false});
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus();
  }

  setAllValue(description: string, date: string, status: boolean){
    this.taskForm.setValue({'description': description, 'date': date, 'status': status});
  }
 
  taskChangeHandler(index: number){
    console.log("emmit event")
    this.editIndex = index
    this.setAllValue(this.tasks[index].description,this.tasks[index].date,this.tasks[index].status);
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

export class Task{
  description: string;
  date: string;
  status: boolean;

  constructor(description: string, date: string, status: boolean){
    this.description = description
    this.date = date
    this.status = status
  }

}
