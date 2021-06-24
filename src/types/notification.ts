import { PaginationData } from './common';

export interface BaseNotification {
  id: string;
  title: string;
  content: string;
  staff_id: string;
  attachment?: string;
}

export interface Notification extends BaseNotification {
  date: string;
  status: string;
  staff_name: string;
}

export type EditNotificationValues = OmitFrom<BaseNotification, 'staff_id'>;

export interface NotificationFormValues
  extends OmitFrom<BaseNotification, 'id' | 'staff_id'> {
  file?: FileList;
}
export interface CreateNotificationValues
  extends OmitFrom<BaseNotification, 'id'> {
  file?: File;
}

export interface NotificationResponse extends PaginationData {
  notifications: Notification[];
}

export interface NotificationFilterFormValues {
  // status: string;
  pageSize: string;
}

export type NotificationEditor = (
  notification: Notification,
) => React.MouseEventHandler;

export interface NotificationSearchFormValues {
  title: string;
  status: string;
  from_date: string;
  to_date: string;
}

export interface SearchNotificationParams
  extends Partial<NotificationSearchFormValues> {
  page: number;
  pageSize: number;
}
