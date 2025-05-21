import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import {Category, CategoryResponse } from 'src/app/core/models/category';
import { CategoryEventService } from 'src/app/core/services/categoryevent.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit  {
  paginationData!: CategoryResponse;
  categories: Category[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  orderAsc: boolean = true;
  columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' }
  ];

  errorMessage: string = '';

  constructor(private categoryService: CategoryService, 
     private categoryEventService: CategoryEventService) {}

  ngOnInit(): void {
    this.loadCategories(this.currentPage);

    this.categoryEventService.categoryCreated$.subscribe(() => {
    this.loadCategories(this.currentPage);
    });
  }

  loadCategories(page: number): void {
    this.categoryService.getCategories(page, this.pageSize, this.orderAsc)
      .subscribe({
       next: (response: CategoryResponse) => {
      this.categories = response.categories;
      this.totalPages = response.totalPages;
       this.currentPage = response.currentPage;
      this.paginationData = response; 
      },
       error: (error) => {
         this.errorMessage = 'Ocurrió un error al cargar las categorías. Intenta nuevamente.';
        }
      });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadCategories(page);
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

