import { ReceiptDetailResponse } from 'types/receipt';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type ReceiptDetailState = AsyncState<ReceiptDetailResponse>;

const getInitialState = (): ReceiptDetailState => ({ loading: false });

const receiptDetailReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ReceiptDetailState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as ReceiptDetailResponse;
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

export default receiptDetailReducer;
