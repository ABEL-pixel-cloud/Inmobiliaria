
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { departmentModel } from '../../models/departmentModel';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8081/api/v1/location/list-departments';
  private apiUrl2 = 'http://localhost:8081/api/v1/location/create-department';

  constructor(private http: HttpClient) { }

   postData(data: departmentModel): Observable<departmentModel>{
      return this.http.post<departmentModel>(this.apiUrl2, data)
      .pipe(
          catchError(this.handleError)
        );
    }
    

  getDepartments(): Observable<departmentModel[]> {
    return this.http.get<departmentModel[]>(this.apiUrl).pipe(
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