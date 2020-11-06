import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit} from '@angular/core';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'TaskManagerApp';
  description: string = '';
  date: string = '';
  status: boolean = false;
  tasks: Task[] = [];
  editMode: boolean = false;
  editIndex: number = -1;
  errorDescription = false;
  errorDate = false;
  
  @ViewChild("controlDescription") descriptionInput: ElementRef;

  constructor(private renderer: Renderer2){

  }

  ngAfterViewInit(){
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
  }

  addTask(description: string, date: string, status: boolean){
    let task = new Task(description,date,status)
    switch(this.validate(task)){
      case 'ALL':
        console.log("Falta descripcion y fecha");
        this.errorDescription = true;
        this.errorDate = true;
        break;
      case 'DESCRIPTION':
        console.log("Falta descripcion");
        this.errorDescription = true;
        break;
      case 'DATE':
        console.log("Falta fecha");
        this.errorDate = true;
        break;
      case 'VALID':
        this.tasks.push(task)
        this.description = ''
        this.date = ''
        this.status = false
        this.errorDescription = false
        this.errorDate = false
        this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
        break;
    }
  }

  /*
  validate(task: Task){
    return (task.description == '' || task.date == '')? false: true
  }*/

  validate(task: Task){
    let isDescription = task.description == ''
    let isDate = task.date == ''
    if(isDescription && isDate) return "ALL"
    if(isDescription) return "DESCRIPTION"
    if(isDate) return "DATE"
    return "VALID"
  }
 
  taskChangeHandler(index: number){
    console.log("emmit event")
    this.editIndex = index
    this.description = this.tasks[index].description 
    this.date = this.tasks[index].date
    this.status = this.tasks[index].status
    this.editMode = true
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
    window.location.href = "#top"
  }

  editTask(description: string, date: string, status: boolean){
    let task = new Task(description,date,status)
    this.tasks[this.editIndex] = task
    this.editMode = false
    this.description = ""
    this.date = ""
    this.status = false
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
