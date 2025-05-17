
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';
import { DepartmentService } from 'src/app/core/services/ubicationService/department.service';
import { CityService } from 'src/app/core/services/ubicationService/city.service';
import { cityModel } from 'src/app/core/models/cityModel';
import { departmentModel } from 'src/app/core/models/departmentModel';
import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss']
})
export class CreateCityComponent implements OnInit{
  departments: departmentModel[] = [];
  cityform: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private CityService: CityService,
    private DepartmentService:DepartmentService,
    private LocationEventService: LocationEventService

  ) {
    this.cityform = this.buildForm();
  }

  ngOnInit(): void {
    this.loadDepartments();

    this.LocationEventService.departmentCreated$.subscribe(() => {
      this.loadDepartments(); 
    });
  }
private loadDepartments(): void {
  this.DepartmentService.getDepartments().subscribe({
    next: (departments) => {
      this.departments = departments;
    },
    error: () => {
      this.toastr.error('Error al cargar departamentos');
      // Eliminado console.error para no mostrar en consola
    }
  });
}

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_NAME_LENGTH)]],
      description: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_DESCRIPTION_LENGTH)]],
      department: [null, [Validators.required]] 
    });
  }


  get cityName(): FormControl {
    return this.cityform.get('name') as FormControl;
  }

  get cityDescription(): FormControl {
    return this.cityform.get('description') as FormControl;
  }

  get department() {
    return this.cityform.get('department') as FormControl;
  }


  createCity(): void {
  if (this.cityform.invalid) {
    this.cityform.markAllAsTouched();
    return;
  }
  const formValue = this.cityform.value;

  const newCity: cityModel = {
    name: formValue.name,
    description: formValue.description,
    department: formValue.department
  };

  this.CityService.postCity(newCity).subscribe({
    next: () => {
      this.toastr.success('Ciudad creada exitosamente');
      this.cityform.reset();
      this.LocationEventService.notifyCityCreated();
    },
    error: (e) => {
      this.toastr.error(e.message);
    },
  });
}
}