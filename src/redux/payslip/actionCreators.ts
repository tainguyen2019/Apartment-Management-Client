import { PayslipResponse, SearchPayslipParams } from 'types/payslip';
import { isSuccessResponse } from 'utils/common';
import { actionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import payslipService from 'services/payslip';

const request = () => ({ type: actionTypes.request });
const success = (data: PayslipResponse) => ({
  type: actionTypes.success,
  payload: data,
});
const fail = (errorMessage: string) => ({
  type: actionTypes.fail,
  payload: { errorMessage },
});

export const getPayslips =
  (params: SearchPayslipParams) => async (dispatch: Dispatch) => {
    dispatch(request());
    const response = await payslipService.search(params);

    if (isSuccessResponse(response)) {
      const data = response.data;
      dispatch(success(data));
    } else {
      dispatch(fail(response.message));
    }
  };
