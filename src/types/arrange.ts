import { PaginationData } from './common';

export interface BaseArrange {
  id: string;
  device_id: string;
  area_id: string;
  quantity: number;
}

export interface Arrange extends BaseArrange {
  device_name: string;
  building: string;
  location: string;
}

export type EditArrangeValues = BaseArrange;
export type ArrangeFormValues = OmitFrom<BaseArrange, 'id'>;
export type CreateArrangeValues = ArrangeFormValues;

export interface ArrangeResponse extends PaginationData {
  arranges: Arrange[];
}

export interface ArrangeSearchFormValues {
  device_name: string;
  area_id: string;
}

export interface SearchArrangeParams extends Partial<ArrangeSearchFormValues> {
  page: number;
  pageSize: number;
}

export type ArrangeDialogContextValues = {
  open: boolean;
  arrange?: Arrange;
  onClose?: VoidFunction;
};
