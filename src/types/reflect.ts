import { PaginationData } from './common';

export interface BaseReflect {
  id: string;
  apartment_id: string;
  department_id: string;
  title: string;
  content: string;
}

export interface Reflect extends BaseReflect {
  date: string;
  status: string;
  apartment_number: string;
  department_name: string;
  block_number: string;
  answer: string;
  staff_id?: string;
  staff_name?: string;
}

export type EditReflectValues = OmitFrom<BaseReflect, 'apartment_id'>;
export type ReflectFormValues = OmitFrom<BaseReflect, 'id' | 'apartment_id'>;
export type CreateReflectValues = OmitFrom<BaseReflect, 'id'>;

export interface ReflectResponse extends PaginationData {
  reflects: Reflect[];
}

export interface ReflectSearchFormValues {
  department_id: string;
  status: string;
  title: string;
  content: string;
  apartment_number: string;
  block_number: string;
  answer: string;
  from_date: string;
  to_date: string;
}

export interface SearchReflectParams extends Partial<ReflectSearchFormValues> {
  page: number;
  pageSize: number;
}

export type ReflectDialogContextValues = {
  open: boolean;
  reflect?: Reflect;
  onClose?: VoidFunction;
};

export interface AnswerReflectValues {
  id: string;
  answer: string;
}
