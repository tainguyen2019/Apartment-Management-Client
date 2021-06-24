import { isSuccessResponse } from 'utils/common';
import { Dispatch } from 'redux';
import accountService from 'services/account';
import { SearchAccountParams, AccountResponseData } from 'types/account';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const requestSuccess = (data: AccountResponseData) => ({
  type: actionTypes.success,
  payload: data,
});
const requestFail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const searchAccounts =
  (params: SearchAccountParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await accountService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(requestSuccess(data));
    } else {
      dispatch(requestFail(response.message));
    }
  };
