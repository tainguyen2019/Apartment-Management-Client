import {
  MaintenanceResponse,
  SearchMaintenanceParams,
} from 'types/maintenance';
import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import maintenanceService from 'services/maintenance';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: MaintenanceResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getMaintenances =
  (params: SearchMaintenanceParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await maintenanceService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
