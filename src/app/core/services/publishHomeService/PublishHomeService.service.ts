

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PublishHome } from '../../models/PublishHome';
import { PublishHomeFilterParams,PublishPageResponse } from '../../models/filterHome';

@Injectable({
  providedIn: 'root'
})
export class PublishHomeService {

  private baseUrl = 'http://localhost:8081/api/v1/publish';
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

  
filterPublishHomes(params: PublishHomeFilterParams): Observable<PublishPageResponse> {
    let queryParams = new HttpParams();

    if (params.location) queryParams = queryParams.set('location', params.location);
    if (params.category) queryParams = queryParams.set('category', params.category);
    if (params.minRooms != null) queryParams = queryParams.set('minRooms', params.minRooms.toString());
    if (params.maxRooms != null) queryParams = queryParams.set('maxRooms', params.maxRooms.toString());
    if (params.minBathrooms != null) queryParams = queryParams.set('minBathrooms', params.minBathrooms.toString());
    if (params.maxBathrooms != null) queryParams = queryParams.set('maxBathrooms', params.maxBathrooms.toString());
    if (params.minPrice != null) queryParams = queryParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice != null) queryParams = queryParams.set('maxPrice', params.maxPrice.toString());

    queryParams = queryParams.set('sortBy', params.sortBy || 'price');
    queryParams = queryParams.set('orderAsc', String(params.orderAsc ?? false));
    queryParams = queryParams.set('page', String(params.page ?? 0));
    queryParams = queryParams.set('size', String(params.size ?? 10));

    return this.http.get<PublishPageResponse>(`${this.baseUrl}/filter-publishHome`, { params: queryParams })
      .pipe(catchError(this.handleError));
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