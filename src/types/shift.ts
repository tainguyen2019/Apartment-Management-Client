import { PaginationData } from './common';

export interface BaseShift {
  id: string;
  staff_id: string;
  area_id: string;
  date: string;
  description: string;
  shift: string;
}

export interface Shift extends BaseShift {
  staff_name: string;
  department_id: string;
  department_name: string;
  location: string;
  building: string;
}

export type EditShiftValues = BaseShift;
export type CreateShiftValues = OmitFrom<BaseShift, 'id'>;
export type ShiftFormValues = CreateShiftValues;

export interface ShiftResponse extends PaginationData {
  shifts: Shift[];
}

export interface ShiftSearchFormValues {
  shift: string;
  area_id: string;
  department_name: string;
  from_date: string;
  to_date: string;
  description: string;
  staff_name: string;
}

export interface SearchShiftParams extends Partial<ShiftSearchFormValues> {
  page: number;
  pageSize: number;
}
