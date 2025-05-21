export interface PaginationData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}