import { FeeResponse } from 'types/fee';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type FeeState = AsyncState<FeeResponse>;

const getInitialState = (): FeeState => ({ loading: false });

const feeReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): FeeState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as FeeResponse;
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

export default feeReducer;
