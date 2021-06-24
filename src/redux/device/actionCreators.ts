import { DeviceResponse } from 'types/device';
import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import deviceService from 'services/device';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: DeviceResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getDevices = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await deviceService.search();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(success(data));
  } else {
    dispatch(fail(response.message));
  }
};
