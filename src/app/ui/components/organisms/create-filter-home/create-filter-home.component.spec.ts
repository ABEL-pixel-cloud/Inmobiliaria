import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, of, throwError } from 'rxjs';

import { CreateFilterHomeComponent } from './create-filter-home.component';
import { PublishHomeEvent } from 'src/app/core/services/publishHomeService/PublishHomeEvent.service';
import { PublishHomeService } from 'src/app/core/services/publishHomeService/PublishHomeService.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { PublishPageResponse } from 'src/app/core/models/filterHome';
import { AtomsModule } from '../../atoms/atoms.module';
import { OrganismsModule } from '../organisms.module';
import { MoleculesModule } from '../../molecules/molecules.module';

describe('CreateFilterHomeComponent', () => {
  let component: CreateFilterHomeComponent;
  let fixture: ComponentFixture<CreateFilterHomeComponent>;
  let mockPubEvent: { publishHomeCreated$: Subject<void> };
  let mockPublishService: { filterPublishHomes: jest.Mock };
  let mockCategoryService: { getAllCategories: jest.Mock };
  let loadHomesSpy: jest.SpyInstance;
  let loadCategoriesSpy: jest.SpyInstance;

  beforeEach(async () => {
     mockPublishService = {
    filterPublishHomes: jest.fn().mockReturnValue(of(/* ... */))
  };
    // Primero creamos el mock del servicio antes de instanciar el componente
   mockPublishService.filterPublishHomes = jest.fn((filter) => {
    return of({
    home: [],
    totalPages: 3,
    currentPage: filter.page ?? 0,  // ajusta el currentPage con el valor del filtro recibido
    totalElements: 0,
    pageSize: 10,
    hasPrevious: filter.page > 0,
    hasNext: filter.page < 2
  } as PublishPageResponse);
});

    mockCategoryService = { getAllCategories: jest.fn().mockReturnValue(of([])) };
    mockPubEvent = { publishHomeCreated$: new Subject<void>() };

    await TestBed.configureTestingModule({
      declarations: [CreateFilterHomeComponent],
      imports: [AtomsModule, OrganismsModule, MoleculesModule],
      providers: [
        FormBuilder,
        { provide: PublishHomeEvent, useValue: mockPubEvent },
        { provide: PublishHomeService, useValue: mockPublishService },
        { provide: CategoryService, useValue: mockCategoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFilterHomeComponent);
    component = fixture.componentInstance;

    // Inicializamos valores necesarios antes de detectChanges
    component.totalPages = 3;
    component.currentPage = 0;

    // Espiamos los métodos para verificar llamadas
    loadHomesSpy = jest.spyOn(component, 'loadHomes');
    loadCategoriesSpy = jest.spyOn(component, 'loadCategories');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call loadHomes and loadCategories', () => {
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
    expect(loadCategoriesSpy).toHaveBeenCalledTimes(1);
  });

  it('should reload homes when publishHomeCreated$ emits', () => {
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
    mockPubEvent.publishHomeCreated$.next();
    expect(loadHomesSpy).toHaveBeenCalledTimes(2);
  });

  it('should reload homes on location value change', () => {
    loadHomesSpy.mockClear();
    component.location.setValue('Test location');
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
  });

  it('should reload homes when all filters are empty after other changes', () => {
    loadHomesSpy.mockClear();
    component.minPrice.setValue(100);
    expect(loadHomesSpy).toHaveBeenCalledTimes(0);
    component.minPrice.setValue(null);
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
  });

  it('applyFilters should reset page, call loadHomes and close modal', () => {
    loadHomesSpy.mockClear();
    component.currentPage = 2;
    component.showExtrasModal = true;

    component.applyFilters();

    expect(component.currentPage).toBe(0);
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);
    expect(component.showExtrasModal).toBe(false);
  });

  it('openExtrasModal and closeExtrasModal toggles showExtrasModal', () => {
    component.showExtrasModal = false;
    component.openExtrasModal();
    expect(component.showExtrasModal).toBe(true);

    component.closeExtrasModal();
    expect(component.showExtrasModal).toBe(false);
  });

  it('goToPage should change page within bounds and call loadHomes', () => {
    loadHomesSpy.mockClear();
    component.goToPage(2);

    expect(component.currentPage).toBe(2);
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);

    component.currentPage = 1;
    loadHomesSpy.mockClear();
    component.goToPage(5); // fuera de rango

    expect(component.currentPage).toBe(1);
    expect(loadHomesSpy).not.toHaveBeenCalled();
  });

  it('previousPage and nextPage should navigate correctly', () => {
    component.currentPage = 1;
    loadHomesSpy.mockClear();

    component.previousPage();
    expect(component.currentPage).toBe(0);
    expect(loadHomesSpy).toHaveBeenCalledTimes(1);

    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(loadHomesSpy).toHaveBeenCalledTimes(2);

    component.currentPage = 0;
    loadHomesSpy.mockClear();
    component.previousPage();
    expect(component.currentPage).toBe(0);
    expect(loadHomesSpy).not.toHaveBeenCalled();

    component.currentPage = component.totalPages - 1;
    loadHomesSpy.mockClear();
    component.nextPage();
    expect(component.currentPage).toBe(component.totalPages - 1);
    expect(loadHomesSpy).not.toHaveBeenCalled();
  });

  it('should set errorMessage when loadCategories errors', () => {
    mockCategoryService.getAllCategories.mockReturnValueOnce(
      throwError(() => new Error('fail'))
    );

    component.loadCategories();
    expect(component.errorMessage).toBe('Error al cargar las categorías.');
  });

  it('should set errorMessage when loadHomes errors', () => {
    mockPublishService.filterPublishHomes.mockReturnValueOnce(
      throwError(() => new Error('service fail'))
    );

    component.loadHomes();
    expect(component.errorMessage).toBe(
      'Ocurrió un error al cargar las publicaciones. Intenta nuevamente.'
    );
  });

  it('nextPage should increment currentPage via goToPage when not on last page', () => {
    component.totalPages = 5;
    component.currentPage = 2;
    const goToPageSpy = jest.spyOn(component, 'goToPage');

    component.nextPage();

    expect(goToPageSpy).toHaveBeenCalledWith(3);
  });

  it('should return sortBy FormControl', () => {
    component.filterForm = component['fb'].group({
      sortBy: ['price']
    });

    const control = component.sortBy;
    expect(control).toBeTruthy();
    expect(control instanceof FormControl).toBe(true);
    expect(control.value).toBe('price');
  });

 

  it('should map homes data with fallbacks correctly in loadHomes', () => {
    const mockResponse: PublishPageResponse = {
      home: [
        {
          id: 1,
          name: 'Casa 1',
          address: 'Cra 1 #1-1',
          description: 'Casa hermosa',
          numberOfRooms: 3,
          numberOfBathrooms: 2,
          price: 150000,
          category: { id: 1, name: 'Casa', description: 'Categoría para casas' },
          location: {
            id: 1,
            barrio: 'Chapinero',
            city: {
              id: 1,
              name: 'Bogotá',
              description: 'Capital de Colombia',
              department: { id: 1, name: 'Cundinamarca', description: 'Departamento' }
            }
          },
          activationDate: '2025-01-01',
          creationDate: '2025-01-01',
          status: 'active',
          sellerId: 1
        },
        {
          id: 2,
          name: 'Casa 2',
          address: '',
          description: '',
          numberOfRooms: 0,
          numberOfBathrooms: 0,
          price: 0,
          category: { id: 0, name: '', description: '' }, // vacío para fallback
          location: {
            id: 0,
            barrio: '',
            city: {
              id: 0,
              name: '',
              description: '',
              department: { id: 0, name: '', description: '' }
            }
          },
          activationDate: '2025-01-01',
          creationDate: '2025-01-01',
          status: 'inactive',
          sellerId: 0
        }
      ],
      totalPages: 1,
      totalElements: 2,
      currentPage: 0,
      pageSize: 10,
      hasPrevious: false,
      hasNext: false
    };

    // Mockear el servicio para que retorne el observable con la respuesta simulada
    mockPublishService.filterPublishHomes.mockReturnValueOnce(of(mockResponse));

    // Ejecutar la función que hace el mapeo
    component.loadHomes();

    // Comprobar que homes tenga 2 elementos con los valores mapeados
    expect(component.homes.length).toBe(2);
    expect(component.homes[0].name).toBe('Casa 1');
    expect(component.homes[1].address).toBe('Sin dirección');
  });
});