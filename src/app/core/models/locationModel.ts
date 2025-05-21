
export interface locationModel {
    id?:number;    
    barrio: string;
    city: number;
  }

export interface LocationPageResponse {
  locations: locationModel[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}