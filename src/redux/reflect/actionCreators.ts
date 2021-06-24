import { ReflectResponse, SearchReflectParams } from 'types/reflect';
import { isSuccessResponse } from 'utils/common';
import { actionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import reflectService from 'services/reflect';

const request = () => ({ type: actionTypes.request });
const success = (data: ReflectResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getReflects =
  (params: SearchReflectParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await reflectService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
