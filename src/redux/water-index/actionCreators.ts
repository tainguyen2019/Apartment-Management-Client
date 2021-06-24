import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import {
  WaterIndexResponseData,
  SearchWaterIndexParams,
} from 'types/water-index';
import waterIndexService from 'services/water-index';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: WaterIndexResponseData) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const search =
  (params: SearchWaterIndexParams) => async (dispatch: Dispatch) => {
    dispatch(request());

    const response = await waterIndexService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
