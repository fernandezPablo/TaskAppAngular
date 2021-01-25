import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(user: User): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/authenticate',user);
  }

  getUser(id: String): Observable<User>{
    return this.http.get<User>(`http://localhost:3000/api/user/${id}`);
  }

}
