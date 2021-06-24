import { PaginationData } from './common';

export interface BaseEvent {
  id: string;
  apartment_id: string;
  date: string;
  start_time: string;
  end_time: string;
  name: string;
}

export interface Event extends BaseEvent {
  status: string;
  apartment_number: string;
  block_number: string;
  staff_id?: string;
  staff_name?: string;
  note?: string;
}

export type EditEventValues = OmitFrom<BaseEvent, 'apartment_id'>;
export type EventFormValues = OmitFrom<BaseEvent, 'id' | 'apartment_id'>;
export type CreateEventValues = OmitFrom<BaseEvent, 'id'>;

export interface EventResponse extends PaginationData {
  events: Event[];
}

export interface EventSearchFormValues {
  status: string;
  name: string;
  apartment_number: string;
  block_number: string;
  staff_name: string;
  from_date: string;
  to_date: string;
}

export interface SearchEventParams extends Partial<EventSearchFormValues> {
  page: number;
  pageSize: number;
}

export type EventDialogContextValues = {
  open: boolean;
  event?: Event;
  onClose?: VoidFunction;
};

export type CancelEventFormValues = {
  note: string;
};
