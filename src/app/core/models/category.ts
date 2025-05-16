export interface Category {
    id?:number;    
    name: string;
    description: string;
  }

export interface CategoryResponse {
  categories: Category[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
