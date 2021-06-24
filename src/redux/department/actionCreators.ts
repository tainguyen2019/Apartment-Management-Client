import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { DepartmentResponse } from 'types/department';
import { actionTypes } from './actionTypes';
import departmentService from 'services/department';

const request = () => ({ type: actionTypes.request });
const success = (data: DepartmentResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getDepartments = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await departmentService.getAll();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(success(data));
  } else {
    dispatch(fail(response.message));
  }
};
