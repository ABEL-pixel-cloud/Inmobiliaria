import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublishHomeService } from './PublishHomeService.service';
import { PublishHome } from '../../models/PublishHome';

describe('PublishHomeService', () => {
  let service: PublishHomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublishHomeService]
    });

    service = TestBed.inject(PublishHomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear la publicación correctamente', () => {
    const publishData: Omit<PublishHome, 'sellerId'> = {
      name: 'Casa Bonita',
      address: 'Calle 123',
      description: 'Descripción',
      numberOfRooms: 3,
      numberOfBathrooms: 2,
      price: 100000,
      category: 1,
      location: 1,
      activationDate: '2025-06-01'
    };

    const mockResponse: PublishHome = {
      ...publishData,
      sellerId: 1
    };

    service.createPublishHome(publishData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/publish/create-home');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockResponse);

    req.flush(mockResponse);
  });

  it('debería manejar error tipo cliente (ErrorEvent)', () => {
    const publishData: Omit<PublishHome, 'sellerId'> = {
      name: 'Casa Bonita',
      address: 'Calle 123',
      description: 'Descripción',
      numberOfRooms: 3,
      numberOfBathrooms: 2,
      price: 100000,
      category: 1,
      location: 1,
      activationDate: '2025-06-01'
    };

    service.createPublishHome(publishData).subscribe({
      next: () => fail('debería haber fallado con error cliente'),
      error: (error) => {
        expect(error.message).toContain('Error: ');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/publish/create-home');

    const mockError = new ErrorEvent('Network error', {
      message: 'Falla de conexión'
    });

    req.error(mockError);
  });

  it('debería manejar error con mensaje del servidor', () => {
    const publishData: Omit<PublishHome, 'sellerId'> = {
      name: 'Casa Bonita',
      address: 'Calle 123',
      description: 'Descripción',
      numberOfRooms: 3,
      numberOfBathrooms: 2,
      price: 100000,
      category: 1,
      location: 1,
      activationDate: '2025-06-01'
    };

    service.createPublishHome(publishData).subscribe({
      next: () => fail('debería haber fallado con error servidor'),
      error: (error) => {
        expect(error.message).toBe('Error específico del servidor');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/publish/create-home');

    req.flush({ message: 'Error específico del servidor' }, { status: 400, statusText: 'Bad Request' });
  });

  it('debería manejar error inesperado sin mensaje', () => {
    const publishData: Omit<PublishHome, 'sellerId'> = {
      name: 'Casa Bonita',
      address: 'Calle 123',
      description: 'Descripción',
      numberOfRooms: 3,
      numberOfBathrooms: 2,
      price: 100000,
      category: 1,
      location: 1,
      activationDate: '2025-06-01'
    };

    service.createPublishHome(publishData).subscribe({
      next: () => fail('debería haber fallado con error inesperado'),
      error: (error) => {
        expect(error.message).toBe('Ocurrió un error inesperado.');
      }
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1/publish/create-home');

    // Respuesta sin mensaje
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  }
);
});