import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UbicationListComponent } from './ubication-list.component';
import { LocationService } from 'src/app/core/services/ubicationService/location.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError, Subject } from 'rxjs';
import { MoleculesModule } from '../../molecules/molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';

describe('UbicationListComponent', () => {
  let component: UbicationListComponent;
  let fixture: ComponentFixture<UbicationListComponent>;
  let mockLocationService: any;
  let mockLocationEventService: any;
  let locationCreatedSubject: Subject<void>;

  const PAGE_SIZE = 10;

  const mockResponse = {
    locations: [
      { barrio: 'Barrio 1', city: 'Ciudad 1' },
      { barrio: 'Barrio 2', city: 'Ciudad 2' }
    ],
    totalPages: 3,
    currentPage: 0,
  };

  beforeEach(async () => {
    locationCreatedSubject = new Subject<void>();

    mockLocationService = {
      filterLocations: jest.fn().mockReturnValue(of(mockResponse))
    };

    mockLocationEventService = {
      locationCreated$: locationCreatedSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      declarations: [UbicationListComponent],
      imports: [ReactiveFormsModule, MoleculesModule, AtomsModule],
      providers: [
        { provide: LocationService, useValue: mockLocationService },
        { provide: LocationEventService, useValue: mockLocationEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UbicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar ubicaciones al iniciar (ngOnInit)', () => {
    expect(mockLocationService.filterLocations).toHaveBeenCalledWith('', 0, PAGE_SIZE, true);
    expect(component.locations.length).toBe(2);
    expect(component.totalPages).toBe(3);
    expect(component.currentPage).toBe(0);
  });

  it('debería asignar searchTerm como cadena vacía si el valor es null o vacío', fakeAsync(() => {
    const spyLoad = jest.spyOn(component, 'loadLocations');

    component.name.setValue(null);
    tick();
    expect(component.searchTerm).toBe('');
    expect(spyLoad).toHaveBeenCalledWith(0);

    component.name.setValue('');
    tick();
    expect(component.searchTerm).toBe('');
    expect(spyLoad).toHaveBeenCalledTimes(2);
  }));

  it('debería aplicar el filtro cuando se llama applyFilters()', () => {
    component.name.setValue('Barrio 1');
    component.order.setValue(true); // formulario válido

    const spyLoad = jest.spyOn(component, 'loadLocations');

    component.applyFilters();

    expect(component.searchTerm).toBe('Barrio 1');
    expect(spyLoad).toHaveBeenCalledWith(0);
  });

  it('no debería aplicar filtro si el formulario es inválido', () => {
    component.ubicationList.get('order')?.setValue(null);
    const spyLoad = jest.spyOn(component, 'loadLocations');

    component.applyFilters();

    expect(spyLoad).not.toHaveBeenCalled();
  });

  it('debería asignar cadena vacía a searchTerm si name es null al aplicar filtros', () => {
    component.name.setValue(null);
    component.order.setValue(true); // para que sea válido

    const spyLoad = jest.spyOn(component, 'loadLocations');

    component.applyFilters();

    expect(component.searchTerm).toBe('');
    expect(spyLoad).toHaveBeenCalledWith(0);
  });

  it('debería cambiar de página con nextPage()', () => {
    component.currentPage = 0;
    component.totalPages = 3;
    const spyLoad = jest.spyOn(component, 'loadLocations');

    component.nextPage();

    expect(spyLoad).toHaveBeenCalledWith(1);
  });

  it('no debería avanzar si nextPage() es llamado en la última página', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    const spyGo = jest.spyOn(component, 'goToPage');

    component.nextPage();

    expect(spyGo).not.toHaveBeenCalled();
  });

  it('debería cambiar de página con previousPage()', () => {
    component.currentPage = 2;
    const spyLoad = jest.spyOn(component, 'loadLocations');

    component.previousPage();

    expect(spyLoad).toHaveBeenCalledWith(1);
  });

  it('no debería retroceder si previousPage() es llamado en la primera página', () => {
    component.currentPage = 0;
    const spyGo = jest.spyOn(component, 'goToPage');

    component.previousPage();

    expect(spyGo).not.toHaveBeenCalled();
  });

  it('debería manejar errores al cargar ubicaciones', fakeAsync(() => {
    mockLocationService.filterLocations.mockReturnValueOnce(
      throwError(() => new Error('Error de red'))
    );

    component.loadLocations(0);
    tick();

    expect(component.errorMessage).toBe('Ocurrió un error al cargar las ubicaciones. Intenta nuevamente.');
  }));

  it('debería recargar ubicaciones al recibir evento locationCreated$', () => {
    const spyLoad = jest.spyOn(component, 'loadLocations');

    locationCreatedSubject.next();

    expect(spyLoad).toHaveBeenCalledWith(component.currentPage);
  });
});