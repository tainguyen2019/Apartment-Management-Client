import { PayslipResponse } from 'types/payslip';
import { actionTypes } from './actionTypes';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';

export type PayslipState = AsyncState<PayslipResponse>;

const getInitialState = (): PayslipState => ({ loading: false });

const positionReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): PayslipState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as PayslipResponse;
      return {
        ...prevState,
        loading: false,
        errorMessage: undefined,
        data,
      };
    }
    case actionTypes.fail: {
      const { errorMessage } = action.payload;
      return {
        ...prevState,
        loading: false,
        data: undefined,
        errorMessage,
      };
    }
    default:
      return prevState;
  }
};

export default positionReducer;
