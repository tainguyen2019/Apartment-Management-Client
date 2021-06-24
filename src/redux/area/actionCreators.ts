import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { AreaResponse } from 'types/area';
import { actionTypes } from './actionTypes';
import areaService from 'services/area';

const request = () => ({ type: actionTypes.request });
const success = (data: AreaResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getAreas = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await areaService.getAll();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(success(data));
  } else {
    dispatch(fail(response.message));
  }
};
