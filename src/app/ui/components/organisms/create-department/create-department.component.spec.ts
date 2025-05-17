import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

import { CreateDepartmentComponent } from './create-department.component';
import { DepartmentService } from 'src/app/core/services/ubicationService/department.service';
import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';

describe('CreateDepartmentComponent', () => {
  let component: CreateDepartmentComponent;
  let fixture: ComponentFixture<CreateDepartmentComponent>;
  let mockToastr: any;
  let mockDepartmentService: any;
  let mockLocationEventService: any;

  beforeEach(async () => {
    mockToastr = { success: jest.fn(), error: jest.fn() };
    mockDepartmentService = { postData: jest.fn().mockReturnValue(of({ message: 'ok' })) };
    mockLocationEventService = { notifyDepartmentCreated: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        AtomsModule,
        MoleculesModule
      ],
      declarations: [CreateDepartmentComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastr },
        { provide: DepartmentService, useValue: mockDepartmentService },
        { provide: LocationEventService, useValue: mockLocationEventService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.departmentform.valid).toBeFalsy();
  });

  it('debería llamar al servicio si el formulario es válido', () => {
    component.departmentform.controls['name'].setValue('Departamento Norte');
    component.departmentform.controls['description'].setValue('Zona norte del país');

    component.sendData();

    expect(mockDepartmentService.postData).toHaveBeenCalledTimes(1);
    expect(mockToastr.success).toHaveBeenCalledWith('Departamento creado exitosamente');
    expect(mockLocationEventService.notifyDepartmentCreated).toHaveBeenCalledTimes(1);
  });

  it('no debería llamar al servicio si el formulario es inválido', () => {
    component.departmentform.controls['name'].setValue('');
    component.departmentform.controls['description'].setValue('');

    component.sendData();

    expect(mockDepartmentService.postData).not.toHaveBeenCalled();
    expect(mockToastr.success).not.toHaveBeenCalled();
  });

  it('debería mostrar un toastr de error si el servicio falla', () => {
    mockDepartmentService.postData.mockReturnValueOnce(
      throwError(() => ({ message: 'Error al crear el departamento' }))
    );

    component.departmentform.controls['name'].setValue('Departamento Sur');
    component.departmentform.controls['description'].setValue('Zona sur del país');

    component.sendData();

    expect(mockToastr.error).toHaveBeenCalledWith('Error al crear el departamento');
  });
});