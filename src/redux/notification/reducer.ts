import { NotificationResponse } from 'types/notification';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type NotificationState = AsyncState<NotificationResponse>;

const getInitialState = (): NotificationState => ({ loading: false });

const notificationReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): NotificationState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as NotificationResponse;
      return {
        ...prevState,
        loading: false,
        errorMessage: undefined,
        data,
      };
    }
    case actionTypes.fail: {
      const { errorMessage } = action.payload;
      return {
        ...prevState,
        loading: false,
        data: undefined,
        errorMessage,
      };
    }
    default:
      return prevState;
  }
};

export default notificationReducer;
