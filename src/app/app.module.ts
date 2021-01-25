import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'


import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ErrorHighlightDirective } from './error-highlight.directive';
import { LoginComponent } from './auth/login.component';
import { MainComponent } from './main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptorService } from './auth-interceptor.service';

const routes = [
  {path: 'home', component: AppComponent },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    TaskListComponent,
    ErrorHighlightDirective,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [MainComponent]
})
export class AppModule { }
