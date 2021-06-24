import { PaginationData } from './common';

export interface BaseReceipt {
  id: string;
  apartment_id: string;
  content: string;
  total: string;
}

export interface Receipt extends BaseReceipt {
  date: string;
  status: string;
  apartment_number: string;
  block_number: string;
  staff_id?: string;
  staff_name?: string;
}

export interface ReceiptResponse extends PaginationData {
  receipts: Receipt[];
}

export interface ReceiptSearchFormValues {
  status: string;
  content: string;
  apartment_number: string;
  block_number: string;
  from_date: string;
  to_date: string;
}

export interface SearchReceiptParams extends Partial<ReceiptSearchFormValues> {
  page: number;
  pageSize: number;
}

export interface ReceiptDetailResponse {
  details: ReceiptDetail[];
}

export type ReceiptDetail = {
  id?: string;
  fee_name: string;
  factor: number;
  price: number;
};

export type ReceiptFormValues = {
  receipt: {
    apartment_id: string;
    staff_id: string;
    content: string;
    total: number;
  };
  details: ReceiptDetail[];
};

export type ReceiptDialogContextValues = {
  open: boolean;
  receipt?: Receipt;
  onClose?: VoidFunction;
};

export type GenerateReceiptParams = {
  staff_id?: string;
  apartment_id: string;
  month: number;
  year: number;
};

export type GenerateReceiptResponse = ReceiptFormValues;
