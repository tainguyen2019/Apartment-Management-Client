import { createContext } from 'react';
import { Notification } from 'types/notification';

type ApartmentDialogContextValues = {
  open: boolean;
  notification?: Notification;
  onRefresh?: VoidFunction;
};

const defaultValues: ApartmentDialogContextValues = { open: false };
const NotificationDialogContext = createContext(defaultValues);

export default NotificationDialogContext;
