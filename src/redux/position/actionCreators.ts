import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { PositionResponseData } from 'types/position';
import { actionTypes } from './actionTypes';
import positionService from 'services/position';

const request = () => ({ type: actionTypes.request });
const success = (data: PositionResponseData) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getPositions = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await positionService.search();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(success(data));
  } else {
    dispatch(fail(response.message));
  }
};
