import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationEventService {
  private departmentCreatedSource = new Subject<void>();

  private cityCreatedSource = new Subject<void>();

  departmentCreated$ = this.departmentCreatedSource.asObservable();

  cityCreated$ = this.cityCreatedSource.asObservable();

  notifyDepartmentCreated() {
    this.departmentCreatedSource.next();
  }

  notifyCityCreated() {
    this.cityCreatedSource.next();
  }
}