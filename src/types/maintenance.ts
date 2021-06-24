import { PaginationData } from './common';

export interface BaseMaintenance {
  id: string;
  device_id: string;
  area_id: string;
  staff_id: string;
  date: string;
}

export interface Maintenance extends BaseMaintenance {
  device_name: string;
  location: string;
  building: string;
  staff_name: string;
}

export type EditMaintenanceValues = BaseMaintenance;
export type MaintenanceFormValues = OmitFrom<BaseMaintenance, 'id'>;
export type CreateMaintenanceValues = MaintenanceFormValues;

export interface MaintenanceResponse extends PaginationData {
  maintenances: Maintenance[];
}

export interface MaintenanceSearchFormValues {
  area_id: string;
  device_name: string;
  staff_name: string;
  from_date: string;
  to_date: string;
}

export interface SearchMaintenanceParams
  extends Partial<MaintenanceSearchFormValues> {
  page: number;
  pageSize: number;
}

export type MaintenanceDialogContextValues = {
  open: boolean;
  maintenance?: Maintenance;
  onClose?: VoidFunction;
};
