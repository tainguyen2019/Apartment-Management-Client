import { FeeResponse } from 'types/fee';
import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import feeService from 'services/fee';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: FeeResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getFees = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await feeService.search();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(success(data));
  } else {
    dispatch(fail(response.message));
  }
};
