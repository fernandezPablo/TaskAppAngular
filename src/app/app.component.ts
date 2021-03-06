import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from './models/Task';
import { TasksService } from './tasks.service';
import { 
  Router 
} from '@angular/router';
import { User } from './models/User';
import { AuthenticationService } from './auth/authentication.service';

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
  user: User;
  routeState: any;

  taskForm: FormGroup;
  
  @ViewChild("controlDescription") descriptionInput: ElementRef;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder, private tasksservice: TasksService, private authService: AuthenticationService, private router: Router){
    this.taskForm = this.formBuilder.group({
      id: new FormControl(''),
      description: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      date: new FormControl('',[Validators.required]),
      status: new FormControl(false)
    });
  }
  ngOnInit(): void {
    //Se verifica si existe el item userId en el almacenamiento del navegador
    if(localStorage.getItem('userId')){
      //si el item existe se consulta el usuario al servicio
      this.authService.getUser(localStorage.getItem('userId')).subscribe(
        (usr: User) =>{
          this.user = usr;
          console.log(this.user);
        },
        error => console.log(error)
      );
    }
    else{
      //si el item no existe se redirige al usuario a la vista de login
      this.router.navigate(['login']);
    }

    this.tasksservice.getTasks().subscribe( 
      (tasks: Task[]) =>  this.tasks = tasks,
      error => this.router.navigate(['login'])
      );
  }

  ngAfterViewInit(){
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
  }

  submitForm(description: string, date: Date, status: boolean, mode: string, id?: string){
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

  addTask(description: string, date: Date, status: boolean){
      let task = new Task(description,date,status);
      this.tasksservice.addTask(task).subscribe( task => this.tasks.push(task));
      this.resetForm();
  }

  editTask(id: string, description: string, date: Date, status: boolean){
    let task = new Task(description,date,status,id);
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

  setAllValue(id: string,description: string, date: Date, status: boolean){
    let formatedDate = new Date(date).toISOString().slice(0, -1).slice(0,10);
    this.taskForm.setValue({'id': id, 'description': description, 'date': formatedDate, 'status': status});
  }
 
  taskChangeHandler(index: number){
    this.editIndex = index
    this.setAllValue(this.tasks[index]._id,this.tasks[index].Description,this.tasks[index].Date,this.tasks[index].Status);
    this.mode = 'EDIT'
    this.renderer.selectRootElement(this.descriptionInput.nativeElement).focus()
    //window.location.href = "#top"
  }

  highlight(event: any){
    this.renderer.addClass(event.target,"highlight")
  }

  blur(event: any){
    this.renderer.removeClass(event.target,"highlight")
  }

}

