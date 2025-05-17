import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {  ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject, throwError } from 'rxjs';

import { CreateCityComponent } from './create-city.component';
import { CityService } from 'src/app/core/services/ubicationService/city.service';
import { DepartmentService } from 'src/app/core/services/ubicationService/department.service';
import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';
import { ToastrService } from 'ngx-toastr';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { OrganismsModule } from '../organisms.module';



describe('CreateCityComponent', () => {
  let component: CreateCityComponent;
  let fixture: ComponentFixture<CreateCityComponent>;

  let mockCityService: any;
  let mockDepartmentService: any;
  let mockToastr: any;
  let mockLocationEventService: any;
  let departmentCreatedSubject: Subject<void>;

  beforeEach(async () => {
    departmentCreatedSubject = new Subject<void>();

    mockCityService = {
      postCity: jest.fn()
    };

    mockDepartmentService = {
      getDepartments: jest.fn().mockReturnValue(of([
        { id: 1, name: 'Dept1' },
        { id: 2, name: 'Dept2' }
      ]))
    };

    mockToastr = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockLocationEventService = {
      departmentCreated$: departmentCreatedSubject,
      notifyCityCreated: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [
        CreateCityComponent,
      ],
      imports: [ReactiveFormsModule,AtomsModule,MoleculesModule,OrganismsModule],
      providers: [
        FormBuilder,
        { provide: CityService, useValue: mockCityService },
        { provide: DepartmentService, useValue: mockDepartmentService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: LocationEventService, useValue: mockLocationEventService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load departments on init', () => {
    expect(component.departments.length).toBe(2);
    expect(mockDepartmentService.getDepartments).toHaveBeenCalled();
  });

  it('should reload departments when LocationEventService.departmentCreated$ emits', fakeAsync(() => {
    const loadDepartmentsSpy = jest.spyOn(component as any, 'loadDepartments');

    // Emit event
    departmentCreatedSubject.next();

    tick();

    expect(loadDepartmentsSpy).toHaveBeenCalled();
  }));

  it('should have invalid form when empty', () => {
    expect(component.cityform.valid).toBe(false);
  });

  it('should mark all as touched and not call postCity if form invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.cityform, 'markAllAsTouched');
    mockCityService.postCity.mockClear();

    component.createCity();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(mockCityService.postCity).not.toHaveBeenCalled();
  });

  it('should call postCity and show success toastr on createCity success', () => {
    component.cityform.setValue({ name: 'City', description: 'Desc', department: 1 });
    mockCityService.postCity.mockReturnValue(of({}));

    component.createCity();

    expect(mockCityService.postCity).toHaveBeenCalledWith({
      name: 'City',
      description: 'Desc',
      department: 1
    });
    expect(mockToastr.success).toHaveBeenCalledWith('Ciudad creada exitosamente');
    expect(component.cityform.pristine).toBe(true);
    expect(mockLocationEventService.notifyCityCreated).toHaveBeenCalled();
  });

  it('should show error toastr on createCity error', () => {
    component.cityform.setValue({ name: 'City', description: 'Desc', department: 1 });
    const error = { message: 'Error message' };
    mockCityService.postCity.mockReturnValue(throwError(() => error));

    component.createCity();

    expect(mockToastr.error).toHaveBeenCalledWith('Error message');
  });
  it('should show error toastr when getDepartments fails', fakeAsync(() => {
  // Mock que getDepartments falla con un error con message
  mockDepartmentService.getDepartments.mockReturnValue(
    throwError(() => ({ message: 'Error al cargar departamentos' }))
  );

  // Llamamos al método privado loadDepartments manualmente (o al ngOnInit)
  // Si el loadDepartments es privado, se puede llamar con (component as any).loadDepartments()
  (component as any).loadDepartments();

  tick();

  expect(mockToastr.error).toHaveBeenCalledWith('Error al cargar departamentos');
}));
});