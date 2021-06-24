import { RootState } from 'redux/rootReducer';

export const selectNotificationState = (state: RootState) => {
  const { loading, data, errorMessage } = state.notification;
  const notifications = data?.notifications ?? [];
  const totalPages = data?.totalPages ?? 0;

  return { loading, errorMessage, notifications, totalPages };
};
