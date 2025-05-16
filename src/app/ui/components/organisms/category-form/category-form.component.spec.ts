import { OrganismsModule } from './../organisms.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CategoryFormComponent } from './category-form.component';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from 'src/app/ui/pages/admin/create-category/create-category.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let mockToastr: any;
  let mockCategoryService: any;

  beforeEach(async () => {
    mockToastr = { warning: jest.fn(), success: jest.fn(), error: jest.fn() };
    mockCategoryService = { postData: jest.fn().mockReturnValue(of({ message: 'ok' })) };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OrganismsModule,
        AtomsModule,
        MoleculesModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
      ],
      declarations: [CategoryFormComponent, CreateCategoryComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastr },
        { provide: CategoryService, useValue: mockCategoryService },
      ],
    });

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al servicio si el formulario es válido', () => {
    component.categoryForm.controls['name'].setValue('Casa campestre');
    component.categoryForm.controls['description'].setValue('Casa del campo');

    component.sendData();

    expect(mockCategoryService.postData).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalledWith('Categoría creada exitosamente');
  });

  it('no debería llamar al servicio si el formulario es inválido', () => {
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['description'].setValue('');

    component.sendData();

    expect(mockCategoryService.postData).not.toHaveBeenCalled();
  });

  it('debería mostrar un toastr de error si el servicio falla', () => {
    mockCategoryService.postData.mockReturnValueOnce(
      throwError(() => ({ message: 'Error del servidor' }))
    );

    component.categoryForm.controls['name'].setValue('Categoría X');
    component.categoryForm.controls['description'].setValue('Descripción de prueba');

    component.sendData();

    expect(mockToastr.error).toHaveBeenCalledWith('Error del servidor');
  });
});