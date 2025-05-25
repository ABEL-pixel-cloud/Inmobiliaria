import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Category } from 'src/app/core/models/category';
import { locationModel } from './../../../../core/models/locationModel';
import { PublishHome } from 'src/app/core/models/PublishHome';

import { CategoryService } from 'src/app/core/services/category.service';
import { LocationService } from 'src/app/core/services/ubicationService/location.service';
import { PublishHomeService } from 'src/app/core/services/publishHomeService/PublishHomeService.service';

import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';

@Component({
  selector: 'app-create-publish-home',
  templateUrl: './create-publish-home.component.html',
  styleUrls: ['./create-publish-home.component.scss']
})
export class CreatePublishHomeComponent implements OnInit {
  publishForm: FormGroup;
  categories: Category[] = [];
  locations: locationModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private publishService: PublishHomeService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private locationService: LocationService
  ) {
    this.publishForm = this.buildForm();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadLocations();

  }

  createPublishHome(): void {
    if (this.publishForm.invalid) {
      this.publishForm.markAllAsTouched();
      return;
    }

    const formValue = {
      ...this.publishForm.value,
      activationDate: this.activationDate.value,
      name: this.normalizeName(this.publishForm.value.name),
      address: this.normalizeName(this.publishForm.value.address),
      description: this.normalizeName(this.publishForm.value.description)
    } as Omit<PublishHome, 'sellerId'>;

    this.publishService.createPublishHome(formValue).subscribe({
      next: () => {
        this.toastr.success('Publicación creada con éxito');
        this.publishForm.reset();
      },
      error: (error) => {
        this.toastr.error(error.message);
      }
    });
  }

  preventInvalidInput(event: KeyboardEvent): void {
    const invalidKeys = ['-', '+', 'e', 'E', '.'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  get name() { return this.publishForm.get('name') as FormControl; }
  get address() { return this.publishForm.get('address') as FormControl; }
  get description() { return this.publishForm.get('description') as FormControl; }
  get numberOfRooms() { return this.publishForm.get('numberOfRooms') as FormControl; }
  get numberOfBathrooms() { return this.publishForm.get('numberOfBathrooms') as FormControl; }
  get price() { return this.publishForm.get('price') as FormControl; }
  get category() { return this.publishForm.get('category') as FormControl; }
  get location() { return this.publishForm.get('location') as FormControl; }
  get activationDate() { return this.publishForm.get('activationDate') as FormControl; }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      numberOfRooms: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      numberOfBathrooms: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
      price: [null, [Validators.required, Validators.min(1)]],
      category: [null, Validators.required],
      location: [null, Validators.required],
      activationDate: [null, [Validators.required, validActivationDate()]]
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        this.toastr.error('Error al cargar categorías');
      }
    });
  }

  private loadLocations(): void {
    this.locationService.filterLocations('', 0, 100, true).subscribe({
      next: (response) => {
        this.locations = response.locations.map(loc => ({
          ...loc,
          label: `${loc.barrio} - ${loc.city}`
        }));
      },
      error: () => {
        this.toastr.error('Error al cargar ubicaciones');
      }
    });
  }

  private normalizeName(value: string): string {
    return value.trim().replace(/\s+/g, ' ');
  }
}

export function validActivationDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const [year, month, day] = control.value.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    if (selectedDate < today) return { pastDate: true };
    if (selectedDate > oneMonthLater) return { futureDate: true };

    return null;
  };
}