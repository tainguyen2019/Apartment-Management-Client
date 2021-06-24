import { PaginationData } from './common';

export interface Apartment {
  id: string;
  apartment_number: string;
  block_number: string;
  type: string;
  floor_area: number;
  host: string;
  phone: string;
  email: string;
  note: string;
  account_id?: string;
  account_name?: string;
}

export interface ApartmentResponseData extends PaginationData {
  apartments: Apartment[];
}

export interface CreateApartmentValues
  extends Partial<OmitFrom<Apartment, 'id'>> {
  // Optional values
  host?: string;
  phone?: string;
  email?: string;
  note?: string;
}

export interface UpdateApartmentValues extends Partial<Apartment> {
  id: string;
}

export interface ApartmentSearchFormValues {
  apartment_number: string;
  block_number: string;
  type: string;
  host: string;
  phone: string;
  email: string;
}

export type ApartmentFormValues = CreateApartmentValues;

export interface SearchApartmentParams
  extends Partial<ApartmentSearchFormValues> {
  page: number;
  pageSize: number;
}
