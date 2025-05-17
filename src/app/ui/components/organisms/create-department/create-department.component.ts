import { LocationEventService } from './../../../../core/services/ubicationService/locationEvent.service';
import { DepartmentService } from './../../../../core/services/ubicationService/department.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { departmentModel } from 'src/app/core/models/departmentModel';
import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';


@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent {
  
      departmentform: FormGroup;
    
      constructor(
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private DepartmentService:DepartmentService,
        private LocationEventService:LocationEventService,
      ) {
        this.departmentform = this.buildForm();
      }

    
      private buildForm(): FormGroup {
        return this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_NAME_LENGTH)]],
          description: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_DESCRIPTION_LENGTH)]],
        });
      }
    
      get departmentName(): FormControl {
        return this.departmentform.get('name') as FormControl;
      }
    
      get departmentDescription(): FormControl {
        return this.departmentform.get('description') as FormControl;
      }

      sendData(): void {
      if (this.departmentform.invalid) {
      this.departmentform.markAllAsTouched();
      return;
      }

      const newDepartment  = this.departmentform.value as departmentModel;
    
      this.DepartmentService.postData(newDepartment ).subscribe({
      next: () => {
      this.toastr.success('Departamento creado exitosamente');
      this.departmentform.reset();
      this.LocationEventService.notifyDepartmentCreated();
      },
      error: (e) => {
      this.toastr.error(e.message);
      },
      });
}

}