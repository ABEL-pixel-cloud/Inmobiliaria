import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

export class CategoryFormComponent { 


  formUse: FormGroup;

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private formbuilder: FormBuilder) {
    this.formUse = this.formbuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(49),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(89),
      ]),
    })
  }

  get categoryName(): FormControl {
    return this.formUse.get('name') as FormControl;
  }

  get categoryDescription(): FormControl {
    return this.formUse.get('description') as FormControl;
  }

  sendData(): void {

    if (!this.formUse.valid) {
      this.formUse.markAllAsTouched();
      return;
    }

    const payload: Category = {
      name: this.formUse.value.name,
      description: this.formUse.value.description
    }


    this.categoryService.postData(payload).subscribe({
      next: (response: any) => {
        this.toastr.success(response?.message);
      },
      error: (e: any) => {
        this.toastr.error(e.message);
      }
    });

  }

}