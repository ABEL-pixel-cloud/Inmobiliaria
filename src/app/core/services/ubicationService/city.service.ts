import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { cityModel } from '../../models/cityModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:8081/api/v1/location/list-cities';
  private apiUrl2 = 'http://localhost:8081/api/v1/location/create-city';

  constructor(private http: HttpClient) { }

  postCity(data: cityModel): Observable<cityModel> {
    return this.http.post<cityModel>(this.apiUrl2, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCities(): Observable<cityModel[]> {
    return this.http.get<cityModel[]>(this.apiUrl).pipe(
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