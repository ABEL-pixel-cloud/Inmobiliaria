
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryEventService } from 'src/app/core/services/categoryevent.service';
import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

export class CategoryFormComponent { 

 categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private  categoryEventService: CategoryEventService,
  ) {
    this.categoryForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_NAME_LENGTH)]],
      description: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_DESCRIPTION_LENGTH)]],
    });
  }

  get categoryName(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }

  get categoryDescription(): FormControl {
    return this.categoryForm.get('description') as FormControl;
  }

  sendData(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const newCategory  = this.categoryForm.value as Category;

    this.categoryService.postData(newCategory ).subscribe({
      next: () => {
        this.toastr.success('Categoría creada exitosamente');
        this.categoryForm.reset();
        this.categoryEventService.notifyCategoryCreated();
        localStorage.setItem('categoryUpdated', Date.now().toString());
      },
      error: (e) => {
        this.toastr.error(e.message);
      },
    });
  }
} 
