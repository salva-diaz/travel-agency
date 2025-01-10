export interface RequestParams<T> {
  searchText?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: T;
  with?: string | string[];
}

export interface ServicePagination {
  count: number;
  currentPage: number;
  links: { next: string; previous: string };
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ServiceResponse<T> {
  data: T;
  pagination: ServicePagination;
  status: number;
  success: boolean;
}

export interface CityFilters {
  name?: string;
  airline_id?: number;
}

export interface AirlineFilters {
  name?: string;
  description?: string;
  cityId?: number;
}

export interface FlightFilters {
  departureCity?: string;
  arrivalCity?: string;
  airline?: string;
}

export const SortDirection = {
  asc: "asc",
  desc: "desc",
} as const;

export type SortDirectionType = keyof typeof SortDirection;

export interface City {
  id: number;
  name: string;
  departureFlightsCount: number;
  arrivalFlightsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Airline {
  id: number;
  name: string;
  description: string;
  activeFlightsCount: number;
}

export type CreateRequestAirline = {
  name: string;
  description: string | null;
};

export interface Flight {
  id: number;
  departureCity: {
    id: number;
    name: string;
  };
  arrivalCity: {
    id: number;
    name: string;
  };
  airline: {
    id: number;
    name: string;
  };
  departureTime: string;
  arrivalTime: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateRequestFlight = {
  airline_id: number;
  departure_city_id: number;
  arrival_city_id: number;
  departure_time: string;
  arrival_time: string;
};

export type UpdateRequestFlight = {
  airline_id: number;
  departure_city_id: number;
  arrival_city_id: number;
  departure_time: string;
  arrival_time: string;
};
