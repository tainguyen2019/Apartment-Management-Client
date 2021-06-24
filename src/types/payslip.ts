import { PaginationData } from './common';

export interface BasePayslip {
  id: string;
  content: string;
  total: string;
  staff_id: string;
}

export interface Payslip extends BasePayslip {
  date: string;
  status: string;
  staff_name?: string;
}

export type EditPayslipValues = OmitFrom<BasePayslip, 'staff_id'>;
export type PayslipFormValues = OmitFrom<BasePayslip, 'id' | 'staff_id'>;
export type CreatePayslipValues = OmitFrom<BasePayslip, 'id'>;

export interface PayslipResponse extends PaginationData {
  payslips: Payslip[];
}

export interface PayslipSearchFormValues {
  // status: string;
  content: string;
  staff_name: string;
  from_date: string;
  to_date: string;
}

export interface SearchPayslipParams extends Partial<PayslipSearchFormValues> {
  page: number;
  pageSize: number;
}
