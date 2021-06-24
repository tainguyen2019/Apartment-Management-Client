import { RepairResponse, SearchRepairParams } from 'types/repair';
import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import repairService from 'services/repair';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: RepairResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getRepairs =
  (params: SearchRepairParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await repairService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
