import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { StaffResponse, SearchStaffParams } from 'types/staff';
import staffService from 'services/staff';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: StaffResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getStaffs =
  (params: SearchStaffParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await staffService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
