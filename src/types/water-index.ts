import { PaginationData } from './common';

export interface WaterIndex {
  id: string;
  apartment_id: string;
  date: string;
  start_index: number;
  end_index: number;
  usage_amount: number;
  apartment_number: string;
  block_number: string;
  status: string;
}

export interface WaterIndexResponseData extends PaginationData {
  waterIndexes: WaterIndex[];
}

export interface CreateWaterIndexValues {
  date: string;
  apartment_id: string;
  start_index: number | null;
  end_index: number;
}

export interface UpdateWaterIndexValues extends CreateWaterIndexValues {
  id: string;
}

export interface WaterIndexSearchFormValues {
  apartment_id: string;
  apartment_number: string;
  block_number: string;
  from_date: string;
  to_date: string;
  status: string;
}

export interface WaterIndexFormValues extends CreateWaterIndexValues {
  apartment_number?: string;
}

export interface SearchWaterIndexParams
  extends Partial<WaterIndexSearchFormValues> {
  page: number;
  pageSize: number;
}
