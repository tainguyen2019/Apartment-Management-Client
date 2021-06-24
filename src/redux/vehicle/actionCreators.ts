import { SearchVehicleParams, VehicleResponse } from 'types/vehicle';
import { isSuccessResponse } from 'utils/common';
import { actionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import vehicleService from 'services/vehicle';

const request = () => ({ type: actionTypes.request });
const success = (data: VehicleResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getVehicles =
  (params: SearchVehicleParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await vehicleService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
