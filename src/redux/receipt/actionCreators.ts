import { ReceiptResponse, SearchReceiptParams } from 'types/receipt';
import { Dispatch } from 'redux';
import { isSuccessResponse } from 'utils/common';
import receiptService from 'services/receipt';
import { actionTypes } from './actionTypes';

const request = () => ({ type: actionTypes.request });
const success = (data: ReceiptResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getReceipts =
  (params: SearchReceiptParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await receiptService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
