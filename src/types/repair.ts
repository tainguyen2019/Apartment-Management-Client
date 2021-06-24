import { PaginationData } from './common';

export interface BaseRepair {
  id: string;
  apartment_id: string;
  date: string;
  content: string;
}

export interface Repair extends BaseRepair {
  rate: string;
  status: string;
  apartment_number: string;
  block_number: string;
  staff_id?: string;
  staff_name?: string;
}

export type EditRepairValues = OmitFrom<BaseRepair, 'apartment_id'>;
export type RepairFormValues = OmitFrom<BaseRepair, 'id' | 'apartment_id'>;
export type CreateRepairValues = OmitFrom<BaseRepair, 'id'>;

export interface RepairResponse extends PaginationData {
  repairs: Repair[];
}

export interface RepairSearchFormValues {
  rate: string;
  status: string;
  content: string;
  apartment_number: string;
  block_number: string;
  staff_name: string;
  from_date: string;
  to_date: string;
}

export interface SearchRepairParams extends Partial<RepairSearchFormValues> {
  page: number;
  pageSize: number;
}

export type RepairDialogContextValues = {
  open: boolean;
  repair?: Repair;
  onClose?: VoidFunction;
};

export type AssignmentRepair = {
  staff_id: string;
};

export type RateRepair = {
  rate: string;
};
