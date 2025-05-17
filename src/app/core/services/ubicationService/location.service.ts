import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { locationModel } from '../../models/locationModel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl1 = 'http://localhost:8081/api/v1/location/create-location';

  constructor(private http: HttpClient) { }

  postLocation(data: locationModel): Observable<locationModel> {
    return this.http.post<locationModel>(this.apiUrl1, data)
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