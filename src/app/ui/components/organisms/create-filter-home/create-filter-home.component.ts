import { PublishHomeEvent } from './../../../../core/services/publishHomeService/PublishHomeEvent.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PublishHomeService } from 'src/app/core/services/publishHomeService/PublishHomeService.service';
import { Category, PublishHome, PublishHomeFilterParams, PublishPageResponse } from 'src/app/core/models/filterHome';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-create-filter-home',
  templateUrl: './create-filter-home.component.html',
  styleUrls: ['./create-filter-home.component.scss']
})
export class CreateFilterHomeComponent implements OnInit {

    constructor(
    private publishHomeService: PublishHomeService,
    private categoryService: CategoryService,
    private publishHomeEvent:PublishHomeEvent,
    private fb: FormBuilder
  ) {
    this.filterForm = this.buildForm();
  }

  filterForm: FormGroup;
  categories: Category[] = [];
  showExtrasModal = false;

  homes: PublishHome[] = [];
  paginationData!: PublishPageResponse;

  errorMessage: string = '';

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'categoryName', header: 'Categoría' },
    { field: 'address', header: 'Dirección' },
    { field: 'numberOfRooms', header: 'Habitaciones' },
    { field: 'numberOfBathrooms', header: 'Baños' },
    { field: 'price', header: 'Precio' },
    { field: 'barrio', header: 'Barrio' },
    { field: 'cityName', header: 'Ubicación' },
    { field: 'status', header: 'Estado' }
  ];


  orderOptions = [
    { label: 'Ascendente', value: true },
    { label: 'Descendente', value: false }
  ];

    private buildForm(): FormGroup {
    return this.fb.group({
      location: [''],
      category: [''],
      minRooms: [null],
      maxRooms: [null],
      minBathrooms: [null],
      maxBathrooms: [null],
      minPrice: [null],
      maxPrice: [null],
      sortBy: ['price'],
      orderAsc: [true]
    });
  }

  
  get location(): FormControl {
    return this.filterForm.get('location') as FormControl;
  }

  get category(): FormControl {
    return this.filterForm.get('category') as FormControl;
  }

  get minRooms(): FormControl {
    return this.filterForm.get('minRooms') as FormControl;
  }

  get maxRooms(): FormControl {
    return this.filterForm.get('maxRooms') as FormControl;
  }

  get minBathrooms(): FormControl {
    return this.filterForm.get('minBathrooms') as FormControl;
  }

  get maxBathrooms(): FormControl {
    return this.filterForm.get('maxBathrooms') as FormControl;
  }

  get minPrice(): FormControl {
    return this.filterForm.get('minPrice') as FormControl;
  }

  get maxPrice(): FormControl {
    return this.filterForm.get('maxPrice') as FormControl;
  }

  get sortBy(): FormControl {
    return this.filterForm.get('sortBy') as FormControl;
  }

  get orderAsc(): FormControl {
    return this.filterForm.get('orderAsc') as FormControl;
  }

  ngOnInit(): void {
    this.loadHomes();
    this.loadCategories();

     this.publishHomeEvent.publishHomeCreated$.subscribe(() => {
      this.loadHomes();
    });

    this.location.valueChanges.subscribe(() => this.loadHomes());

    this.filterForm.valueChanges.subscribe(() => {
      if (this.areAllFiltersEmpty()) {
        this.loadHomes();
      }
    });
  }

  private areAllFiltersEmpty(): boolean {
    const {
      location, category,
      minRooms, maxRooms,
      minBathrooms, maxBathrooms,
      minPrice, maxPrice
    } = this.filterForm.value;

    return !location && !category &&
           !minRooms && !maxRooms &&
           !minBathrooms && !maxBathrooms &&
           !minPrice && !maxPrice;
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadHomes();
    this.closeExtrasModal();
  }

  openExtrasModal(): void {
    this.showExtrasModal = true;
  }

  closeExtrasModal(): void {
    this.showExtrasModal = false;
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las categorías.';
      }
    });
  }


  loadHomes(): void {
    const params: PublishHomeFilterParams = {
      ...this.filterForm.value,
      page: this.currentPage,
      size: this.pageSize
    };

    this.publishHomeService.filterPublishHomes(params).subscribe({
      next: (res: PublishPageResponse) => {
        this.homes = res.home.map(home => ({
          ...home,
          categoryName: home.category?.name || 'Sin categoría',
          cityName: home.location?.city?.name || 'Sin ciudad',
          barrio: home.location?.barrio || 'Sin barrio',
          address: home.address || 'Sin dirección'
        }));
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        this.paginationData = res;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al cargar las publicaciones. Intenta nuevamente.';
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadHomes();
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