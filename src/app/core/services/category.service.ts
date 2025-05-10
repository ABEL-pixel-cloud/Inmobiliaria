import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8081/api/v1/category/create-category';

  constructor(private http: HttpClient) { }

  postData(data: Category): Observable<Category>{
    return this.http.post<Category>(this.apiUrl, data)
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
