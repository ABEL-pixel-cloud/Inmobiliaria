import { HttpClient , HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';
import { CategoryResponse } from '../models/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private apiUrl = 'http://localhost:8081/api/v1/category/create-category';
  private apiUrl2 = 'http://localhost:8081/api/v1/category/list-category';

  constructor(private http: HttpClient) { }

  postData(data: Category): Observable<Category>{
    return this.http.post<Category>(this.apiUrl, data)
    .pipe(
        catchError(this.handleError)
      );
  }
  
   getCategories(page: number, size: number, orderAsc: boolean): Observable<CategoryResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderAsc', orderAsc.toString());
    const url = this.apiUrl2; 
    return this.http.get<CategoryResponse>(url, { params }).pipe(
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
