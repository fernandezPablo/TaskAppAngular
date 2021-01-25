import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthenticationService } from './authentication.service';
import { 
  ActivatedRoute,
  NavigationStart,
  NavigationExtras,
  Router 
} from '@angular/router';
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { state } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  appstate$: Observable<object>;

  constructor(private builder: FormBuilder, private auth: AuthenticationService, private router: Router) {
    this.loginForm = builder.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required])
    });

   }


  ngOnInit(): void {
    this.appstate$ = this.router.events.pipe(
      /*
       Se va obteniendo cada uno de los eventos que van surgiendo
         y se los va filtrando si estos eventos son una instancia de
         NavigationStart 
      */
      filter(e => e instanceof NavigationStart),
      /* 
        Para los eventos obtenidos del filtro anterior se obtiene
        el estado de la navegacion actual, es decir, se obtienen
        los datos enviados por otro componente si es que estos
        existieran
      */
      map(() => {
        const currentState = this.router.getCurrentNavigation();
        return currentState.extras.state;
      })
    );

  }

  login(userName: string, password: string){
    let user = new User(userName,password);

    this.auth.authenticate(user).subscribe( result => {
        if(!result.success){
          alert(result.message);
          return
        }
        this.router.navigate(['home']);
        localStorage.setItem('Authorization', result.token);
        localStorage.setItem('userId', result.user.id);
    }, error => {
      console.log('Authentication error: '+error.message);
      alert('Authentication error: '+error.message);
    })
  }


}
