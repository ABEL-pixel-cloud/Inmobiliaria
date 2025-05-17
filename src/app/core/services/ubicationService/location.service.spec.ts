import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { locationModel } from '../../models/locationModel';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;

  const dummyLocation: locationModel = {
    id: 1,
    barrio: 'Barrio Prueba',
    city: 100
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService],
    });

    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post location (postLocation)', () => {
    service.postLocation(dummyLocation).subscribe(location => {
      expect(location).toEqual(dummyLocation);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-location');
    expect(req.request.method).toBe('POST');
    req.flush(dummyLocation);
  });

  it('should handle ErrorEvent in postLocation', () => {
    service.postLocation(dummyLocation).subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Error: Error de red');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-location');
    req.error(new ErrorEvent('Network error', { message: 'Error de red' }));
  });

  it('should handle HttpErrorResponse with message in postLocation', () => {
    const errorMessage = 'Error personalizado del servidor';

    service.postLocation(dummyLocation).subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain(errorMessage);
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-location');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Error Servidor' });
  });
});