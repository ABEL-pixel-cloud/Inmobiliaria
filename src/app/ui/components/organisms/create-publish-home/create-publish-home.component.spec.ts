import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePublishHomeComponent, validActivationDate } from './create-publish-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick,flush  } from '@angular/core/testing';

import { CategoryService } from 'src/app/core/services/category.service';
import { LocationService } from 'src/app/core/services/ubicationService/location.service';
import { PublishHomeService } from 'src/app/core/services/publishHomeService/PublishHomeService.service';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { OrganismsModule } from '../organisms.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';


describe('CreatePublishHomeComponent', () => {
  let component: CreatePublishHomeComponent;
  let fixture: ComponentFixture<CreatePublishHomeComponent>;

  // Mock Services
  const mockCategoryService = {
    getAllCategories: jest.fn().mockReturnValue(of([{ id: 1, name: 'Casa' }]))
  };

  const mockLocationService = {
    filterLocations: jest.fn().mockReturnValue(of({ locations: [{ barrio: 'Norte', city: 'Bogotá' }] }))
  };

  const mockPublishService = {
    createPublishHome: jest.fn().mockReturnValue(of({}))
  };

  const mockToastr = {
    success: jest.fn(),
    error: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePublishHomeComponent],
      imports: [CommonModule,ReactiveFormsModule, FormsModule,AtomsModule, MoleculesModule, OrganismsModule,HttpClientTestingModule],
      providers: [
        { provide: PublishHomeService, useValue: mockPublishService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: LocationService, useValue: mockLocationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePublishHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar categorías y ubicaciones en ngOnInit', () => {
    component.ngOnInit();
    expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
    expect(mockLocationService.filterLocations).toHaveBeenCalledWith('', 0, 100, true);
  });

  it('debe marcar formulario como inválido si falta información', () => {
    component.publishForm.patchValue({
      name: '',
      address: '',
      description: '',
      numberOfRooms: null,
      numberOfBathrooms: null,
      price: null,
      category: null,
      location: null,
      activationDate: null
    });
    component.createPublishHome();
    expect(component.publishForm.invalid).toBe(true);
  });
  


it('debe llamar a normalizeName cuando se crea la publicación', () => {
  component.publishForm.setValue({
    name: 'Casa Bonita',
    address: 'Calle Falsa 123',
    description: 'Hermosa casa con jardín',
    numberOfRooms: 3,
    numberOfBathrooms: 2,
    price: 150000,
    category: 1,
    location: 1,
    activationDate: '2025-06-01'
  });

  expect(component.publishForm.valid).toBe(true);

  mockPublishService.createPublishHome.mockReturnValue(of({}));

  const normalizeSpy = jest.spyOn(component as any, 'normalizeName' as any);

  component.createPublishHome();

  expect(normalizeSpy).toHaveBeenCalled();
  expect(mockPublishService.createPublishHome).toHaveBeenCalled();
  expect(mockToastr.success).toHaveBeenCalledWith('Publicación creada con éxito');
});

  it('debe enviar el formulario si es válido', () => {
    const validDate = new Date();
    validDate.setDate(validDate.getDate() + 1);
    const dateStr = validDate.toISOString().split('T')[0];

    component.publishForm.setValue({
      name: 'Casa Bonita',
      address: 'Calle 123',
      description: 'Hermosa casa',
      numberOfRooms: 3,
      numberOfBathrooms: 2,
      price: 100000,
      category: 1,
      location: 1,
      activationDate: dateStr
    });

    component.createPublishHome();
    expect(mockPublishService.createPublishHome).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalledWith('Publicación creada con éxito');
  });

it('should show toastr error when createPublishHome service call fails', fakeAsync(() => {
  // Llenar el formulario con valores válidos
  component.publishForm.patchValue({
    name: 'Casa Bonita',
    address: 'Calle 123',
    description: 'Muy linda',
    numberOfRooms: 3,
    numberOfBathrooms: 2,
    price: 150000,
    category: 1,       // Asegúrate que category y location sean valores válidos (id o lo que corresponda)
    location: 1,
    activationDate: '2025-05-25'  // Debe ser un string en formato 'YYYY-MM-DD' para que el validador funcione
  });

  // Mockear que el servicio lance un error
  const error = new Error('Error al crear la publicación');
  mockPublishService.createPublishHome.mockReturnValue(throwError(() => error));

  // Ejecutar el método
  component.createPublishHome();
  tick();

  // Verificar que toastr.error fue llamado con el mensaje esperado
  expect(mockToastr.error).toHaveBeenCalledWith('Error al crear la publicación');
}));

it('should show toastr error when createPublishHome service call fails', fakeAsync(() => {
  component.publishForm.patchValue({
    name: 'Casa Bonita',
    address: 'Calle 123',
    description: 'Muy linda',
    numberOfRooms: 3,
    numberOfBathrooms: 2,
    price: 150000,
    category: 1,
    location: 1,
    activationDate: '2025-05-25'
  });

  const error = new Error('Error al crear la publicación');
  mockPublishService.createPublishHome.mockReturnValue(throwError(() => error));

  component.createPublishHome();

  // Asegurar que se ejecutan todas las tareas asíncronas
  flush();

  expect(mockToastr.error).toHaveBeenCalledWith('Error al crear la publicación');
}));
it('debe prevenir entrada de caracteres inválidos', () => {
  const event = new KeyboardEvent('keydown', { key: 'e' });
  const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

  component.preventInvalidInput(event);
  expect(preventDefaultSpy).toHaveBeenCalled();
});

it('debe permitir entrada de caracteres válidos', () => {
  const event = new KeyboardEvent('keydown', { key: '5' });
  const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

  component.preventInvalidInput(event);
  expect(preventDefaultSpy).not.toHaveBeenCalled();
});
it('debe mostrar error si falla al cargar categorías', () => {
  mockCategoryService.getAllCategories = jest.fn().mockReturnValue(throwError(() => 'Error'));
  component.ngOnInit();
  expect(mockToastr.error).toHaveBeenCalledWith('Error al cargar categorías');
});

it('debe mostrar error si falla al cargar ubicaciones', () => {
  mockLocationService.filterLocations = jest.fn().mockReturnValue(throwError(() => 'Error'));
  component.ngOnInit();
  expect(mockToastr.error).toHaveBeenCalledWith('Error al cargar ubicaciones');
});


  it('debe permitir la fecha de hoy', () => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0]; // yyyy-MM-dd
    const control = new FormControl(formatted, [validActivationDate()]);
    expect(control.errors).toBeNull();
  });

  it('debe permitir una fecha dentro de un mes', () => {
    const date = new Date();
    date.setDate(date.getDate() + 10); // 10 días adelante
    const formatted = date.toISOString().split('T')[0];
    const control = new FormControl(formatted, [validActivationDate()]);
    expect(control.errors).toBeNull();
  });

  it('debe marcar error si la fecha está en el pasado', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // Ayer
    const formatted = date.toISOString().split('T')[0];
    const control = new FormControl(formatted, [validActivationDate()]);
    expect(control.errors).toEqual({ pastDate: true });
  });

  it('debe marcar error si la fecha está más de un mes en el futuro', () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() + 1); // Un mes + 1 día
    const formatted = date.toISOString().split('T')[0];
    const control = new FormControl(formatted, [validActivationDate()]);
    expect(control.errors).toEqual({ futureDate: true });
  });
});