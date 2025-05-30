import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PublishHomeEvent {
  private publishHomeCreatedSource = new Subject<void>();

  
  publishHomeCreated$ = this.publishHomeCreatedSource.asObservable();

  notifyPublishHomeCreated() {
    this.publishHomeCreatedSource.next();
  }

}