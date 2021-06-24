import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { SelectStaffResponse } from 'types/staff';
import { actionTypes } from './actionTypes';
import staffService from 'services/staff';

const request = () => ({ type: actionTypes.request });
const success = (data: SelectStaffResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getStaffSelectOptions = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await staffService.getTechniqueStaff();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(success(data));
  } else {
    dispatch(fail(response.message));
  }
};
