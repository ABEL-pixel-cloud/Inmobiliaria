import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';
import { departmentModel } from '../../models/departmentModel';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  const dummyDepartment: departmentModel = {
    id: 1,
    name: 'Departamento Prueba',
    description: 'Descripción de prueba',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService],
    });

    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch departments (getDepartments)', () => {
    service.getDepartments().subscribe((departments) => {
      expect(departments.length).toBe(1);
      expect(departments[0].name).toBe('Departamento Prueba');
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/list-departments');
    expect(req.request.method).toBe('GET');
    req.flush([dummyDepartment]);
  });

  it('should post department (postData)', () => {
    service.postData(dummyDepartment).subscribe((department) => {
      expect(department).toEqual(dummyDepartment);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-department');
    expect(req.request.method).toBe('POST');
    req.flush(dummyDepartment);
  });

  // Test para error tipo ErrorEvent (red/cliente)
  it('should handle ErrorEvent on getDepartments', () => {
    service.getDepartments().subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Error: Error de red');
      },
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/list-departments');
    req.error(
      new ErrorEvent('Network error', {
        message: 'Error de red',
      })
    );
  });

  it('should handle ErrorEvent on postData', () => {
    service.postData(dummyDepartment).subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Error: Error de red');
      },
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/create-department');
    req.error(
      new ErrorEvent('Network error', {
        message: 'Error de red',
      })
    );
  });

  // Test para error con mensaje personalizado en body
  it('should handle HttpErrorResponse with message on getDepartments', () => {
    const errorMessage = 'Error del servidor personalizado';

    service.getDepartments().subscribe({
      next: () => fail('Se esperaba error, pero fue correcto'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain(errorMessage);
      },
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/location/list-departments');
    req.flush(
      { message: errorMessage },
      { status: 500, statusText: 'Error Servidor' }
    );
  });
});