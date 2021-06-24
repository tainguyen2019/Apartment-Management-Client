import { ArrangeResponse } from 'types/arrange';
import { AsyncState } from 'types/state';
import { PayloadAction } from '../types';
import { actionTypes } from './actionTypes';

export type ArrangeState = AsyncState<ArrangeResponse>;

const getInitialState = (): ArrangeState => ({ loading: false });

const arrangeReducer = (
  prevState = getInitialState(),
  action: PayloadAction<any>,
): ArrangeState => {
  switch (action.type) {
    case actionTypes.request:
      return {
        ...prevState,
        loading: true,
        errorMessage: undefined,
        data: undefined,
      };
    case actionTypes.success: {
      const data = action.payload as ArrangeResponse;
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

export default arrangeReducer;
