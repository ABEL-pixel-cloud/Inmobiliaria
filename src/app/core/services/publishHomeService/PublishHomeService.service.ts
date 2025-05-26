
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PublishHome } from '../../models/PublishHome';


@Injectable({
  providedIn: 'root'
})
export class PublishHomeService {

 private apiUrl = 'http://localhost:8081/api/v1/publish/create-home';
  private sellerId = 1; 

  constructor(private http: HttpClient) {}

  createPublishHome(data: Omit<PublishHome, 'sellerId'>): Observable<PublishHome> {
    const requestData: PublishHome = {
      ...data,
      sellerId: this.sellerId
    };

    return this.http.post<PublishHome>(this.apiUrl, requestData)
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