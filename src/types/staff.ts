import { PaginationData } from './common';

export interface BaseStaff {
  id: string;
  name: string;
  phone: string;
  email: string;
  position_id: string;
  salary: number;
  account_id?: string;
  account_name?: string;
  status: string;
}

export interface Staff extends BaseStaff {
  position_name: string;
  department_id: string;
  department_name: string;
}

export type EditStaffValues = BaseStaff;
export type CreateStaffValues = OmitFrom<BaseStaff, 'id'>;
export type StaffFormValues = CreateStaffValues;

export interface StaffResponse extends PaginationData {
  staffs: Staff[];
}

export interface StaffSearchFormValues {
  name: string;
  phone: string;
  email: string;
  status: string;
  department_id: string;
}

export interface SearchStaffParams extends Partial<StaffSearchFormValues> {
  page: number;
  pageSize: number;
}

export type SelectStaff = PickFrom<BaseStaff, 'id' | 'name'>;
export type SelectStaffResponse = {
  staffs: SelectStaff[];
};
