import { PaginationData } from './common';

export interface BaseVehicle {
  id: string;
  plate_number: string;
  apartment_id: string;
  identity_card_number: string;
  type: string;
}

export interface Vehicle extends BaseVehicle {
  parking_no: number;
  apartment_number: string;
  block_number: string;
  status: string;
  start_date: string;
  cancellation_date: string;
}

export type EditVehicleValues = OmitFrom<BaseVehicle, 'apartment_id'>;
export type VehicleFormValues = OmitFrom<BaseVehicle, 'id' | 'apartment_id'>;
export type CreateVehicleValues = OmitFrom<BaseVehicle, 'id'>;

export interface VehicleResponse extends PaginationData {
  vehicles: Vehicle[];
}

export interface VehicleSearchFormValues {
  plate_number: string;
  apartment_number: string;
  block_number: string;
  identity_card_number: string;
  parking_no: string;
  type: string;
  status: string;
}

export interface SearchVehicleParams extends Partial<VehicleSearchFormValues> {
  page: number;
  pageSize: number;
}

export interface ApproveVehicleParams {
  id: string;
  parking_no: string;
}

export type VehicleDialogContextValues = {
  open: boolean;
  vehicle?: Vehicle;
  onClose?: VoidFunction;
};

export interface ApproveVehicleFormValues {
  parking_no: string;
}
