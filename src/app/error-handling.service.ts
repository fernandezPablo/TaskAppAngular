import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }


  handleError(error){
    let errorMessage = '';

    errorMessage = (error.error instanceof ErrorEvent)? `Error: ${error.error.message}` : `Error Code: ${error.status}\nMessage: ${error.message}`;

    return throwError(errorMessage);
  }

}
