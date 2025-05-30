export interface Department {
  id?: number;    
  name: string;
  description: string;
}

export interface City {
  id?: number;    
  name: string;
  description: string;
  department: Department;  // objeto completo
}

export interface Location {
  id?: number;    
  barrio: string;
  city: City;  // objeto completo
}
export interface Category {
    id?:number;    
    name: string;
    description: string;
  }


export interface PublishHome {
  id: number;
  name: string;
  address: string;
  description: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  price: number;
  category: Category;
  location: Location;  // usa el objeto completo Location
  activationDate: string;
  creationDate: string;
  status: string;
  sellerId: number;
}

export interface PublishPageResponse {
  home: PublishHome[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface PublishHomeFilterParams {
  location?: string;
  category?: string;
  minRooms?: number;
  maxRooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  orderAsc?: boolean;
  page?: number;
  size?: number;
}
