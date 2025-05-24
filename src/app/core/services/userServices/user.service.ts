import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8083/api/v1/user/create-user';

  constructor(private http: HttpClient) { }

  createUser(data: Omit<User, 'role'>): Observable<User> {
    const userWithRole: User = {...data,
      role: 1 
    };

    return this.http.post<User>(this.apiUrl, userWithRole)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Ocurrió un error inesperado.';
    
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else if (error.error?.message) {
      errorMsg = error.error.message;
    }

    return throwError(() => new Error(errorMsg));
  }

}