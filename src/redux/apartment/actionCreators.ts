import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { ApartmentResponseData, SearchApartmentParams } from 'types/apartment';
import apartmentService from 'services/apartment';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: ApartmentResponseData) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getApartments =
  (params: SearchApartmentParams) => async (dispatch: Dispatch) => {
    dispatch(request());

    const response = await apartmentService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
