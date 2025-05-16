import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryEventService {
  private categoryCreatedSource = new Subject<void>();

  categoryCreated$ = this.categoryCreatedSource.asObservable();

  notifyCategoryCreated() {
    this.categoryCreatedSource.next();
  }
}