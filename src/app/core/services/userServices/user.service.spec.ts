import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../models/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const userDataWithoutRole = {
    name: 'Laura',
    lastname: 'Gómez',
    document: '1122334455',
    phone: '3011122233',
    birthdate: '1995-05-15',
    email: 'laura@example.com',
    password: 'securepass123'
  };

  const userDataWithRole: User = {
    ...userDataWithoutRole,
    role: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user with role 1 and return it', () => {
    service.createUser(userDataWithoutRole).subscribe(response => {
      expect(response).toEqual(userDataWithRole);
    });

    const req = httpMock.expectOne('http://localhost:8083/api/v1/user/create-user');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userDataWithRole);

    req.flush(userDataWithRole);
  });

  it('should handle client-side error (ErrorEvent)', () => {
    const mockError = new ErrorEvent('Network error');

    service.createUser(userDataWithoutRole).subscribe({
      next: () => fail('should have failed'),
      error: error => {
        expect(error.message).toContain('Error: Network error');
      }
    });

    const req = httpMock.expectOne('http://localhost:8083/api/v1/user/create-user');
    req.error(mockError);
  });

  it('should handle server-side error with custom message', () => {
    const errorMessage = 'Correo ya registrado';

    service.createUser(userDataWithoutRole).subscribe({
      next: () => fail('should have failed'),
      error: error => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne('http://localhost:8083/api/v1/user/create-user');
    req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle unexpected server-side error without message', () => {
    service.createUser(userDataWithoutRole).subscribe({
      next: () => fail('should have failed'),
      error: error => {
        expect(error.message).toBe('Ocurrió un error inesperado.');
      }
    });

    const req = httpMock.expectOne('http://localhost:8083/api/v1/user/create-user');
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });
});