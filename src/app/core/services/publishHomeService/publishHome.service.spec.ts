import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublishHomeService } from './PublishHomeService.service';
import { PublishHome } from '../../models/PublishHome';
import { PublishHomeFilterParams, PublishPageResponse } from '../../models/filterHome';
describe('PublishHomeService', () => {
  const baseUrl = 'http://localhost:8081/api/v1/publish/filter-publishHome';
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

  
  it('debería hacer GET con todos los parámetros especificados', () => {
    const params: PublishHomeFilterParams = {
      location: 'Bogotá',
      category: '2',
      minRooms: 1,
      maxRooms: 4,
      minBathrooms: 1,
      maxBathrooms: 2,
      minPrice: 50000,
      maxPrice: 200000,
      sortBy: 'price',
      orderAsc: true,
      page: 3,
      size: 7
    };
    // Creamos un mock genérico, sin propiedades concretas
    const mockResponse: Partial<PublishPageResponse> = {};

    const spy = jest.fn();
    service.filterPublishHomes(params).subscribe(spy);

    const req = httpMock.expectOne(request =>
      request.url === baseUrl &&
      request.params.get('location') === 'Bogotá' &&
      request.params.get('category') === '2' &&
      request.params.get('minRooms') === '1' &&
      request.params.get('maxRooms') === '4' &&
      request.params.get('minBathrooms') === '1' &&
      request.params.get('maxBathrooms') === '2' &&
      request.params.get('minPrice') === '50000' &&
      request.params.get('maxPrice') === '200000' &&
      request.params.get('sortBy') === 'price' &&
      request.params.get('orderAsc') === 'true' &&
      request.params.get('page') === '3' &&
      request.params.get('size') === '7'
    );
    expect(req.request.method).toBe('GET');

    // Respondemos con el mock y comprobamos que el spy reciba ese objeto
    req.flush(mockResponse);
    expect(spy).toHaveBeenCalledWith(mockResponse as PublishPageResponse);
  });

  it('debería usar valores por defecto cuando falten parámetros opcionales', () => {
    const params: PublishHomeFilterParams = {};
    const mockResponse: Partial<PublishPageResponse> = {};

    const spy = jest.fn();
    service.filterPublishHomes(params).subscribe(spy);

    const req = httpMock.expectOne(request =>
      request.url === baseUrl &&
      request.params.get('sortBy') === 'price' &&
      request.params.get('orderAsc') === 'false' &&
      request.params.get('page') === '0' &&
      request.params.get('size') === '10'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
    expect(spy).toHaveBeenCalledWith(mockResponse as PublishPageResponse);
  });

  it('debería propagar error inesperado a través de handleError', () => {
    const spyError = jest.fn();
    service.filterPublishHomes({}).subscribe({
      next: () => fail('Se esperaba un error'),
      error: spyError
    });

    const req = httpMock.expectOne(() => true);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });

    // El mensaje viene de handleError(): "Ocurrió un error inesperado."
    expect(spyError).toHaveBeenCalled();
    const errArg = spyError.mock.calls[0][0] as Error;
    expect(errArg.message).toBe('Ocurrió un error inesperado.');
  });


  it('debería propagar error inesperado a través de handleError', () => {
    service.filterPublishHomes({}).subscribe({
      next: () => fail('Se esperaba un error'),
      error: (error: Error) => {
        expect(error.message).toBe('Ocurrió un error inesperado.');
      }
    });

    const req = httpMock.expectOne(() => true);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
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