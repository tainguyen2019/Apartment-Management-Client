import { ReceiptResponse } from 'types/receipt';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type ReceiptState = AsyncState<ReceiptResponse>;

const getInitialState = (): ReceiptState => ({ loading: false });

const receiptReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ReceiptState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as ReceiptResponse;
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

export default receiptReducer;
