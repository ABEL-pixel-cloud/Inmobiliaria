import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryResponse } from 'src/app/core/models/category';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnChanges {
  
  @Input() pagination!: CategoryResponse;
  @Output() pageChanged = new EventEmitter<number>();

  visiblePages: number[] = [];
  maxVisibleButtons: number = 4;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagination']) {
      this.updateVisiblePages();
    }
  }

  updateVisiblePages(): void {
     if (!this.pagination) return;

    const totalPages = this.pagination.totalPages;
    const currentPage = this.pagination.currentPage; 
    const groupStart = Math.floor((currentPage) / this.maxVisibleButtons) * this.maxVisibleButtons + 1;
    const groupEnd = Math.min(groupStart + this.maxVisibleButtons - 1, totalPages);

    this.visiblePages = [];
    for (let i = groupStart; i <= groupEnd; i++) {
      this.visiblePages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pageChanged.emit(page - 1); 
    }
  }

  previousPage(): void {
    if (this.pagination.hasPrevious) {
      this.pageChanged.emit(this.pagination.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.pagination.hasNext) {
      this.pageChanged.emit(this.pagination.currentPage + 1);
    }
  }


}