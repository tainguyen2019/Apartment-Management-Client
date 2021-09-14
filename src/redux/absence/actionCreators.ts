import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import { AbsenceResponseData, SearchAbsenceParams } from 'types/absence';
import absenceService from 'services/absence';
import { actionTypes } from './actionTypes';

export const request = () => ({ type: actionTypes.request });
export const success = (data: AbsenceResponseData) => ({
  type: actionTypes.success,
  payload: data,
});
export const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getAbsences =
  (params: SearchAbsenceParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await absenceService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
