import { ArrangeResponse, SearchArrangeParams } from 'types/arrange';
import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import arrangeService from 'services/arrange';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: ArrangeResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getArranges =
  (params: SearchArrangeParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await arrangeService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
