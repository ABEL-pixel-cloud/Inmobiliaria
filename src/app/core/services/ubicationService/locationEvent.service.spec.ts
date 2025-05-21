import { TestBed } from '@angular/core/testing';
import { LocationEventService } from './locationEvent.service';

describe('LocationEventService', () => {
  let service: LocationEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit when notifyDepartmentCreated is called', (done) => {
    service.departmentCreated$.subscribe(() => {
      // Si llega aquí, se emitió correctamente
      done();
    });
    service.notifyDepartmentCreated();
  });

  it('should emit when notifyCityCreated is called', (done) => {
    service.cityCreated$.subscribe(() => {
      done();
    });
    service.notifyCityCreated();
  });

   it('should emit when notifyLocationCreated is called', (done) => {
    service.locationCreated$.subscribe(() => {
      done();
    });
    service.notifyLocationCreated();
  });
});