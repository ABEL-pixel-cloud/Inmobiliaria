import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category, CategoryResponse } from '../models/category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const dummyCategory: Category = {
    name: 'Electrónica',
    description: 'Artículos tecnológicos'
  };

  const dummyCategoryResponse: CategoryResponse = {
    categories: [dummyCategory],
    totalPages: 1,
    totalElements: 1,
    currentPage: 0,
    pageSize: 10,
    hasPrevious: false,
    hasNext: false,
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
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request and return the created category', () => {
    service.postData(dummyCategory).subscribe(res => {
      expect(res).toEqual(dummyCategory);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCategory);

    req.flush(dummyCategory);
  });

  it('should handle client-side error on postData', () => {
    const errorEvent = new ErrorEvent('Network error');

    service.postData(dummyCategory).subscribe({
      next: () => fail('should have failed with client-side error'),
      error: error => {
        expect(error.message).toContain('Error: Network error');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    req.error(errorEvent);
  });

  it('should handle server-side error with message on postData', () => {
    const mockErrorMsg = 'Categoría ya existe';

    service.postData(dummyCategory).subscribe({
      next: () => fail('should have failed with server-side error'),
      error: error => {
        expect(error.message).toBe(mockErrorMsg);
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    req.flush({ message: mockErrorMsg }, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle unexpected server-side error without message on postData', () => {
    service.postData(dummyCategory).subscribe({
      next: () => fail('should have failed with generic error'),
      error: error => {
        expect(error.message).toBe('Ocurrió un error inesperado.');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category/create-category');
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should send GET request and return categories with pagination', () => {
    const page = 0;
    const size = 10;
    const orderAsc = true;

    service.getCategories(page, size, orderAsc).subscribe(res => {
      expect(res).toEqual(dummyCategoryResponse);
      expect(res.categories.length).toBeGreaterThan(0);
      expect(res.pageSize).toBe(size);
    });

    const req = httpMock.expectOne(request =>
      request.url === 'http://localhost:8081/api/v1/category/list-category' &&
      request.params.get('page') === page.toString() &&
      request.params.get('size') === size.toString() &&
      request.params.get('orderAsc') === orderAsc.toString()
    );

    expect(req.request.method).toBe('GET');

    req.flush(dummyCategoryResponse);
  });

  it('should handle error on getCategories', () => {
    service.getCategories(0, 10, true).subscribe({
      next: () => fail('should have failed with an error'),
      error: error => {
        expect(error.message).toBe('Ocurrió un error inesperado.');
      }
    });

   const req = httpMock.expectOne(request =>
  request.url === 'http://localhost:8081/api/v1/category/list-category' &&
  request.params.get('page') === '0' &&
  request.params.get('size') === '10' &&
  request.params.get('orderAsc') === 'true'
);

req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

});
