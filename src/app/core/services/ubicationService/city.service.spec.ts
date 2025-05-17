import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CityService } from './city.service';
import { cityModel } from '../../models/cityModel';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;

  const dummyCity: cityModel = {
    id: 1,
    name: 'Ciudad Prueba',
    description: 'Descripción de prueba',
    department: 2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CityService],
    });

    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities (getCities)', () => {
    service.getCities().subscribe((cities) => {
      expect(cities.length).toBe(1);
      expect(cities[0].name).toBe('Ciudad Prueba');
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/list-cities');
    expect(req.request.method).toBe('GET');
    req.flush([dummyCity]);
  });

  it('should post city (postCity)', () => {
    service.postCity(dummyCity).subscribe((city) => {
      expect(city).toEqual(dummyCity);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-city');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCity);
  });

  // Test para cubrir la línea con ErrorEvent en handleError
  it('should handle ErrorEvent on getCities', () => {
    service.getCities().subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Error: Error en la conexión');
      },
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/list-cities');
    req.error(
      new ErrorEvent('Network error', {
        message: 'Error en la conexión',
      })
    );
  });

  it('should handle ErrorEvent on postCity', () => {
    service.postCity(dummyCity).subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Error: Error en la conexión');
      },
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-city');
    req.error(
      new ErrorEvent('Network error', {
        message: 'Error en la conexión',
      })
    );
  });

  // Test para cubrir error con body.message (la otra rama)
  it('should handle HttpErrorResponse with message on getCities', () => {
    const errorMessage = 'Error personalizado del servidor';

    service.getCities().subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain(errorMessage);
      },
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/list-cities');
    req.flush(
      { message: errorMessage },
      { status: 500, statusText: 'Server Error' }
    );
  });
});