import { LocationEventService } from 'src/app/core/services/ubicationService/locationEvent.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/core/services/ubicationService/location.service';
import { locationModel, LocationPageResponse } from 'src/app/core/models/locationModel';
import { FORM_VALIDATORS } from 'src/app/shared/constants/form-validator.constants';

@Component({
  selector: 'app-ubication-list',
  templateUrl: './ubication-list.component.html',
  styleUrls: ['./ubication-list.component.scss']
})
export class UbicationListComponent implements OnInit {
 ubicationList: FormGroup;

  locations: locationModel[] = [];
  paginationData!: LocationPageResponse;
  searchTerm: string = '';

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  columns = [
    { field: 'barrio', header: 'Barrio' },
    { field: 'city', header: 'Ciudad' }
  ];

  options = [
    { label: 'Ascendente', value: true },
    { label: 'Descendente', value: false }
  ];

  errorMessage: string = '';


  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private locationEventService: LocationEventService,
  ) {
    this.ubicationList = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.maxLength(FORM_VALIDATORS.CATEGORY.MAX_NAME_LENGTH)]],
      order: [true, Validators.required],  
    });
  }

  get name(): FormControl {
    return this.ubicationList.get('name') as FormControl;
  }

  get order(): FormControl {
    return this.ubicationList.get('order') as FormControl;
  }

  ngOnInit(): void {
    this.loadLocations(this.currentPage);

    this.locationEventService.locationCreated$.subscribe(() => {
      this.loadLocations(this.currentPage);
    });


    this.name.valueChanges
      .subscribe((value: string) => {
        if (!value || value.trim() === '') {
          this.searchTerm = '';
          this.loadLocations(0);
        }
      });
  }

  loadLocations(page: number): void {
    this.locationService
      .filterLocations(this.searchTerm, page, this.pageSize, this.order.value)
      .subscribe({
        next: (response: LocationPageResponse) => {
          this.locations = response.locations;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
          this.paginationData = response;
        },
        error: () => {
          this.errorMessage = 'Ocurrió un error al cargar las ubicaciones. Intenta nuevamente.';
        }
      });
  }

  applyFilters(): void {
     if (this.ubicationList.invalid) {
    return;
  }
    this.searchTerm = this.name.value || "";
    this.currentPage = 0;
    this.loadLocations(this.currentPage);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadLocations(page);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.goToPage(this.currentPage + 1);
    }
  }
}