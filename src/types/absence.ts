import { PaginationData } from './common';

export interface Absence {
  id: string;
  staff_id: string;
  staff_name: string;
  department_id: string;
  department_name: string;
  date: string;
  reason: string;
  status: string;
  approver_name?: string;
  approver_id?: string;
  note?: string;
}

export interface AbsenceResponseData extends PaginationData {
  absences: Absence[];
}

export interface CreateAbsenceValues {
  date: string;
  reason: string;
}

export type AbsenceFormValues = CreateAbsenceValues;

export interface UpdateAbsenceValues extends CreateAbsenceValues {
  id: string;
}

export interface AbsenceSearchFormValues {
  staff_name: string;
  department_id: string;
  from_date: string;
  to_date: string;
  status: string;
}

export interface SearchAbsenceParams extends Partial<AbsenceSearchFormValues> {
  page: number;
  pageSize: number;
}

export type AbsenceDialogContextValues = {
  open: boolean;
  absence?: Absence;
  onClose?: VoidFunction;
};

export type RejectAbsenceFormValues = {
  note: string;
};
