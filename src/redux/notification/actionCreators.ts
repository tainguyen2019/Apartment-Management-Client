import { Dispatch } from 'redux';
import {
  NotificationResponse,
  SearchNotificationParams,
} from 'types/notification';
import { isSuccessResponse } from 'utils/common';
import notificationService from 'services/notification';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: NotificationResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getNotifications =
  (params: SearchNotificationParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await notificationService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
