
import { CityService } from './../../../../core/services/ubicationService/city.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';
import { LocationService } from './../../../../core/services/ubicationService/location.service';
import { locationModel } from 'src/app/core/models/locationModel';
import { cityModel } from 'src/app/core/models/cityModel';
import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

   cities: cityModel[] = [];
   locationform: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private LocationService:LocationService,
    private CityService:CityService,
    private LocationEventService:LocationEventService

  ) {
    this.locationform = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_NAME_LENGTH)]],
      city: [null, [Validators.required]] 
    });
  }

  ngOnInit(): void {
    this.loadCities();

    this.LocationEventService.cityCreated$.subscribe(() => {
      this.loadCities(); 
    });
  }

private loadCities(): void {
  this.CityService.getCities().subscribe({
    next: (cities) => {
      this.cities = cities;
    },
    error: () => {
      this.toastr.error('Error al cargar ciudades');
    }
  });
}

  get locationName(): FormControl {
    return this.locationform.get('name') as FormControl;
  }


  get city() {
    return this.locationform.get('city') as FormControl;
  }



  createLocation(): void {
  if (this.locationform.invalid) {
    this.locationform.markAllAsTouched();
    return;
  }

  const formValue = this.locationform.value;



  const newLocation: locationModel = {
    barrio: formValue.name,
    city: formValue.city
  };

  this.LocationService.postLocation(newLocation).subscribe({
    next: () => {
      this.toastr.success('Ubicacion  creada exitosamente');
      this.locationform.reset();
    },
    error: (e) => {
      this.toastr.error(e.message);
    },
  });
}

}
