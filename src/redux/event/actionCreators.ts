import { EventResponse, SearchEventParams } from 'types/event';
import { isSuccessResponse } from 'utils/common';
import { actionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import eventService from 'services/event';

const request = () => ({ type: actionTypes.request });
const success = (data: EventResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getEvents =
  (params: SearchEventParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await eventService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
