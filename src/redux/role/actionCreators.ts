import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import roleService from 'services/role';
import { RoleResponseData } from 'types/role';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const requestSuccess = (data: RoleResponseData) => ({
  type: actionTypes.success,
  payload: data,
});
const requestFail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getAllRoles = () => async (dispatch: Dispatch) => {
  dispatch(request());
  const response = await roleService.getAll();

  if (isSuccessResponse(response)) {
    const data = response.data;
    dispatch(requestSuccess(data));
  } else {
    dispatch(requestFail(response.message));
  }
};
