import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const dummyCategory: Category = {
    name: 'Electrónica',
    description: 'Artículos tecnológicos'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request and return the created category', () => {
    service.postData(dummyCategory).subscribe((res) => {
      expect(res).toEqual(dummyCategory);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCategory);

    req.flush(dummyCategory); // Simula respuesta del backend
  });

  it('should handle client-side error', () => {
    const errorEvent = new ErrorEvent('Network error');

    service.postData(dummyCategory).subscribe({
      next: () => fail('should have failed with client-side error'),
      error: (error) => {
        expect(error.message).toContain('Error: Network error');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    req.error(errorEvent);
  });

  it('should handle server-side error with message', () => {
    const mockErrorMsg = 'Categoría ya existe';

    service.postData(dummyCategory).subscribe({
      next: () => fail('should have failed with server-side error'),
      error: (error) => {
        expect(error.message).toBe(mockErrorMsg);
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    req.flush({ message: mockErrorMsg }, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle unexpected server-side error without message', () => {
    service.postData(dummyCategory).subscribe({
      next: () => fail('should have failed with generic error'),
      error: (error) => {
        expect(error.message).toBe('Ocurrió un error inesperado.');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });
});